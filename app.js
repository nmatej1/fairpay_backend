
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

db.sequelize.sync({
    // force: true
}).then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
});
