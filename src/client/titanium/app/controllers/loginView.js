var ApiMapper = require("apiMapper").ApiMapper;
var apiMapper = new ApiMapper();
var TwSocial_type = 1;
var fbSocial_type = 2;

// コントローラ呼び出し元からナビゲーションバーをセットする
exports.setNavigation = function(nav, parent){
    $.nav = nav;
    $.parent = parent;
};

var loginFacebook = function(e){
    if(e.error){
        alert(e.error);
        return;
    }else if(e.canceled){
        return;
    }

    // アクセストークン取得
    access_token = Ti.Facebook.getAccessToken();
    // 名前を取得して次の画面へ
    Ti.Facebook.requestWithGraphPath(
            'me?fields=username,picture',
            {access_token: access_token},
            "GET",
            function(e) {
                if (e.success) {
                    var obj = JSON.parse(e.result);

                    // 次の画面へ
                    var args = {
                        social_token: access_token,
                        username: obj.username,
                        social_type: fbSocial_type,
                        picture: obj.picture.data.url,
                    };
                    var controller = Alloy.createController('join', args);
                    var view = controller.getView();
                    controller.setNavigation($.nav, view);
                    view.title = "ユーザ登録";
                    $.nav.open(view);
                    $.nav.close($.parent);
                }
            }
    );
};

// Facebook ログインボタン
$.facebookButton.addEventListener('click', function() {
    // ログインしているときはログアウト
    if(Ti.Facebook.loggedIn){
        Ti.Facebook.logout();
    }
    Ti.Facebook.authorize();
});

// Twitter ログインボタン
$.twitterButton.addEventListener('click', function(e) {
    Ti.include('twitter_api.js');

    //initialization
    var twitterApi = new TwitterApi({
        consumerKey: Alloy.Globals.app.twitter_consumer_token,
        consumerSecret:Alloy. Globals.app.twitter_consumer_secret,
    });
    
    // いったん初期化
    // twitterApi.clear_accesstoken();


    // TODO: エレガントな方法もとむ
    // コールバックができなかったので
    // oauth_adapter.js の getAccessToken メソッドにて、Alloy.Globals.setTwitterAccount() を直に書いてコールしている
    Alloy.Globals.setTwitterAccount = function(responseParams){
        twitterApi.account_verify_credentials({
            onSuccess: function(e){
                           // 次の画面へ
                           var args = {
                               social_token: responseParams['oauth_token'],
                               social_secret: responseParams['oauth_token_secret'],
                               username: responseParams['screen_name'],
                               social_type: TwSocial_type,
                               picture: e['profile_image_url'],
                           };

                           // TODO: 冗長なので綺麗にしたい
                           var controller = Alloy.createController('join', args);
                           var view = controller.getView();
                           controller.setNavigation($.nav, view);
                           view.title = "ユーザ登録";
                           $.nav.open(view);
                           $.nav.close($.parent);
                       },
            onError: function(){
                         alert('認証に失敗しました');
                         twitterApi.clear_accesstoken();
                     }
        });
    };

    // 認証
    twitterApi.init();
});

// ログイン後は、トークンのみを保持して、登録情報入力画面へ
// FIXME: ログイン画面がたくさんでる。Ti.Facebook が
Ti.Facebook.removeEventListener('login', loginFacebook);
Ti.Facebook.addEventListener('login', loginFacebook);

$.loginView.addEventListener('close', function(){
    Ti.Facebook.removeEventListener('login', loginFacebook);
});
