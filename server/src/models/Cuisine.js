module.exports = (sequelize, DataTypes) => {
  const Cuisine = sequelize.define('Cuisine', {
    name: DataTypes.STRING,
    meal_type: DataTypes.STRING,
    cusine_type: DataTypes.STRING,
    cost: DataTypes.FLOAT
  })

  return Cuisine
}
