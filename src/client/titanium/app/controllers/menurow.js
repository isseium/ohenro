
var args = arguments[0] || {};

// チェックイン済みのときはアイコンをつける
if(args.checkin){
    $.icon.image = 'checkbox_checked_icon&16.png';
}

// タイトル
$.title.text = args.title || '';

// 任意プロパティ
$.row.customTitle = $.title;
$.row.customLat = args.latitude;
$.row.customLon = args.longitude;