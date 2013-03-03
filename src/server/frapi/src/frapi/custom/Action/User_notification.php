<?php

/**
 * Action User_notification 
 * 
 * Array
 * 
 * @link http://getfrapi.com
 * @author Frapi <frapi@getfrapi.com>
 * @link api/user/notification
 */
class Action_User_notification extends Frapi_Action implements Frapi_Action_Interface
{

    /**
     * Required parameters
     * 
     * @var An array of required parameters.
     */
    protected $requiredParams = array(
        'token',
        'social_type',
        'post'
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
        $this->data['social_type'] = $this->getParam('social_type', self::TYPE_OUTPUT);
        $this->data['social_token'] = $this->getParam('social_token', self::TYPE_OUTPUT);
        $this->data['social_secret'] = $this->getParam('social_secret', self::TYPE_OUTPUT);
        $this->data['post'] = $this->getParam('post', self::TYPE_OUTPUT);
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
        if(!$user){
            throw new Exception('Invalid token');
        }

        // アカウントを作成（存在しないアカウントの場合は、NULLが返却）
        $socialAccount = SocialAccountManager::generateByUserId($user->id, $this->getParam('social_type'));

        if($socialAccount){
            // すでに存在するときは設定を変更
            $socialAccount = $socialAccount[0];

            $socialAccount->token = ($this->getParam('social_token') ?: $socialAccount->token);
            $socialAccount->secret = ($this->getParam('social_secret') ?: $socialAccount->secret);
            $socialAccount->share = $this->getParam('post');
        }else{
            // 存在しないときは新規作成
            $socialAccount = new SocialAccount(
                $user->id, $this->getParam("social_type"), $this->getParam("social_token"),
                $this->getParam("social_secret"), $this->getParam("post")
            );
        }

        // SocialAccount を保存
        $socialAccount->save();

        return array("meta" => array("status" => "true"));
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

