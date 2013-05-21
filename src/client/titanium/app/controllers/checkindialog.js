/**
 * コントローラ起動時に渡される引数処理
 */
var args = arguments[0] || {};
$.args =  args;

// 呼び出し元からナビゲーションバーをセットする
exports.setNavigation = function(nav, parent){
    $.nav = nav;
    $.parent = parent;
};

// アップロードデータ格納用変数
var uploadData = {
  photo: null,
  message: "",
};

/**
 * スポットにチェックインする
 */
var checkinSpot = function(){
    var spot_id = $.args.spot_id;
    var comment = $.comment.value;

    apiMapper.spotcheckinApi(Alloy.Globals.user.token, spot_id, comment,
        function(e){
            //成功時
            Ti.API.info("Received text: " + this.responseText);
            Ti.API.info('Checkin completed');

            // Map画面に戻る
            $.nav.close($.parent);
//            $.nav.group.close($.checkin.getView());
//            
        },
        function(e){
            //失敗時
            Ti.API.info("Received text: " + this.responseText);
            alert('チェックインに失敗しました : ' + e.data);
        }
    );
};

// コメントヒント
$.comment.hintText = "コメント"
$.comment.addEventListener('focus', function(){
  if($.comment.value == ""){
    $.comment.value = $.comment.hintText;
    $.comment.changed = false;
  }
  if($.comment.value == $.comment.hintText){
    $.comment.value = "";
    $.comment.changed = true;
  }
});

// 1. 右上にチェックインボタンを表示する（キーボードで下部のチェックインボタンが隠れてしまうため）
var checkinButton = Ti.UI.createButton({title: 'Checkin'});
checkinButton.addEventListener('click', checkinSpot);
$.checkindialog.rightNavButton = checkinButton;

// 画面表示完了後にコメント欄にfocus
$.checkindialog.addEventListener('open', function(){
  $.comment.focus();
});

// Keyboard Toolbar (Camera)
var flexSpace = Ti.UI.createButton({systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE});
var fixSpace = Ti.UI.createButton({systemButton:Ti.UI.iPhone.SystemButton.FIXED_SPACE, width:"10%"});
var cameraButton = Ti.UI.createButton({
  image: "camera.png",
  backgroundImage: "",
});

cameraButton.addEventListener('click', function(){
  Titanium.Media.showCamera({
    success: function(event) {
      uploadData.picture = event.media;
      
      // カメラマークを変える
      cameraButton.image = "camera_taken.png",
      cameraButton.backgroundImage = "";
      $.comment.focus();
    },
    error:  function(e){
      alert(e.message);
    },
    cancel: function(){},
    saveToPhotoGallery:true,                // 撮影データのフォトギャラリーへの保存
    allowEditing: true,                     // 選択直後に拡大縮小移動をするか否かのフラグ
    mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO], // 選択可能なメディア種別を配列で指定
  });
});

// KeyboardToolbar に追加
var toolbar = Titanium.UI.iOS.createToolbar({
  items:[flexSpace, cameraButton, fixSpace],
//  barColor: "#222",
});
$.comment.setKeyboardToolbar(toolbar); 
