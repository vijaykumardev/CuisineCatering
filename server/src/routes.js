const AuthenticationController = require('./controllers/AuthenticationController')
const CuisineController = require('./controllers/CuisineController')
const CartController = require('./controllers/CartController')
const HistoriesController = require('./controllers/HistoriesController')
const isAuthenticated = require('./policies/isAuthenticated')
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

  app.get('/cart',
     isAuthenticated,
     CartController.index)
  app.post('/cart',
     isAuthenticated,
     CartController.post)
  app.put('/cart/:Status',
     isAuthenticated,
     CartController.put)
  app.delete('/cart/:cartId',
     isAuthenticated,
     CartController.delete)

  app.get('/histories',
     isAuthenticated,
     HistoriesController.index)
  app.post('/histories',
     isAuthenticated,
     HistoriesController.post)
}
