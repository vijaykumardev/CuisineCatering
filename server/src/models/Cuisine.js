module.exports = (sequelize, DataTypes) => {
  const Cuisine = sequelize.define('Cuisine', {
    name: DataTypes.STRING,
    meal_type: DataTypes.STRING,
    cusine_type: DataTypes.STRING,
    image: DataTypes.STRING,
    cost: DataTypes.FLOAT
  }, {
    timestamps: false
  })

  return Cuisine
}
