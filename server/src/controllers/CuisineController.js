const { Cuisine } = require('../models')
module.exports = {
  async index (req, res) {
    try {
      const cuisine = await Cuisine.findAll(
        limit: 10
      )
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
  }
}
