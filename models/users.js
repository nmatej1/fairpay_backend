/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    telNum: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    facebookId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    googleId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pushToken: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
};
