module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {})

  History.associate = function (models) {
    History.belongsTo(models.Cuisine)
    History.belongsTo(models.User)
  }

  return History
}
