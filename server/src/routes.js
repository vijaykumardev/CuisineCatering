const AuthenticationController = require('./controllers/AuthenticationController')
const CuisineController = require('./controllers/CuisineController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
module.exports = (app) => {
  app.post('/register',
     AuthenticationControllerPolicy.register,
     AuthenticationController.register)
  app.post('/login',
     AuthenticationController.login)
  app.get('/cuisine',
     CuisineController.index)
  app.post('/cuisine',
     CuisineController.post)
}
