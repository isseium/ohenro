/**
 * アプリケーション設定
 *
 * @author isseium
 *
 * 環境別に変更する必要がある項目をまとめています。
 *
 * 各種項目を埋めて app_config.js にファイル名を変更して利用してください。
 * なお、app_config.js は重要な機密データなので、コミットしないようにしてください（.gitignore に除外設定を記載しています）
 */

// app
Alloy.Globals.app = new Object();

// 環境取得
var env = Ti.App.deployType;

// For release
switch(env){
    case 'production':
        Alloy.Globals.app = {
            twitter_consumer_token: "",
            twitter_consumer_secret: "",
            facebook_appid: "",
            api_endpoint: "http://example.com/api",
        };
        break;
    case 'development':
    case 'test':
        Alloy.Globals.app = {
            twitter_consumer_token: "",
            twitter_consumer_secret: "",
            facebook_appid: "",
            api_endpoint: "http://example.com/api",
        };
        break;
    default:
        break;
}
