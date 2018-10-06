/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users_communities', {
    geo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    maxTransactions: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    spendLimit: {
      type: DataTypes.DOUBLE,
      defaultValue: 100
    },
    cardNumber: {
       type: DataTypes.STRING,
       primaryKey: true
    },
    expirationMonth: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expirationYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cvv: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'users_communities'
  });
};
