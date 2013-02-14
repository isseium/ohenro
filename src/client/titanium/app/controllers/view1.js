var data = [
    {latitude:'40.538599', longitude:'141.55756', title:'蕪島神社',prefecture:'青森県',flag:1,myid:1},
    {latitude:'41.327126', longitude:'141.091032', title:'恐山',prefecture:'青森県',flag:0,myid:2},
    {latitude:'40.009295', longitude:'141.901529', title:'譜代浜',prefecture:'岩手県',flag:0,myid:3},
    {latitude:'39.008344', longitude:'141.629423', title:'奇跡の一本松',prefecture:'岩手',flag:0,myid:4},
    {latitude:'39.094786', longitude:'141.719759', title:'長谷寺',prefecture:'岩手県',flag:1,myid:5},
    {latitude:'39.032125', longitude:'141.738649', title:'大善院蛸浦観音',prefecture:'岩手県',flag:1,myid:6},
];

for ( i = 1; i < data.length; i++) {
	var anotation = null;
	var anotation = Ti.Map.createAnnotation({
		latitude: data[i].latitude,
		longitude: data[i].longitude,
		title: data[i].title,
		animate: true
	});
	$.mymap.addAnnotation(anotation);
}

var region = {latitude:39.008344,longitude:141.629423,animate:true,latitudeDelta:0.04, longitudeDelta:0.04};
$.mymap.setLocation(region);

//現在地ボタンのイベント
$.mapButtons.addEventListener('click', function(e){
	switch(e.index){
		case 0:
			Ti.Geolocation.getCurrentPosition(function(e){
			　// エラー時はコールバック関数の引数のerrorプロパティがセットされる
			　if (e.error){
			　　Titanium.API.error(e.error);
			　　return;
			　}
			　// 状態取得の処理
				var coords = e.coords;
		  		Ti.API.info('緯度' + coords.latitude);
		  		Ti.API.info('軽度' + coords.longitude);
				var regionCP = {latitude:coords.latitude,longitude:coords.longitude,animate:true,latitudeDelta:0.04, longitudeDelta:0.04};
				Ti.API.info('IN SV CHANGE');
				// set location to sv
				$.mymap.setLocation(regionCP);
		        // ピンを立てる
		        currentPos = Titanium.Map.createAnnotation({
		            latitude:coords.latitude,
		            longitude:coords.longitude,
		            pincolor:Titanium.Map.ANNOTATION_GREEN,
		            animate:true
		        });
	 		});		
	 		break;
	 		
		case 1:
		alert("ズーム");
		break;

		case 2:
		alert("ズームアウト");
		break;		
	}
});

function chengePoint(lat,lon){
	var region = {latitude:lon,longitude:lat,animate:true,latitudeDelta:0.04, longitudeDelta:0.04};
	$.mymap.setLocation(region);
};

