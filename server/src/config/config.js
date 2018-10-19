const path = require('path')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  port: process.env.PORT || 8185,
  db: {
    database: process.env.DB_NAME || 'cuisine',
    user: process.env.DB_USER || 'cuisine',
    password: process.env.DB_PASS || 'tabtracer',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../cuisine.sqlite'),
      operatorsAliases: Op
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
