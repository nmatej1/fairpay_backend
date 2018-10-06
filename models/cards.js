/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cards', {
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
    tableName: 'cards'
  });
};
