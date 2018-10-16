const AuthenticationController = require('./controllers/AuthenticationController')
const CuisineController = require('./controllers/CuisineController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
module.exports = (app) => {
  app.post('/register',
     AuthenticationControllerPolicy.register,
     AuthenticationController.register)
  app.post('/login',
     AuthenticationController.login)
  app.get('/cuisines',
     CuisineController.index)
  app.post('/cuisines',
     CuisineController.post)
  app.get('/cuisine/:cuisineId',
     CuisineController.show)
  app.put('/cuisine/:cuisineId',
     CuisineController.put)
}
