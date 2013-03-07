function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = A$(Ti.UI.createTableViewRow({
        height: "30pt",
        selectedBackgroundColor: "#FFF",
        selectedColor: "white",
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
                color: "#F9F9F9",
                offset: "0.0"
            }, {
                color: "#EEE",
                offset: "1.0"
            } ]
        },
        id: "row"
    }), "TableViewRow", null);
    $.addTopLevelView($.__views.row);
    $.__views.icon = A$(Ti.UI.createImageView({
        width: "38dp",
        left: "5dp",
        id: "icon"
    }), "ImageView", $.__views.row);
    $.__views.row.add($.__views.icon);
    $.__views.__alloyId4 = A$(Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId4"
    }), "View", $.__views.row);
    $.__views.row.add($.__views.__alloyId4);
    $.__views.title = A$(Ti.UI.createLabel({
        color: "#666",
        font: {
            fontSize: "16"
        },
        left: "48dp",
        id: "title"
    }), "Label", $.__views.__alloyId4);
    $.__views.__alloyId4.add($.__views.title);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.icon.image = args.image;
    $.title.text = args.title || "";
    $.row.customView = args.customView || "";
    $.row.customTitle = $.title;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;