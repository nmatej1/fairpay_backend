/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactions', {
    amount: {
      type: DataTypes.DOUBLE
    },
    vendorName: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'transactions'
  });
};
