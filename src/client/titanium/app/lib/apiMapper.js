/**
 * @author KOMATSU Issei
 */

/**
 * インスタンス化の仕方
 * var ApiMapper = require("lib/ApiMapper").ApiMapper;
 * var apiMapper = new ApiMapper();
 */

/*
 * 天気予報を取得するサンプル
 *
 apiMapper.forecastApi(
 "41",		// 緯度
 "139.7",	// 経度
 function(){
// 成功したとき
var json = eval('(' + this.responseText + ')');
alert(json.forecast.temperature.min); // 最低気温をalert表示
label1.text = json.forecast.date;	// label1 のテキストを日付に変更する場合
},
function(){
// 失敗したとき
alert('天気予報の取得に失敗しました');
}
);
*/

/*
 * 通知設定をするサンプル
 *
 apiMapper.notificationApi(
 "deviceId",	// device_id
 "41",		// 緯度
 "139.7",	// 経度
 function(){
// 成功したとき
var json = eval('(' + this.responseText + ')');
alert(json);
},
function(){
// 失敗したとき
alert('通知の設定に失敗しました');
}
);
*/

/*
 * プリミティブなAPIアクセサ
 * 原則、プライベートメソッドとする
 *
 apiMapper.accessApi(
 'GET',
 'http://freeze.test.cheek-it.com/api/forecast.json?lat=41.123&lon=141',
 {},
 function (){
// 成功したとき
alert(this.responseText);
},
function (){
alert("ERROR");
}
);
*/

ApiMapper = function(){};
ApiMapper.prototype.apiEndpoint = Alloy.Globals.app.api_endpoint;
ApiMapper.prototype.accessApi = function(method, uri, param, callback_success, callback_failure) {

  // オフラインなら失敗
  if(Titanium.Network.online == false){
    return false;
  }

  var xhr = Titanium.Network.createHTTPClient();
  xhr.open(method, uri);
  xhr.onload = callback_success;
  xhr.onerror = callback_failure;
  xhr.send(param);

  return true;
};
ApiMapper.prototype.spotAllApi = function (callback_success, callback_failure){
  return this.accessApi('GET', this.apiEndpoint + "/spot/all.json", {}, callback_success, callback_failure);
}

ApiMapper.prototype.spotMyApi = function (token, callback_success, callback_failure){
    return this.accessApi('GET', this.apiEndpoint + "/spot/my.json?token=" + token, {}, callback_success, callback_failure);
}


ApiMapper.prototype.spotApi = function (id, callback_success, callback_failure){
  return this.accessApi('GET', this.apiEndpoint + "/spot/" + id + ".json", {}, callback_success, callback_failure);
}

ApiMapper.prototype.spotcheckinApi = function (token, spot_id, comment, image, callback_success, callback_failure){
  var params = {
    token: token,
    spot_id: spot_id,
    comment: "",
  };
  
  // オプション
  if(comment){
    params.comment = comment;
  }
  if(image){
    params.image = image;
  }
  
  return this.accessApi(
      'POST',
      this.apiEndpoint + "/spot/checkin.json",
      params,
      callback_success,
      callback_failure);
}

ApiMapper.prototype.userregisterApi = function (name, social_type, social_token, social_secret, callback_success, callback_failure){
  return this.accessApi(
      'POST',
      this.apiEndpoint + "/user/register.json",
      {name : name, social_type : social_type, social_token : social_token,social_secret : Ti.Utils.md5HexDigest("cheekit" + social_secret)},
      callback_success,
      callback_failure);
}

ApiMapper.prototype.usermyApi = function (token, callback_success, callback_failure){
  return this.accessApi(
      'GET',
      this.apiEndpoint + "/user/my.json?token="+ token,
      {},
      callback_success,
      callback_failure);
}

ApiMapper.prototype.userNotificationApi = function (token,social_type,social_token,social_secret,post, callback_success, callback_failure){
  return this.accessApi(
      'POST',
      this.apiEndpoint + "/user/notification.json",
      {token : token,social_type : social_type,social_token : social_token,social_secret : social_secret,post : post},
      callback_success,
      callback_failure);
}

exports.ApiMapper = ApiMapper;
