function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.win = A$(Ti.UI.createWindow({
        id: "win"
    }), "Window", null);
    $.addTopLevelView($.__views.win);
    $.__views.ds = Alloy.createWidget("ds.slideMenu", "widget", {
        id: "ds"
    });
    $.__views.ds.setParent($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var currentView = Alloy.createController("view1").getView();
    $.ds.innerwin.add(currentView);
    Ti.Platform.osname === "iphone" ? $.win.open({
        transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
    }) : $.win.open();
    var data = [ {
        latitude: "40.538599",
        longitude: "141.55756",
        title: "蕪島神社",
        prefecture: "青森県",
        flag: 1,
        myid: 1
    }, {
        latitude: "41.327126",
        longitude: "141.091032",
        title: "恐山",
        prefecture: "青森県",
        flag: 0,
        myid: 2
    }, {
        latitude: "40.009295",
        longitude: "141.901529",
        title: "譜代浜",
        prefecture: "岩手県",
        flag: 0,
        myid: 3
    }, {
        latitude: "39.008344",
        longitude: "141.629423",
        title: "奇跡の一本松",
        prefecture: "岩手県",
        flag: 0,
        myid: 4
    }, {
        latitude: "39.094786",
        longitude: "141.719759",
        title: "長谷寺",
        prefecture: "岩手県",
        flag: 1,
        myid: 5
    }, {
        latitude: "39.032125",
        longitude: "141.738649",
        title: "大善院蛸浦観音",
        prefecture: "岩手県",
        flag: 1,
        myid: 6
    } ], tableData = [], sectionNo = 0;
    for (i = 0; i < data.length; i++) {
        var section = Ti.UI.createTableViewSection(), customView = Ti.UI.createView({
            height: "auto",
            backgroundGradient: {
                type: "linear",
                startPoint: {
                    x: "0%",
                    y: "0%"
                },
                endPoint: {
                    x: "0%",
                    y: "100%"
                },
                colors: [ {
                    color: "#EEE",
                    offset: 0
                }, {
                    color: "#CCC",
                    offset: 1
                } ]
            }
        }), customLabel = Ti.UI.createLabel({
            top: 8,
            bottom: 8,
            left: 10,
            right: 10,
            height: "auto",
            text: data[i].prefecture,
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            color: "#666666"
        });
        customView.add(customLabel);
        section.headerView = customView;
        var sectionName = data[i].prefecture;
        for (j = i; j < data.length; j++) {
            if (sectionName != data[j].prefecture) break;
            var args = {
                title: data[j].title,
                customView: "view" + j
            };
            section.add(Alloy.createController("menurow", args).getView());
            i++;
        }
        i--;
        tableData[sectionNo] = section;
        sectionNo++;
    }
    $.ds.tableView.data = tableData;
    $.ds.tableView.addEventListener("click", function selectRow(e) {
        var lat = data[e.index].latitude, lon = data[e.index].longitude, region = {
            latitude: lat,
            longitude: lon,
            animate: !0,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04
        };
        Ti.API.info($.ds.innerwin);
        $.ds.toggleSlider();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;