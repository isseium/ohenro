/**
 * mapView.js
 *
 * 地図表示関連をコントロールする
 *
 * @author ganezasan, isseium
 *
 * @todo    コントローラ名からViewを取り除く
 * @todo    Modelを利用してコントローラを小さくする
 * @todo    インデントを 4スペースに変更する
 *
 */



// 呼び出し元からナビゲーションバーをセットする
exports.setNavigation = function(nav){
    $.nav = nav;
};

/**
 * アノテーション（ピン）を配置する
 *
 * @TODO  引数がわかりにくいのでどこかで直す
 * @param array<mixed> spotData    スポットデータ
 *                      number :spot_id     スポットID
 *                      string :title       スポット名
 *                      string :description スポット概要
 *                      number :latitude    緯度
 *                      number :longitude   経度
 * @return void
 */
exports.setAnnotation = function(spotData){
    // 地図のアノテーションを削除
    $.mymap.removeAllAnnotations();

    for ( var i in spotData){
        // チェックインコメントを整形
        var checkin_comment = "未チェックイン"
            if(typeof spotData[i].comment !== "undefined"){
                checkin_comment = "[" + spotData[i].checkin_time + "]" + spotData[i].comment;
            }

        // アノテーション作成
        var annotation = Ti.Map.createAnnotation({
            myid: i,
            latitude: spotData[i].latitude,
            longitude: spotData[i].longitude,
            title: spotData[i].title,
            subtitle: checkin_comment,
            animate: true,
            pincolor: (spotData[i].checkin) ? Titanium.Map.ANNOTATION_GREEN : Titanium.Map.ANNOTATION_RED, // チェックイン履歴によってピン色を変える
            rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
            bubbleParent: false,             // タップ時に後ろのピンをタップすることを防ぐ
            // 任意プロパティ
            spot_id: spotData[i].spot_id,
            mydescription: spotData[i].description,
            comment: spotData[i].comment,
            checkin: spotData[i].checkin,
            checkin_time: spotData[i].checkin_time,
            image: spotData[i].image,
        });
        $.mymap.addAnnotation(annotation);
    }
};

/**
 * マップタップ時の挙動を定義
 */
$.mymap.addEventListener('click', function(e){
    // ピンのタイトルをタップしたときに checkin 画面表示
    // refs. http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Map-method-createAnnotation
    if (e.clicksource == 'title' || e.clicksource == 'rightButton'){
        var args = {
          spot_id: e.annotation.spot_id,
          title : e.annotation.title,
          imagePath: e.annotation.imagePath,
          description: e.annotation.mydescription,                         // description というプロパティは予約されているので使えないみたい
          spotPosition: {latitude: e.annotation.latitude, longitude: e.annotation.longitude},
          currentPosition: Alloy.Globals.currentPosition,                  // 現在地情報
          comment: e.annotation.comment,
          checkin: e.annotation.checkin,
          checkin_time: e.annotation.checkin_time,
        };
        var controller = Alloy.createController('checkin', args);
        var view = controller.getView();

        /**
         * ナビゲーションバー関連
         */
        // var parentView =
        controller.setNavigation($.nav, view);
        view.title = e.annotation.title;
        $.nav.open(view);
    }
});

/**
 * 指定した位置にズームする
 */
exports.zoomTo = function(lat,lon){
    var region = {latitude:lat,longitude:lon,animate:true,latitudeDelta:0.04, longitudeDelta:0.04};
    $.mymap.setLocation(region);
};

/**
 * 指定したアノテーション（pin) のラベルを表示させる
 */
exports.selectAnnotation = function(annotation){
    $.mymap.selectAnnotation(annotation);
};

// 日本を俯瞰する状態をデフォルトにする
scrollToOverheadView();


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
        latitude: Alloy.Globals.app.overview_lat,
        longitude: Alloy.Globals.app.overview_lon,
        animate: true,
        latitudeDelta: Alloy.Globals.app.overview_lat_delta,
        longitudeDelta: Alloy.Globals.app.overview_lon_delta,
    });
}
