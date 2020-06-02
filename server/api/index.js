const { Router } = require("express")
const routes = new Router()

routes.use('/appointments', require('./appointments'))
routes.use('/users', require('./users'))

routes.get('/', (req, res) => {
  res.json({ message: "No root route"})
})

module.exports = routes
