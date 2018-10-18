const {
  sequelize,
  Cuisine,
  User,
  Cart
} = require('../src/models')

const Promise = require('bluebird')
const cuisines = require('./cuisines.json')
const users = require('./users.json')
const carts = require('./cart.json')

sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )
    await Promise.all(
      cuisines.map(cuisine => {
        Cuisine.create(cuisine)
      })
    )
    await Promise.all(
      carts.map(cart => {
        Cart.create(cart)
      })
    )
  })
