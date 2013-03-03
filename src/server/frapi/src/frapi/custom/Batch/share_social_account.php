<?php
/**
 * ShareQueue をもとに ソーシャルネットワーク上にシェアを行うバッチ
 */

// bootstrap 読み込み
require_once( dirname(__file__) . '/../../tests/bootstrap.php');

// 設定読み込み
$config = new Zend_Config_Ini(CUSTOM_PATH . '/Config/config.ini');

// シェアキューから情報取得
$shares = ShareQueue::dequeue();


foreach($shares as $s ){
    // Twitter
    if($s["share_dist"] & 1){
        // Token を取得する
        $socialAccount = SocialAccountManager::generateByUserId($s["user_id"], 1);

        $token = $socialAccount[0]->token;
        $secret = $socialAccount[0]->secret;
        
        $config_array = $config->toArray();
        $token_access = new Zend_Oauth_Token_Access();
        $token_access->setToken($token);
        $token_access->setTokenSecret($secret);


        $client = $token_access->getHttpClient($config_array["share"]["tw"]);

        $client->setUri('https://api.twitter.com/1.1/statuses/update.json');
        $client->setMethod(Zend_Http_Client::POST);
        $client->setParameterPost('status', $s["message"]);
        $response = $client->request();
        // TODO: エラーハンドリング
        // $data = Zend_Json::decode($response->getBody());
        // $result = $response->getBody();
    }

    // Facebook
    if($s["share_dist"] & 2){
        // Token を取得する
        $socialAccount = SocialAccountManager::generateByUserId($s["user_id"], 2);
        $token = $socialAccount[0]->token;


        // シェア準備
        $config_array = $config->toArray();
        $token_access = new Zend_Oauth_Token_Access();
        $client = $token_access->getHttpClient($config_array["share"]["fb"]);

        $client->setUri('https://graph.facebook.com/me/feed');
        $client->setMethod(Zend_Http_Client::POST);
        $client->setParameterPost('access_token', $token);
        $client->setParameterPost('message', $s["message"]);
        $response = $client->request();
        // TODO: エラーハンドリング
        // $data = Zend_Json::decode($response->getBody());
        // $result = $response->getBody();
    }

    // シェア済みに変更
    ShareQueue::changeStatus($s["queue_id"], 2);
}
