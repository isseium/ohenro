var ApiMapper = require("apiMapper").ApiMapper;
var apiMapper = new ApiMapper();

/**
 * コントローラ起動時に渡される引数処理
 */
var args = arguments[0] || {};
$.args =  args;

// 表示設定
// $.title.text = args.title || '';
$.description.text = $.args.description || '';
// $.image.image = args.imagePath;

// 呼び出し元からナビゲーションバーをセットする
exports.setNavigation = function(nav, parent){
    $.nav = nav;
    $.parent = parent;
};

// Checkinの有効無効設定
if( isUserLogined() &&
    isSpotNear($.args.currentPosition.latitude, $.args.currentPosition.longitude,
               $.args.spotPosition.latitude   , $.args.spotPosition.longitude)
    ){
    // チェックイン許可
    $.checkinButton.touchEnabled = true;
    $.checkin.opacity = 1;
    
    // チェックインダイアログ
    var dialog = Alloy.createController('checkindialog').getView();
    dialog.open();
}else{
    // チェックイン拒否

    // ログイン状態に応じてコメントを変更
    if(isUserLogined()){
    }else{
        // $.comment.value = "チェックインをするにはログインする必要があります";
        alert('チェックインするにはユーザ登録が必要です');
    }

    $.checkinButton.touchEnabled = false;
    $.checkinButton.touchEnabled = true;
    $.checkinButton.opacity = 0.70;
}

/**
 * チェックインできる位置にスポットが存在するかチェック
 *
 * @param number myLat      ユーザのlat
 * @param number myLon      ユーザのlon
 * @param number spotLat    スポットのlat
 * @param number spotLon    スポットのlon
 * @param number baseDistance    "近くに存在するか"の基準値（km指定: default 0.2km）
 * @return boolean          true: 近くに存在する / false: 近くに存在しない
 *
 */
function isSpotNear(myLat, myLon, spotLat, spotLon, baseDistance){

    // 閾値（default 0.2km)
    var baseDistance = baseDistance || 0.2;

    // 距離を計算
    var R = 6371; // 地球の半径（km）
    var dLat = (spotLat-myLat) * Math.PI / 180;
    var dLon = (spotLon-myLon) * Math.PI / 180;
    var myLat = myLat * Math.PI / 180;
    var spotLat = spotLat * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(myLat) * Math.cos(spotLat);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var distance = R * c;

    Ti.API.info("Distance: " + distance);

    return (distance < baseDistance);
}

/**
 * ログインしているか判定
 * @param void
 * @return boolean true: ログイン済み, false: 未ログイン
 */
function isUserLogined(){
    if(typeof Alloy.Globals.user.token === "undefined"){
        return false;
    }

    return true;
}

function openCheckinDialog(){
    // チェックインダイアログ
    var controller = Alloy.createController('checkindialog')
    controller.setNavigation($.nav, $.win);
    var dialog = controller.getView();
    $.nav.open(dialog);
}
