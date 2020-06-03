const { Router } = require("express")
const routes = new Router()

// CORS whitelisting
routes.use((req, res, next) => {
  const whiteList = [
    "http://localhost:3000",
    "http://localhost:3001"
  ]

  if (whiteList.includes(req.headers.origin)) {
    res.set({
      "Access-Control-Allow-Origin": req.headers.origin,
      "Vary": "Origin"
    })
  }

  next()
})

routes.use('/appointments', require('./appointments'))
routes.use('/users', require('./users'))

routes.get('/', (req, res) => {
  res.json({ message: "No root route"})
})

module.exports = routes
