
// Debug
Alloy.Globals.user = new Object();
Alloy.Globals.user.token = "00a5f7f7e7124313e12ca14efe8f5c81e59b7a15";



// 呼び出し元からナビゲーションバーをセットする
exports.setNavigation = function(nav){
    $.nav = nav;
};

/**
 * アノテーション（ピン）を配置する
 *
 * @TODO  引数がわかりにくいのでどこかで直す
 * @param array<mixed> data    スポットデータ
 *                      number :spot_id     スポットID
 *                      string :title       スポット名
 *                      string :description スポット概要
 *                      number :latitude    緯度
 *                      number :longitude   経度
 * @return void
 */
exports.setAnnotation = function(data){
	for ( i = 0; i < data.length; i++) {
		var annotation = Ti.Map.createAnnotation({
		    myid: i,
			latitude: data[i].latitude,
			longitude: data[i].longitude,
			title: data[i].title,
			animate: true,

			// 任意プロパティ
		    spot_id: data[i].spot_id,
			mydescription: data[i].description,
		});
		$.mymap.addAnnotation(annotation);
	}

    // 地図の中心を1つ目のスポットに設定（デバッグ用）
    // TODO: 削除すること
    var scrollTo1stSpot = function(){
        var region = {latitude:data[0].latitude,longitude:data[0].longitude,animate:true,latitudeDelta:0.04, longitudeDelta:0.04};
    	$.mymap.setLocation(region);
    }
    scrollTo1stSpot();
};

/**
 * マップタップ時の挙動を定義
 */
$.mymap.addEventListener('click', function(e){
    // ピンのタイトルをタップしたときに checkin 画面表示
    // refs. http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Map-method-createAnnotation
    if (e.clicksource == 'title'){
    	var args = {
    	    spot_id: e.annotation.spot_id,
    		title : e.annotation.title,
    		imagePath: e.annotation.imagePath,
    		description: e.annotation.mydescription,                         // description というプロパティは予約されているので使えないみたい
    		spotPosition: {latitude: e.annotation.latitude, longitude: e.annotation.longitude},
    		currentPosition: Alloy.Globals.currentPosition,                  // 現在地情報
    	};
        var controller = Alloy.createController('checkin', args);
        var view = controller.getView();

        /**
         * ナビゲーションバー関連
         */
        // var parentView =
        controller.setNavigation($.nav, view);
        // view.setNavigation($.nav, parentView);
        view.title = e.annotation.title;
        $.nav.open(view);
    }
});

//テーブルビューをクリックし、名所の場所を表示
// TODO: Typo だよ chenge => change
exports.chengePoint = function(lat,lon){
	var region = {latitude:lat,longitude:lon,animate:true,latitudeDelta:0.04, longitudeDelta:0.04};
	$.mymap.setLocation(region);
};

// 定期的に現在地情報を取得し、Alloyのグローバル領域に設定する
Ti.Geolocation.purpose = "For checkin";
Ti.Geolocation.addEventListener('location', function(){
    Ti.Geolocation.getCurrentPosition(function(e){
        if (e.error){
            Titanium.API.error(e.error);
            return;
        }

        // Global変数に格納
        Alloy.Globals.currentPosition = e.coords;
    });
});

/**
 * 現在地を表示の中心にする
 *
 * @param  void
 * @return void
 */
function scrollToCurrentPosition(){
    $.mymap.setLocation({
        latitude: Alloy.Globals.currentPosition.latitude,
        longitude: Alloy.Globals.currentPosition.longitude,
        animate: true,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
    });
}

/**
 * 全体が俯瞰できるPositionに変更する
 *
 * @param  void
 * @return void
 */
function scrollToOverheadView(){
    $.mymap.setLocation({
        latitude: 38.591114,
        longitude: 140.95459,
        animate: true,
        latitudeDelta: 4,
        longitudeDelta: 4,
    });
}

//現在地ボタンのイベント
/*
$.mapButtons.addEventListener('click', function(e){
    switch(e.index){
		case 0:
            break;
	}
});
*/