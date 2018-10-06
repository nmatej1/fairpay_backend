module.exports = function(app, db, _) {

    //Create guests
    app.post('/card_registration', function(req, res) {
        var body = _.pick(req.body, 'name', 'ratio');
        db.cards.create(req.body).then((card) => {
            res.status(200).send(card);
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
