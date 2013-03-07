function Controller() {
    function chengePoint(lat, lon) {
        var region = {
            latitude: lon,
            longitude: lat,
            animate: !0,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04
        };
        $.mymap.setLocation(region);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.view1 = A$(Ti.UI.createWindow({
        id: "view1"
    }), "Window", null);
    $.addTopLevelView($.__views.view1);
    var __alloyId5 = [];
    $.__views.mymap = A$(Ti.Map.createView({
        annotations: __alloyId5,
        ns: Ti.Map,
        id: "mymap"
    }), "View", $.__views.view1);
    $.__views.view1.add($.__views.mymap);
    var __alloyId7 = [];
    __alloyId7.push({
        title: "現在地"
    });
    __alloyId7.push({
        title: "拡大"
    });
    __alloyId7.push({
        title: "縮小"
    });
    $.__views.mapButtons = A$(Ti.UI.createButtonBar({
        labels: __alloyId7,
        id: "mapButtons",
        backgroundColor: "#369",
        top: "330",
        height: "30",
        width: "200",
        font: "6pt"
    }), "ButtonBar", $.__views.view1);
    $.__views.view1.add($.__views.mapButtons);
    exports.destroy = function() {};
    _.extend($, $.__views);
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
        prefecture: "岩手",
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
    } ];
    for (i = 1; i < data.length; i++) {
        var anotation = null, anotation = Ti.Map.createAnnotation({
            latitude: data[i].latitude,
            longitude: data[i].longitude,
            title: data[i].title,
            animate: !0
        });
        $.mymap.addAnnotation(anotation);
    }
    var region = {
        latitude: 39.008344,
        longitude: 141.629423,
        animate: !0,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
    };
    $.mymap.setLocation(region);
    $.mapButtons.addEventListener("click", function(e) {
        switch (e.index) {
          case 0:
            Ti.Geolocation.getCurrentPosition(function(e) {
                if (e.error) {
                    Titanium.API.error(e.error);
                    return;
                }
                var coords = e.coords;
                Ti.API.info("緯度" + coords.latitude);
                Ti.API.info("軽度" + coords.longitude);
                var regionCP = {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    animate: !0,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                };
                Ti.API.info("IN SV CHANGE");
                $.mymap.setLocation(regionCP);
                currentPos = Titanium.Map.createAnnotation({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    pincolor: Titanium.Map.ANNOTATION_GREEN,
                    animate: !0
                });
            });
            break;
          case 1:
            alert("ズーム");
            break;
          case 2:
            alert("ズームアウト");
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;