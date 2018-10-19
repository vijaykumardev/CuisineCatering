const { Cart, Cuisine } = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const { cuisineId } = req.query
      let where = {
        UserId: userId
      }
      if (cuisineId) {
        where.CuisineId = cuisineId
      }
      let carts = await Cart.findAll({
        where: where,
        include: [
          {
            model: Cuisine
          }
        ]
      })
        .map(cart => cart.toJSON())
        .map(cart => _.extend(
          {},
          cart.Cuisine,
          cart
        ))
      res.send(carts)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the cuisine'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const { cuisineId } = req.body
      const cart = await Cart.findOne({
        where: {
          CuisineId: cuisineId,
          UserId: userId
        }
      })
      if (cart) {
        return res.status(400).send({
          error: 'you already have added this to the cart'
        })
      }

      const newCart = await Cart.create({
        CuisineId: cuisineId,
        UserId: userId
      })
      res.send(newCart)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the cart'
      })
    }
  },
  async delete (req, res) {
    try {
      const userId = req.user.id
      const { cartId } = req.params
      const cart = await Cart.findByOne({
        where: {
          id: cartId,
          userId: userId
        }
      })
      if (!cart) {
        return res.status(403).send({
          error: 'you do not have access to this cart details'
        })
      }
      await cart.destroy()
      res.send(cart)
      res.send(cart)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the cart'
      })
    }
  }
}
