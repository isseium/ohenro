// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// アプリケーション情報を設定（環境別）
Ti.include("app_config.js");

// アプリケーション固定情報

// Center
Alloy.Globals.app.overview_lat = 39.701683;
Alloy.Globals.app.overview_lon = 141.136369;
Alloy.Globals.app.overview_lat_delta = 0.4;
Alloy.Globals.app.overview_lon_delta = 0.4;

// タイトル
Alloy.Globals.app.title = "いわて食巡り";
Alloy.Globals.app.list_title = "おすすめ飲食店";
Alloy.Globals.app.spot_index = "カ所";

// エラー文面
// TODO: あとで i18 対応に統合
Alloy.Globals.error = {
  FAILED_TO_ACCESS_API: "通信に失敗しました。",
};
