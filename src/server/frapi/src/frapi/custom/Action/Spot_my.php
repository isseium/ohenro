<?php

/**
 * Action Spot_my 
 * 
 * Array
 * 
 * @link http://getfrapi.com
 * @author Frapi <frapi@getfrapi.com>
 * @link api/spot/my
 */
class Action_Spot_my extends Frapi_Action implements Frapi_Action_Interface
{

    /**
     * Required parameters
     * 
     * @var An array of required parameters.
     */
    protected $requiredParams = array('token');

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
        // 必須チェック
        $valid = $this->hasRequiredParameters($this->requiredParams);
        if ($valid instanceof Frapi_Error) {
            throw $valid;
        }

        $user = UserFactory::generateByToken($this->getParam('token'));
        if(!$user){
            throw new Exception('Invalid token');
        }

        // ユーザがチェックインしたスポットを取得
        $spots = SpotManager::generateByUserId($user->id);

        // response
        $response = array();
        foreach($spots as $s){
            $response[] = array(
                'id' => $s['checkin']->spot_id,
                'comment' => $s['checkin']->comment,
                'created_at' => $s['checkin']->created_at,
                'updated_at' => $s['checkin']->updated_at,
            );
        }
        
        return array("spots" => $response, "meta" => array("status" => "true"));
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
        $valid = $this->hasRequiredParameters($this->requiredParams);
        if ($valid instanceof Frapi_Error) {
            throw $valid;
        }
        
        return $this->toArray();
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

