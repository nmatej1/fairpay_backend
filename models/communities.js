/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('communities', {
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ratio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    tableName: 'communities'
  });
};
