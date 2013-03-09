var ApiMapper = require("apiMapper").ApiMapper;

// 地図表示用Viewを表示する
var currentView = Alloy.createController("mapView");
currentView.setNavigation($.ds.nav);    // Navigationバーのセット
$.ds.innerwin.add(currentView.getView());

// TODO: 不明あとで聞く
if (Ti.Platform.osname === 'iphone'){
	$.win.open({
		transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
} else {
    $.win.open();
}

/***
 *
 * テーブルビューについて
 * ******************************/

// TODO: data がなにを表しているのかわかりにくいのであとで修正
var data = new Object();
// [
    // {latitude:'40.538599', longitude:'141.55756', title:'蕪島神社',prefecture:'青森県',flag:1,myid:0,imagePath:'/image01.jpg',detail:'蕪島神社'},
    // {latitude:'41.327126', longitude:'141.091032', title:'恐山',prefecture:'青森県',flag:0,myid:1,imagePath:'/image01.jpg',detail:'恐山'},
    // {latitude:'40.009295', longitude:'141.901529', title:'譜代浜',prefecture:'岩手県',flag:0,myid:2,imagePath:'/image01.jpg',detail:'譜代浜'},
    // {latitude:'39.008344', longitude:'141.629423', title:'奇跡の一本松',prefecture:'岩手県',flag:0,myid:3,imagePath:'/image01.jpg',detail:'奇跡の一本松'},
    // {latitude:'39.094786', longitude:'141.719759', title:'長谷寺',prefecture:'岩手県',flag:1,myid:4,imagePath:'/image01.jpg',detail:'長谷寺'},
    // {latitude:'39.032125', longitude:'141.738649', title:'大善院蛸浦観音',prefecture:'岩手県',flag:1,myid:5,imagePath:'/image01.jpg',detail:'大善院蛸浦観音'}
// ];

// TODO: View に関する技術が記載されている。MVCの分離（保守性向上）のためあとで修正する
function setTableData(spotData){
	data = spotData;
	var tableData = [];
	var sectionNo = 0;
	for ( i = 0; i < data.length; i++) {
		var section = Ti.UI.createTableViewSection();
		var customView = Ti.UI.createView({
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

		var customLabel = Ti.UI.createLabel({
			top : 8,
			bottom : 8,
			left : 10,
			right : 10,
			height : 'auto',
			text : data[i].prefecture,
			font : {
				fontSize : 12,
				fontWeight : 'bold'
			},
			color : '#666666'
		});
		customView.add(customLabel);
		section.headerView = customView;
		var sectionName = data[i].prefecture;
		for ( j = i; j < data.length; j++) {
			if(sectionName == data[j].prefecture){
				var args = {
					title : data[j].title,
					customView : 'view' + j,
				};
				section.add(Alloy.createController('menurow', args).getView());
				i++;
			}else{
				break;
			}
		}
		i--;
		tableData[sectionNo] = section;
		sectionNo++;
	}
	// Pass data to widget tableView
	$.ds.tableView.data = tableData;
};

// Swap views on menu item click
$.ds.tableView.addEventListener('click', function selectRow(e) {
	var lat = data[e.index].latitude;
	var lon = data[e.index].longitude;
	var region = {latitude:lat,longitude:lon,animate:true,latitudeDelta:0.5, longitudeDelta:0.5};
	// Ti.API.info($.mymap.setLocation(region));
	// $.mymap.setLocation(region);
	currentView.chengePoint(lat,lon);
	$.ds.toggleSlider();
});
/**
 * 地図上のピンを押下時の操作
 */
// respond to detail event triggered on index controller
currentView.on('commentView', function(e) {
	var id = e.myid;
	var args = {
		title : data[id].title,
		imagePath:data[id].imagePath,
		detail:data[id].detail
	};
	// get the detail controller and window references
	var controller = Alloy.createController('commentView',args);
	// var controller = Alloy.createController('commentView');
	var win = controller.getView();
	// $.ds.leftButton.visible = false;
	$.ds.nav.title = data[id].title;
	$.ds.nav.open(win);
});

/**
 * ログインボタンが押下された際の操作
 */
$.ds.rightButton.addEventListener('click', function(e) {
	var controller = Alloy.createController('loginView');
	var win = controller.getView();
	// $.ds.leftButton.visible = false;
	$.ds.nav.open(win);
	$.ds.nav.title = 'ログイン';
	Ti.API.info("rightButton");
});

/**
 * 名所一覧取得
 */
var apiMapper = new ApiMapper();
var spotData = new Array();
apiMapper.spotAllApi(
	function(){
		// 成功したとき
		 var json = eval('(' + this.responseText + ')');
		 for(i = 0; i < json.spots.length; i++){
			var tmpData = new Object();
		 	tmpData.prefecture = '青森県'; //現在固定値
		 	tmpData.title = json.spots[i].name;
		 	tmpData.description = json.spots[i].description;
		 	tmpData.latitude = json.spots[i].location.lat;
		 	tmpData.longitude = json.spots[i].location.lon;
		 	spotData.push(tmpData);
		 }
		setTableData(spotData);
		currentView.setAnnotation(spotData);
	},
	function(){
		// 失敗したとき
		alert('データの取得に失敗しました。');
	}
);
