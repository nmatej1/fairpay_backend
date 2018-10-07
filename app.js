
var db = require('./db.js');
var express = require('express');
var _ = require('underscore');
var bodyParser = require('body-parser');
var cors = require('cors');
const webpush = require('web-push');
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

const vapidKeys = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
    "mailto:test@test.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
);


app.get('/sendPushAll', function(req, res) {
    db.users.findAll({}).then((users) => {
        console.log(users.length)
        for(var i = 0; i < users.length; i++){

            var user = users[i]
            var token = JSON.parse(user.get("pushToken"))
            if (token === undefined){
                continue;
            }
            console.log(i)
            // Create payload
            const payload = JSON.stringify({ title: "FairPay" });
            webpush.sendNotification(token, payload).catch(err => console.error(err));
        }
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

app.post('/getPublicKey', function(req, res) {
    res.status(200).send({"publicVapidKey": vapidKeys.publicKey,});
})


db.sequelize.sync({
    // force: true
}).then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
});
