module.exports = function(app, db, _) {

    //Create guests
    app.post('/create_transaction', function(req, res) {
        db.transaction.create(req.body).then((transaction) => {
            res.status(200).send(transaction);
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
}
