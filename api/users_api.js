
module.exports = function(app, db, _) {

  //Create guests
  app.post('/registration', function(req, res) {
      var body = _.pick(req.body, 'name', 'email', 'telNum', 'facebookId', 'googleId');
      db.users.create(req.body).then((user) => {
          res.status(200).send(user);
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

  app.post('/pushnotification_reg', function(req, res) {
      db.users.findById(req.body.userId).then((user) => {
          user.set("pushToken", req.body.token)
          return user.save()
      }).then((user)=>{
          res.status(200).send(user);
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
