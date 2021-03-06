<?php

/**
 * Action Spot_checkin 
 * 
 * CheckIn
 * 
 * @link http://getfrapi.com
 * @author Frapi <frapi@getfrapi.com>
 * @link api/spot/checkin
 */
class Action_Spot_checkin extends Frapi_Action implements Frapi_Action_Interface
{

    /**
     * Required parameters
     * 
     * @var An array of required parameters.
     */
    protected $requiredParams = array(
        'token',
        'spot_id',
        'comment'
        );

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
        $this->data['token'] = $this->getParam('token', self::TYPE_OUTPUT);
        $this->data['spot_id'] = $this->getParam('spot_id', self::TYPE_OUTPUT);
        $this->data['comment'] = $this->getParam('comment', self::TYPE_OUTPUT);
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
        $valid = $this->hasRequiredParameters($this->requiredParams);
        if ($valid instanceof Frapi_Error) {
            throw $valid;
        }
        
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
        $valid = $this->hasRequiredParameters($this->requiredParams);
        if ($valid instanceof Frapi_Error) {
            throw $valid;
        }
        
        return $this->toArray();
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
        // 必須チェック
        $valid = $this->hasRequiredParameters($this->requiredParams);
        if ($valid instanceof Frapi_Error) {
            throw $valid;
        }

        $user = UserFactory::generateByToken($this->getParam('token'));
        $spot = SpotManager::generateBySpotId($this->getParam('spot_id'));
        $comment = $this->getParam('comment');

        $spot->checkin($user, $comment);
        $checkin = CheckinManager::generateByCheckinId($spot->checkin_id);

        // シェア設定
        // $message = "これはテストだよー time=" . $time;
        $message = sprintf("%s (%s を巡礼しました) #ぼくの細道", mb_strimwidth($comment, 0, 80, '...'), $spot->name);
        ShareQueue::enqueue($user, $checkin->id, $message);

        // レスポンス
        $response = array(
            "id" => $checkin->id,
            "created_at" => $checkin->created_at,
            "updated_at" => $checkin->updated_at,
        );

        return array("checkin" => $response, "meta" => array("status" => "true"));
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
        $valid = $this->hasRequiredParameters($this->requiredParams);
        if ($valid instanceof Frapi_Error) {
            throw $valid;
        }
        
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
        $valid = $this->hasRequiredParameters($this->requiredParams);
        if ($valid instanceof Frapi_Error) {
            throw $valid;
        }
        
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
        $valid = $this->hasRequiredParameters($this->requiredParams);
        if ($valid instanceof Frapi_Error) {
            throw $valid;
        }
        
        return $this->toArray();
    }


}

