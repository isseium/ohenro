$.title = "タイトル";
Ti.Facebook.appid = 606983742650457;
Ti.Facebook.permissions = ['publish_stream','read_stream'];

// Ti.Facebook.logout();
// Ti.Facebook.authorize();

$.twitterButton.addEventListener('click', function(e) {
	Ti.include('twitter_api.js');
	//initialization
	var twitterApi = new TwitterApi({
	    consumerKey:'8xXecpTnfVPYy8AaXvQAxA',
	    consumerSecret:'p49btQOfliSk8ZZqGjG1Y8pRikB3SOSbjZDNUHsPk'
	});
	twitterApi.init(); 
});

// $.facebookInfo.addEventListener('click', function(e) {
    // // Ti.Facebook.requestWithGraphPath(
        // // 'me',
        // // {},
        // // "GET",
        // // function(e) {
            // // if (e.success) {
                // // var obj = JSON.parse(e.result);
                // // // alert("Success: " + obj.name);
				// // $.image = Ti.UI.createImageView({
					// // image:obj.pic_square,
					// // left:10,
					// // width:50,
					// // height:50
				// // });
            // // }
        // // }
    // // );
	// var query = "SELECT uid, name, pic FROM user ";
	// query +=  "where uid  = " + Titanium.Facebook.uid;
	// Ti.API.info('user id ' + Titanium.Facebook.uid);
	// Titanium.Facebook.request('fql.query', {query: query},  function(r) {
		// if (!r.success) {
			// if (r.error) {
				// alert(r.error);
			// } else {
				// alert("call was unsuccessful");
			// }
			// return;
		// }
		// var result = JSON.parse(r.result);
		// $.image = Ti.UI.createImageView({
			// image:r.pic,
			// left:10,
			// width:50,
			// height:50
		// });
	// });
// });
