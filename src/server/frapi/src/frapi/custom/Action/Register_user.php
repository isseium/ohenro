<?php

/**
 * Action Register_user 
 * 
 * Array
 * 
 * @link http://getfrapi.com
 * @author Frapi <frapi@getfrapi.com>
 * @link api/user/register
 */
class Action_Register_user extends Frapi_Action implements Frapi_Action_Interface
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
        $param = $this->params;

        // SocialAccount を生成 - 2回目以降の登録のため
        $socialAccount = SocialAccountManager::generateBySocialToken(
            $param["social_type"], $param["social_token"], $param["social_secret"]
        );

        try{
            if(!$socialAccount) {
                // 新規登録の場合
                
                // TODO: トランザクション
                // user の登録
                $user = new User($param["name"]);
                $user->save();

                // SocialAccount の登録
                $share = 1;     // 共有設定は 1 (ON) がデフォルト
                $socialAccount = new SocialAccount(
                    $user->id, $param["social_type"], $param["social_token"], $param["social_secret"], $share
                );
                $socialAccount->save();
            }


            // user_id から User を生成
            $user = UserFactory::generateByUserId($socialAccount->user_id);

            // name が変わっていたら変更する - 2回目以降の登録のとき
            if($param['name'] != $user->name){
                $user->name = $param['name'];
                $user->save();

                // ユーザ情報更新
                $user = UserFactory::generateByUserId($socialAccount->user_id);
            }

            // 返却値生成
            $response = array(
                "id"         => $user->id,
                "token"      => $user->token,
                "created_at" => $user->created_at,
                "updated_at" => $user->updated_at,
            );

            return array("user" => $response, "meta" => array("status" => "true"));
        } catch (Zend_Db_Statement_Exception $e){
            switch ($e->getCode()){
                case "23000":
                    // 一意制約エラー
                    $msg = "your name was already used => " . $param["name"];
                    $code = "0001";
            }
            // throw new Frapi_Error("Error", "Error2", 403);
            // throw new Exception(array("meta" => array("status" => "false", "message" => $msg, "code" => $code)), 403);
            return new Frapi_Response(
                array(
                    "code" => 409,
                    "data" => array("meta" => array("status" => "false", "message" => $msg, "code" => $code))
                )
            );
        }
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

