var ApiMapper = require("apiMapper").ApiMapper;
var apiMapper = new ApiMapper();

// コントローラ呼び出し元からナビゲーションバーをセットする
exports.setNavigation = function(nav, parent){
    $.nav = nav;
    $.parent = parent;
};

/**
 * コントローラ起動時に渡される引数処理
 */
$.args = arguments[0] || {};
$.name.value = $.args.username;

// 完了ボタンを追加（初回のみ）
$.doneButton = Ti.UI.createButton({ systemButton: Ti.UI.iPhone.SystemButton.DONE });
$.doneButton.addEventListener('click', function(){
    // user/register を行う
    apiMapper.userregisterApi(
        $.name.value,
        $.args.social_type,
        $.args.social_token,
        $.args.social_secret,
        function(){
            // 成功したとき
            var json = eval('(' + this.responseText + ')');

            // トークンが返却されたか確認
            if(typeof json.user.token == 'undefined'){
                alert('登録に失敗しました。しばらくたってか再度お試し下さい');
            }
            // トークンをストア
            Titanium.App.Properties.setString('token', json.user.token);
            Titanium.App.Properties.setString('icon_url', $.args.picture);      // TODO: 将来は API 側に持つこと
            Alloy.Globals.user.token = json.user.token;

            // マップ画面へ戻る
            $.nav.close($.parent);
            $.win.close();
            $.parent.close();
        },
        function(e){
            // 失敗したとき
            if(typeof this.responseText == 'undefined'){
                // FrapiErrorのとき（ハンドリングしていないエラー）
                alert('登録に失敗しました。しばらくたってから再度お試し下さい。');
            }

            // ハンドリングしたエラーレスポンスがあるとき
            Ti.API.info(this.responseText);
            var json = eval('(' + this.responseText + ')');
            switch(json.meta.code){
                case '0001':
                alert('すでにユーザ名が利用されています');
                break;
            }
        }
    );
});
$.win.rightNavButton = $.doneButton;

/**
 * TextField が 0 文字のときは完了ボタンを消す
 */
$.name.addEventListener('change', function(){
    // テキストがないときは「DONE」非表示 （hideメソッドでは消えなかった)
    if(!($.name.hasText())){
        $.win.rightNavButton = null;
        return;
    }

    // バリデーション 英数字 + アンダースコア + ドット
    if(!/^[a-zA-Z0-9_.]+$/.test($.name.value)){
        alert('ユーザ名に使えない文字が含まれています');
        $.win.rightNavButton = null;
        return;
    };

    // ボタン表示
    $.win.rightNavButton = $.doneButton;
});

/*
*/