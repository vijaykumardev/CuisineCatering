const Sequelize = require('sequelize')

const { Cuisine } = require('../models')
const Op = Sequelize.Op
module.exports = {
  async index (req, res) {
    try {
      let cuisine = null
      const search = req.query.search
      if (search) {
        cuisine = await Cuisine.findAll({
          where: {
            [Op.or]: [
              'name', 'cusine_type', 'meal_type'
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
      } else {
        cuisine = await Cuisine.findAll()
      }
      res.send(cuisine)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the cuisine'
      })
    }
  },
  async show (req, res) {
    try {
      const cuisine = await Cuisine.findById(req.params.cuisineId)
      res.send(cuisine)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the cuisine'
      })
    }
  },
  async post (req, res) {
    try {
      const cuisine = await Cuisine.create(req.body)
      res.send(cuisine)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the cuisine'
      })
    }
  },
  async put (req, res) {
    try {
      await Cuisine.update(req.body, {
        where: {
          id: req.params.cuisineId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the cuisine'
      })
    }
  }
}
