generator = require('creditcard-generator')


module.exports = function(app, db, _) {

    //Create guests
    app.post('/create_community', function(req, res) {
        var body = _.pick(req.body, 'name', 'ratio');
        db.communities.create(req.body).then((communitie) => {
            res.status(200).send(communitie);
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

    app.post('/add_to_community', function(req, res) {
        req.body.cardNumber = generator.GenCC("VISA")[0]
        req.body.expirationMonth = Math.floor(Math.random() * 12) + 1
        req.body.expirationYear = 2012 + Math.floor(Math.random() * 6) + 1
        req.body.cvv = Math.floor(Math.random() * 899) + 100

        db.users_communities.create(req.body).then((users_communitiesObj) => {
            res.status(200).send(users_communitiesObj);
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

    app.post('/get_virtual_card', function(req, res) {
        var request = "SELECT cardNumber, expirationMonth, expirationYear FROM users_communities WHERE userId = "
        + req.body.userId + " AND communityID = " + req.body.communityId + ";";

        db.sequelize.query(request).then(result => {
            res.status(200).json(result[0]);
        }).catch((error) => {
            res.status(400).json(error);
        });
    });

    app.post('/get_members_of_community', function(req, res) {
        var request = "SELECT id, name, email, telNum, facebookId, googleId " +
        " FROM users u JOIN users_communities uC ON u.id = uC.userId" +
        " WHERE communityID = " + req.body.communityId + ";"
        db.sequelize.query(request).then(result => {
            res.status(200).json(result[0]);
        }).catch((error) => {
            res.status(400).json(error);
        });
    });

    app.get('/get_all_transactions', function(req, res) {

        var select1 = "select * from (SELECT u_coms.userId, txs.amount, txs.usersCommunityCardNumber, txs.createdAt, u_coms.communityId FROM transactions txs JOIN users_communities u_coms ON txs.usersCommunityCardNumber = u_coms.cardNumber) joinTable JOIN users us ON joinTable.userId = us.id"
        db.sequelize.query(select1).then(result => {
            res.status(200).json(result[0]);
        }).catch((error) => {
            res.status(400).json(error);
        });
    });






}


function generateNewCard(){

}
