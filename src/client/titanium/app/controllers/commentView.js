var args = arguments[0] || {};
$.image.image = args.imagePath;
$.detail.text = args.detail || '';
// $.image.image = 'http://dotinstall.com/img/very_top.png';
var commonController = Alloy.createController("common");
var indicator = commonController.createActivityIndicator();
$.commentView.add(indicator);

// var statusBtn = Ti.UI.createButton({
	// title: 'Publish status with GRAPH API',
	// top: 45, left: 10, right: 10, height: 40
// });

var testArea = Titanium.UI.createTextArea({
        hintText:'I am a textarea',
        height:90,
        width:300,
        top:230,
        color:'#888',
        textAlign:'left',
        borderWidth:2,
        borderColor:'#bbb',
        borderRadius:5,
        font:{fontSize:20}
});

$.commentform.add(testArea);
$.postButton.addEventListener('click', function() {
	var text = testArea.value;
	if( (text === '')){
		Ti.UI.createAlertDialog({ tile:'ERROR', message:'No text to Publish !! '}).show();
	}else {
		Titanium.Facebook.requestWithGraphPath('me/feed', {message: text}, "POST", showRequestResult);
	}	
});
// actionsView.add(statusBtn);

function showRequestResult(e) {
	var s = '';
	if (e.success) {
		s = "SUCCESS";
		if (e.result) {
			s += "; " + e.result;
		}
		if (e.data) {
			s += "; " + e.data;
		}
		if (!e.result && !e.data) {
			s = '"success", but no data from FB.  I am guessing you cancelled the dialog.';
		}
	} else if (e.cancelled) {
		s = "CANCELLED";
	} else {
		s = "FAIL";
		if (e.error) {
			s += "; " + e.error;
		}
	}
	alert(s);
}

// $.postButton.addEventListener('click',function(){
    // Ti.Facebook.requestWithGraphPath(
        // 'me/feed',
        // {
             // message: "GraphAPIのテスト"
        // },
        // "POST",
        // function(e) {
            // if (e.success) {
                // alert("Success" + e.result);
				// indicator =null;
            // }
        // }
    // );
// });


