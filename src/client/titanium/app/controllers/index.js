// インターネット接続状況を確認
if(!Titanium.Network.online){
    // ネットワークにつながっていないときはアラートを発して終了
    alert('インターネットへの接続に失敗しました。電波状況のよいところで再度お試し下さい。');
}

// APIMapper の準備
var ApiMapper = require("apiMapper").ApiMapper;

// Facebook Consumer Token & Secret
// TODO: あとで別ファイル管理にする
Ti.Facebook.appid = Alloy.Globals.app.facebook_appid;
Ti.Facebook.permissions = ['publish_stream','read_stream'];

// ユーザ情報を設定する
initUser();
initView();

// 地図表示用Viewを表示する
var mapView = Alloy.createController("mapView");
mapView.setNavigation($.ds.nav);    // Navigationバーのセット

// 地図画面に戻るたびに、情報を更新する
$.ds.innerwin.addEventListener('focus', function(){
    if(typeof Alloy.Globals.user === 'undefined'){
        initUser();
        initView();
    }
    // token が含まれているときは情報更新を試みる
    if(typeof Alloy.Globals.user !== 'undefined' && Alloy.Globals.user.token){
        initUser();
        initView();
    }

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
    var spotCount = 0;
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
        spotCount++;
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
        text : Alloy.Globals.app.list_title,
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
        text : "0 / " + spotCount + " " + Alloy.Globals.app.spot_index + "達成",
        font : {
            fontSize : 10,
        fontWeight : 'bold'
        },
        color : '#666666'
    });

    // countLabel変更
    countLabel.text = checkinCount + " / " + spotCount + " " + Alloy.Globals.app.spot_index + "達成\n残り " + (spotCount - checkinCount) + " " + Alloy.Globals.app.spot_index;

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
    // インターネット接続状況を確認
    if(!Titanium.Network.online){
        // ネットワークにつながっていないときはアラートを発して終了
        alert('インターネットへの接続に失敗しました。電波状況のよいところで再度お試し下さい。');
        return;
    }

    mapView.zoomTo(e.rowData.customLat, e.rowData.customLon);
    mapView.selectAnnotation(e.rowData.customTitle);      // ピンを選択して、ラベルを表示する
    $.ds.toggleSlider();   // メニューを閉じる
});

/**
 * ユーザ情報初期化
 * 端末のストアからユーザのtokenを取得する
 *
 * @param void
 * @return void
 */
function initUser(){
    // ストアからトークンを取得する
    Alloy.Globals.user = new Object();
    // token 情報がないときはなにもしない
    if(! Ti.App.Properties.hasProperty('token')){
        Ti.API.info('No token');
        return;
    }
    Alloy.Globals.user.token = Titanium.App.Properties.getString('token');
    Alloy.Globals.user.icon_url = Titanium.App.Properties.getString('icon_url');      // TODO: 将来は API 側に持つこと

    // すでにログイン済みのときは、API をたたいてユーザ情報を取得
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
                    tmpData.image = 'pin_before.png';
                    spotData[tmpData.spot_id] = tmpData;
                }

                // 自分のチェックイン情報とマージする
                // TODO: setAnnotation と setTableData を必ず実行するようにしたい（いまべたがき）
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
                                spotData[json.spots[i].id].image = 'pin_after.png';
                            }
                            mapView.setAnnotation(spotData);
                            setTableData(spotData);
                        } ,
                        function(e){
                            alert('データの取得に失敗しました。 [userMy]');
                            Ti.API.info(this.responseText);
                            // マスタデータのみ表示
                            mapView.setAnnotation(spotData);
                            setTableData(spotData);
                        }
                        );
                }else{
                    // ユーザ登録していないときは、 マスタデータのみ表示
                    mapView.setAnnotation(spotData);
                    setTableData(spotData);
                }
            },
        function(){
            // 失敗したとき
            Alloy.Globals.user = null;
            alert('データの取得に失敗しました。 [spotAll]');
        }
    );
}

/**
 * 右上ボタンの初期化
 * ユーザ未登録のときは、サインアップ画面へ遷移するボタン
 * ユーザ登録済みのときは、設定画面へ遷移するボタン
 */
function initView(){
    if(typeof Alloy.Globals.user.token == 'undefined'){
        // 未登録のとき
        $.ds.innerwin.setRightNavButton($.ds.signup);
    }else{
        // 登録済みのとき
        $.ds.innerwin.setRightNavButton($.ds.setting);
        
    }
}

$.ds.setting.addEventListener('click', function(){
    if(!Titanium.Network.online){
        // ネットワークにつながっていないときはアラートを発して終了
        alert('インターネットへの接続に失敗しました。電波状況のよいところで再度お試し下さい。');
        return;
    }
    
    var controller = Alloy.createController('setting');
    var win = controller.getView();
    controller.setNavigation($.ds.nav, win);
    win.title = "設定";
    $.ds.nav.title = '設定';
    $.ds.nav.open(win);
});

$.ds.signup.addEventListener('click', function(){
    if(!Titanium.Network.online){
        // ネットワークにつながっていないときはアラートを発して終了
        alert('インターネットへの接続に失敗しました。電波状況のよいところで再度お試し下さい。');
        return;
    }

    var controller = Alloy.createController('loginView');
    var win = controller.getView();
    controller.setNavigation($.ds.nav, win);
    $.ds.nav.open(win);
    $.ds.nav.title = 'ユーザ登録';
});
