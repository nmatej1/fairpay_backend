var Sequelize = require('sequelize')
var sequelize = new Sequelize('mysql://uw8y8nwl:lO6VSuOPfX@mysql57.websupport.sk:3311/uw8y8nwl');
sequelize.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
}, function(err) {
    console.log('Unable to connect to the database:', err);
});

var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;



db.cards = sequelize.import(__dirname + '/models/cards.js');
db.communities = sequelize.import(__dirname + '/models/communities.js');
db.transaction = sequelize.import(__dirname + '/models/transaction.js');
db.users_communities = sequelize.import(__dirname + '/models/users_communities.js');
db.users = sequelize.import(__dirname + '/models/users.js');

// TODO foren key not null
// Task.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
// User.hasMany(Task, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
db.users.hasMany(db.cards);
db.cards.belongsTo(db.users);

db.users.hasMany(db.users_communities);
db.users_communities.belongsTo(db.users);

db.communities.hasMany(db.users_communities);
db.users_communities.belongsTo(db.communities);

db.users_communities.hasMany(db.transaction);
db.transaction.belongsTo(db.users_communities);


module.exports = db;
