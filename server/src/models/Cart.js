module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    Quantity: DataTypes.INTEGER
  })

  Cart.associate = function (models) {
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Cuisine)
  }

  return Cart
}
