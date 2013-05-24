exports.createActivityIndicator = function (e) {
    var indicator = Ti.UI.createActivityIndicator(
            {
                top: 155,
                left: 120,
                height: 100,
                width: 'auto',
                style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
                font: {fontSize: 15},
                color: '#000',
                message: 'loading...'
            }
    );
    return indicator;
};
