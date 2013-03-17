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
    access_token = Ti.Facebook.getAccessToken(),

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
	    consumerKey:'8xXecpTnfVPYy8AaXvQAxA',
	    consumerSecret:'p49btQOfliSk8ZZqGjG1Y8pRikB3SOSbjZDNUHsPk'
	});
	twitterApi.init();
});

// ログイン後は、トークンのみを保持して、登録情報入力画面へ
// FIXME: ログイン画面がたくさんでる。Ti.Facebook が
Ti.Facebook.removeEventListener('login', loginFacebook);
Ti.Facebook.addEventListener('login', loginFacebook);

$.loginView.addEventListener('close', function(){
    Ti.Facebook.removeEventListener('login', loginFacebook);
});
