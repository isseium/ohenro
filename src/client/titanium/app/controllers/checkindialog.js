var ApiMapper = require("apiMapper").ApiMapper;
var apiMapper = new ApiMapper();

/**
 * コントローラ起動時に渡される引数処理
 */
var args = arguments[0] || {};
$.args =  args;

// 呼び出し元からナビゲーションバーをセットする
exports.setNavigation = function(nav, parent, own){
    $.nav = nav;
    $.parent = parent;
    $.own = own;
};

// アップロードデータ格納用変数
var uploadData = { photo: null };

/**
 * スポットにチェックインする
 */
var checkinSpot = function(){
    var spot_id = $.args.spot_id;
    var comment = $.comment.value;
    
    apiMapper.spotcheckinApi(Alloy.Globals.user.token, spot_id, comment, uploadData.photo,
        function(e){
            //成功時
            Ti.API.info("Received text: " + this.responseText);
            alert('チェックインしました');

            // Map画面に戻る
            $.nav.close($.parent);
            $.nav.close($.own);
            $.own.close();
            $.parent.close();
        },
        function(e){
            //失敗時
            Ti.API.info("Received text: " + this.responseText);
            alert('チェックインに失敗しました : ' + this.responseText);
            checkinButton.touchEnabled = true;
            checkinButton.touchEnabled = true;
            $.indicator_dialog.hide();
        }
    );
};
var checkinButton = Ti.UI.createButton({title: 'Checkin'});
checkinButton.addEventListener('click', checkinSpot);
checkinButton.addEventListener('click', function(){
    // ダイアログ表示
    $.indicator_dialog.show();
    $.indicator.show();
    
    // 多重投稿防止
    $.checkindialog.touchEnabled = false;
    checkinButton.touchEnabled = false;
});
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
      // チェックイン画像編集
      uploadData.photo = event.media.imageAsResized(960, 960);
      
      // カメラマークを変える
      cameraButton.image = "camera_taken.png",
      cameraButton.backgroundImage = "";
  
      // コメントにフォーカス
      $.comment.focus();
    },
    error:  function(e){
      alert(e.message);
    },
    cancel: function(){
      $.comment.focus();
    },
    saveToPhotoGallery:true,                // 撮影データのフォトギャラリーへの保存
    allowEditing: true,                     // 選択直後に拡大縮小移動をするか否かのフラグ
    mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO], // 選択可能なメディア種別を配列で指定
  });
});

// KeyboardToolbar に追加
var toolbar = Titanium.UI.iOS.createToolbar({
  items:[flexSpace, cameraButton, fixSpace],
  barColor: "black",
});
$.comment.setKeyboardToolbar(toolbar); 
