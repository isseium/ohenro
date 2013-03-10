// APIMapper の準備
var ApiMapper = require("apiMapper").ApiMapper;

// ユーザ情報を設定する
initUser();

// 地図表示用Viewを表示する
var mapView = Alloy.createController("mapView");
mapView.setNavigation($.ds.nav);    // Navigationバーのセット

// 地図画面に戻るたびに、情報を更新する
$.ds.innerwin.addEventListener('focus', function(){
    loadSpot();
});

$.ds.innerwin.add(mapView.getView());

// TODO: 不明あとで聞く
if (Ti.Platform.osname === 'iphone'){
	$.win.open({
		transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
} else {
    $.win.open();
}

/**
 * 巡礼地一覧にスポットデータをマッピングする
 *
 * TODO: View に関する技術が記載されている。MVCの分離（保守性向上）のためあとで修正する
 *
 * @param array spodData
 * @return void
 */
function setTableData(spotData){
	var tableData = [];
	var section = Ti.UI.createTableViewSection();

	// 巡礼地一覧
	var checkinCount = 0;
	for ( var i in spotData) {
        var args = {
            title : spotData[i].title,
            latitude : spotData[i].latitude,
            longitude : spotData[i].longitude,
            checkin: spotData[i].checkin,
        };
        section.add(Alloy.createController('menurow', args).getView());

        // チェックイン済みの巡礼地数を取得（TODO: もっとよい方法求む）
        if(spotData[i].checkin){
            checkinCount++;
        }
    }

	// Header の設定
	var headerView = Ti.UI.createView({
		height : 'auto',
		backgroundGradient : {
			type : "linear",
			startPoint : {
				x : "0%",
				y : "0%"
			},
			endPoint : {
				x : "0%",
				y : "100%"
			},
			colors : [{
				color : "#EEE",
				offset : 0.0
			}, {
				color : "#CCC",
				offset : 1.0
			}]
		}
	});

	var headerLabel = Ti.UI.createLabel({
		top : 8,
		bottom : 8,
		left : 10,
		right : 10,
		height : 'auto',
		text : "巡礼地一覧",
		font : {
			fontSize : 18,
			fontWeight : 'bold'
		},
		color : '#666666'
	});
	var countLabel = Ti.UI.createLabel({
		top : 8,
		bottom : 8,
		right : 10,
		height : 'auto',
		text : "0 / 88 箇所巡礼済",
		font : {
			fontSize : 10,
			fontWeight : 'bold'
		},
		color : '#666666'
	});

    // countLabel変更
    countLabel.text = checkinCount + " 箇所巡礼済\n残り " + (88 - checkinCount) + " 箇所";

    // Viewをセット
    headerView.add(headerLabel);
    headerView.add(countLabel);
    section.headerView = headerView;

    // テーブルに追加
	$.ds.tableView.data = [section];
};

/**
 * スポット一覧画面のメニューをタップしたとき
 * タップしたスポットを中心に表示する
 */
$.ds.tableView.addEventListener('click', function selectRow(e) {
    mapView.zoomTo(e.rowData.customLat, e.rowData.customLon);
    $.ds.toggleSlider();   // メニューを閉じる
});

/**
 * ログインボタンが押下された際の操作
 */
$.ds.rightButton.addEventListener('click', function(e) {
	var controller = Alloy.createController('loginView');
	var win = controller.getView();
	$.ds.nav.open(win);
	$.ds.nav.title = 'ログイン';
});

/**
 * ユーザ情報初期化
 * 端末のストアからユーザのtokenを取得する
 *
 * @param void
 * @return void
 */
function initUser(){
    // TODO: ストアからトークンを取得する
    Alloy.Globals.user = new Object();
    Alloy.Globals.user.token = "00a5f7f7e7124313e12ca14efe8f5c81e59b7a15"; // TODO: debug 用 あとで消すこと

    // すでにログイン済みのときは、API をたたいてユーザ情報を取得
    if(Alloy.Globals.user.token){
        var apiMapper = new ApiMapper();
        apiMapper.usermyApi(Alloy.Globals.user.token,
            function(){
                // 成功したとき
                var json = eval('(' + this.responseText + ')');
                Alloy.Globals.user.id = json.user.id;
                Alloy.Globals.user.name = json.user.name;
                Alloy.Globals.user.social = [];
                for(var i=0; i<json.user.social.length; i++){
                    Alloy.Globals.user.social[i] = json.user.social[i];
                }
                Alloy.Globals.user.created_at = json.user.created_at;
                Alloy.Globals.user.updated_at = json.user.updated_at;
            },
            function(){
                // 失敗したとき
                alert('データの取得に失敗しました。');
            }
        );
    }
}

/**
 * 巡礼地情報取得
 * @param void
 * @return void
 */
function loadSpot(){
    var apiMapper = new ApiMapper();
    apiMapper.spotAllApi(
    	function(){
    		// 成功したとき
            var spotData = {};
    		var json = eval('(' + this.responseText + ')');
    		for(i = 0; i < json.spots.length; i++){
    		    var tmpData = new Object();
    			tmpData.prefecture = '青森県'; //現在固定値
    			tmpData.spot_id = json.spots[i].id;
    			tmpData.title = json.spots[i].name;
    			tmpData.description = json.spots[i].description;
    			tmpData.latitude = json.spots[i].location.lat;
    			tmpData.longitude = json.spots[i].location.lon;
    			tmpData.checkin = false;     // checkinしたか
    			spotData[tmpData.spot_id] = tmpData;
    		}

    		// 自分のチェックイン情報とマージする
    		if( typeof Alloy.Globals.user.token != 'undefined' ){
                apiMapper.spotMyApi(
                    Alloy.Globals.user.token,
                    function(){
                        var json = eval('(' + this.responseText + ')');
                        for(i = 0; i < json.spots.length; i++){
                            spotData[json.spots[i].id].checkin = true;
                            spotData[json.spots[i].id].checkin_id = json.spots[i].checkin_id;
                            spotData[json.spots[i].id].comment = json.spots[i].comment;
                            spotData[json.spots[i].id].checkin_time = json.spots[i].updated_at;
                        }
                        mapView.setAnnotation(spotData);
                        setTableData(spotData);
                    }
                );
    		}
    	},
    	function(){
    		// 失敗したとき
    		alert('データの取得に失敗しました。');
    	}
    );
}
