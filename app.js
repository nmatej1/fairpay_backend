
var db = require('./db.js');
var express = require('express');
var _ = require('underscore');
var bodyParser = require('body-parser');
var cors = require('cors');
const path = require("path");



var PORT = process.env.PORT || 8080;
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "frontend/build")));


require('./api/users_api.js')(app, db, _);
require('./api/cards_api.js')(app, db, _);
require('./api/communities_api.js')(app, db, _);
require('./api/transaction_api.js')(app, db, _);



// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
var accountSid = 'AC9e40566719dd4e005111415b0b9dfc8f'; // Your Account SID from www.twilio.com/console
var authToken = '96d12177abe2d27a37877d0543d6cba6';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+421918978947',  // Text this number
    from: '+441344567341' // From a valid Twilio number
})
.then((message) => console.log(message.sid));

//
//
app.get('/sendPushAll', function(req, res) {
    db.users.findAll({}).then((users) => {
        console.log(users.length)

        var user = users[0]
        var token = JSON.parse(user.get("pushToken"))
        if (token === undefined){
            continue;
        }
        // Create payload
        const payload = JSON.stringify({ title: "FairPay" });
        webpush.sendNotification(token, payload).catch(err => console.error(err));

        var user = users[1]
        var token = JSON.parse(user.get("pushToken"))
        if (token === undefined){
            continue;
        }

        // Create payload
        const payload = JSON.stringify({ title: "FairPay" });
        webpush.sendNotification(token, payload).catch(err => console.error(err));

        var user = users[2]
        var token = JSON.parse(user.get("pushToken"))
        if (token === undefined){
            continue;
        }
        console.log(0)
        // Create payload
        const payload = JSON.stringify({ title: "FairPay" });
        webpush.sendNotification(token, payload).catch(err => console.error(err));

        var user = users[3]
        var token = JSON.parse(user.get("pushToken"))
        if (token === undefined){
            continue;
        }
        // Create payload
        const payload = JSON.stringify({ title: "FairPay" });
        webpush.sendNotification(token, payload).catch(err => console.error(err));

        res.status(200).send();
    }, (error) => {
        let errorMsg = error.errors[0].message + " -> " + error.errors[0].path;
        if (!error.errors[0].message || !error.errors[0].path) {
            errorMsg = error;
        }
        let code = (!_.isUndefined(error.code)) ? error.code : 400;
        res.status(code).json({
            message : errorMsg
        });
    });
});
//
// app.post('/getPublicKey', function(req, res) {
//     res.status(200).send({"publicVapidKey": vapidKeys.publicKey,});
// })


db.sequelize.sync({
    // force: true
}).then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
});
