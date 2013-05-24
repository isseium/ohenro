<?php

/**
 * Action Spot 
 * 
 * Array
 * 
 * @link http://getfrapi.com
 * @author Frapi <frapi@getfrapi.com>
 * @link api/spot/:id
 */
class Action_Spot extends Frapi_Action implements Frapi_Action_Interface
{

    /**
     * Required parameters
     * 
     * @var An array of required parameters.
     */
    protected $requiredParams = array();

    /**
     * The data container to use in toArray()
     * 
     * @var A container of data to fill and return in toArray()
     */
    private $data = array();

    /**
     * To Array
     * 
     * This method returns the value found in the database 
     * into an associative array.
     * 
     * @return array
     */
    public function toArray()
    {
        return $this->data;
    }

    /**
     * Default Call Method
     * 
     * This method is called when no specific request handler has been found
     * 
     * @return array
     */
    public function executeAction()
    {
        return $this->toArray();
    }

    /**
     * Get Request Handler
     * 
     * This method is called when a request is a GET
     * 
     * @return array
     */
    public function executeGet()
    {
        // 必須チェック
        $valid = $this->hasRequiredParameters($this->requiredParams);
        if ($valid instanceof Frapi_Error) {
            throw $valid;
        }

        // スポット情報取得
        $spot_id = $this->getParam('id');
        $spot = SpotFactory::generateBySpotId($spot_id);

        // 画像情報生成
        $imageResponse = array(
            'small_url' => "",
            'medium_url' => "",
            'large_url' => "",
            'author' => "",
        );
        $spotImage = $spot->fetchImageLatest();
        if($spotImage){
            $imageResponse['small_url'] = $spotImage->daizu_image_small;
            $imageResponse['medium_url'] = $spotImage->daizu_image_medium;
            $imageResponse['large_url'] = $spotImage->daizu_image_large;
            $imageResponse['author'] = $spotImage->author;
        }


        // response
        $response = array(
            'id' => $spot->spot_id,
            'name' => $spot->name,
            'image' => $imageResponse,
            'description' => $spot->description
        );
        
        return array(
            'spot' => $response,
            array(
                'meta' => array(
                    'status' => 'true'
                )
            )
        );
    }

    /**
     * Post Request Handler
     * 
     * This method is called when a request is a POST
     * 
     * @return array
     */
    public function executePost()
    {
        // 受け取ったファイル
        $tmpfile = $_FILES["image"]["tmp_name"];

        // Daizu 向け POST 情報
        $client = new Zend_Http_Client('http://192.168.1.8:3000/pictures',
            array(
                'maxredirects' => 0,
                'timeout'      => 30
            )
        );
        $client->setFileUpload($tmpfile, 'pictures[avatar]'); // ファイル添付
        $client->setMethod(Zend_Http_Client::POST);

        // 送信
        $response = $client->request();

        $json = json_decode($response->getBody());

        return array(
            'spot' => array(
                'id' => $json->id,
                'name' => $json->name,
                'image' => array(
                    'small_url' => $json->image_small,
                    'medium_url' => $json->image_medium,
                    'large_url' => $json->image_large,
                    'author' => 'ipukun',
                ),
                'description' => 'せつめい'
            ),
            array(
                'meta' => array(
                    'status' => 'true'
                )
            )
        );
    }

    /**
     * Put Request Handler
     * 
     * This method is called when a request is a PUT
     * 
     * @return array
     */
    public function executePut()
    {
        return $this->toArray();
    }

    /**
     * Delete Request Handler
     * 
     * This method is called when a request is a DELETE
     * 
     * @return array
     */
    public function executeDelete()
    {
        return $this->toArray();
    }

    /**
     * Head Request Handler
     * 
     * This method is called when a request is a HEAD
     * 
     * @return array
     */
    public function executeHead()
    {
        return $this->toArray();
    }


}

