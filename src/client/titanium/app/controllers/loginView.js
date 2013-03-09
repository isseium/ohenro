var ApiMapper = require("apiMapper").ApiMapper;
var apiMapper = new ApiMapper();
var fbSocial_type = 0;
var TwSocial_type = 1;


Ti.Facebook.appid = 606983742650457;
Ti.Facebook.permissions = ['publish_stream','read_stream'];

$.facebookButton.addEventListener('click', function() {
	if (Ti.Facebook.loggedIn){
	    var accTo = Titanium.Facebook.getAccessToken();
	    // alert(accTo);
	    var name = viewFbInfo(accTo);
	    var social_secret = ''
	    //ユーザ登録
		userRegister(name,fbSocial_type,accTo,social_secret);
	}else{
	 	Titanium.Facebook.authorize();	
	}
});

var viewFbInfo = function(accTo){
    Ti.Facebook.requestWithGraphPath(
	    'me?fields=name,picture',
	    {access_token:accTo},
	    "GET",
	    function(e) {
	        if (e.success) {
	            var obj = JSON.parse(e.result);
	            // alert(obj.picture.data.url);
	            // alert("Success: " + e.result);
	            // $.image = "http://graph.facebook.com/"+obj.uid+"/picture";
				var bfImage = Ti.UI.createImageView({
					image:obj.picture.data.url,
					width:100,
					height:100,
					top:200
				});
				$.loginView.add(bfImage);
				
				var fbName = Ti.UI.createLabel({
					top:280,
					text:obj.name
				});
				$.loginView.add(fbName);
				$.facebookButton.hide();
				return obj.name;
	        }
	    }
	);	
};

/**
 * ユーザ登録
 */
var userRegister = function(name,social_type,social_token,social_secret){
	apiMapper.userregisterApi(
		name,
		social_type,
		social_token,
		social_secret,
		function(){
			// 成功したとき
			var json = eval('(' + this.responseText + ')');
			Alloy.Globals.user = json.user;		
		},
		function(e){
			// 失敗したとき
			alert(e.result + 'データの取得に失敗しました。');
		}
	);	
};

$.twitterButton.addEventListener('click', function(e) {
	Ti.include('twitter_api.js');
	//initialization
	var twitterApi = new TwitterApi({
	    consumerKey:'8xXecpTnfVPYy8AaXvQAxA',
	    consumerSecret:'p49btQOfliSk8ZZqGjG1Y8pRikB3SOSbjZDNUHsPk'
	});
	twitterApi.init(); 
});
