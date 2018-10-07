var request = require('request');

module.exports = function (app, db, _) {

    //Create guests
    app.post('/payment_callback', function (req, res) {
        request.get('https://webhook.site/#/994fe0c7-df89-458c-87f1-e297c46caeb8');
        console.log(req);
        console.log(res);
    });
}