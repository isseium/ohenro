function WPATH(s) {
    var index = s.lastIndexOf("/"), path = index === -1 ? "ds.slideMenu/" + s : s.substring(0, index) + "/ds.slideMenu/" + s.substring(index + 1);
    return path;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.leftMenu = A$(Ti.UI.createWindow({
        top: "0dp",
        left: "0dp",
        width: "250dp",
        zIndex: "1",
        id: "leftMenu"
    }), "Window", null);
    $.addTopLevelView($.__views.leftMenu);
    $.__views.tableView = A$(Ti.UI.createTableView({
        id: "tableView"
    }), "TableView", $.__views.leftMenu);
    $.__views.leftMenu.add($.__views.tableView);
    $.__views.win = A$(Ti.UI.createWindow({
        left: "0dp",
        zIndex: "10",
        backgroundColor: "white",
        id: "win"
    }), "Window", null);
    $.addTopLevelView($.__views.win);
    $.__views.shadowview = A$(Ti.UI.createView({
        shadowColor: "black",
        shadowOffset: {
            x: "0",
            y: "0"
        },
        shadowRadius: "2.5",
        ZIndex: "10",
        id: "shadowview"
    }), "View", $.__views.win);
    $.__views.win.add($.__views.shadowview);
    $.__views.innerwin = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        title: "東北巡礼",
        barColor: "black",
        left: "0",
        zIndex: "10",
        id: "innerwin"
    }), "Window", null);
    $.__views.tabgroup = A$(Ti.UI.createTabGroup({
        id: "tabgroup"
    }), "TabGroup", $.__views.innerwin);
    $.__views.innerwin.add($.__views.tabgroup);
    $.__views.__alloyId0 = A$(Ti.UI.createWindow({
        id: "__alloyId0"
    }), "Window", null);
    $.__views.__alloyId1 = A$(Ti.UI.createLabel({
        text: "View 1",
        id: "__alloyId1"
    }), "Label", $.__views.__alloyId0);
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.leftTab = A$(Ti.UI.createTab({
        window: $.__views.__alloyId0,
        id: "leftTab"
    }), "Tab", null);
    $.__views.tabgroup.addTab($.__views.leftTab);
    $.__views.__alloyId2 = A$(Ti.UI.createWindow({
        id: "__alloyId2"
    }), "Window", null);
    $.__views.__alloyId3 = A$(Ti.UI.createLabel({
        text: "View 1",
        id: "__alloyId3"
    }), "Label", $.__views.__alloyId2);
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.rightTab = A$(Ti.UI.createTab({
        window: $.__views.__alloyId2,
        id: "rightTab"
    }), "Tab", null);
    $.__views.tabgroup.addTab($.__views.rightTab);
    $.__views.nav = A$(Ti.UI.iPhone.createNavigationGroup({
        left: "0",
        width: Ti.Platform.displayCaps.platformWidth,
        window: $.__views.innerwin,
        id: "nav"
    }), "NavigationGroup", $.__views.shadowview);
    $.__views.shadowview.add($.__views.nav);
    $.__views.button = A$(Ti.UI.createButton({
        image: "/ds.slideMenu/ButtonMenu.png",
        left: "10",
        top: "7",
        width: "35",
        height: "30",
        style: "none",
        id: "button"
    }), "Button", $.__views.shadowview);
    $.__views.shadowview.add($.__views.button);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var animateLeft = Ti.UI.createAnimation({
        left: 250,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 150
    }), animateRight = Ti.UI.createAnimation({
        left: 0,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 150
    }), touchStartX = 0, touchStarted = !1;
    $.innerwin.addEventListener("touchstart", function(e) {
        touchStartX = parseInt(e.x, 10);
    });
    $.innerwin.addEventListener("touchend", function(e) {
        touchStarted = !1;
        if ($.win.left >= 150) {
            $.win.animate(animateLeft);
            hasSlided = !0;
        } else {
            $.win.animate(animateRight);
            hasSlided = !1;
        }
    });
    $.innerwin.addEventListener("touchmove", function(e) {
        var x = parseInt(e.globalPoint.x, 10), newLeft = x - touchStartX;
        touchStarted && newLeft <= 250 && newLeft >= 0 && ($.win.left = newLeft);
        newLeft > 30 && (touchStarted = !0);
    });
    $.button.addEventListener("singletap", function(e) {
        $.toggleSlider();
    });
    var hasSlided = !1;
    exports.toggleSlider = function() {
        if (!hasSlided) {
            $.win.animate(animateLeft);
            hasSlided = !0;
        } else {
            $.win.animate(animateRight);
            hasSlided = !1;
        }
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;