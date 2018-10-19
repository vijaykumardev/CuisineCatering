const { History, Cuisine } = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      let histories = await History.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Cuisine
          }
        ]
      })
        .map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.Cuisine,
          history
        ))
      res.send(_.uniqBy(histories, history => history.CuisineId))
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the history'
      })
    }
  },
  async post (req, res) {
    try {
      const { userId } = req.user.id
      const { cuisineId } = req.body
      console.log(req.body)
      await History.create({
        CuisineId: cuisineId,
        UserId: userId.id
      })
      res.send()
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occured trying to create the history'
      })
    }
  }
}
