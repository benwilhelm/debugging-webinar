const { Router } = require("express")
const routes = new Router()
const cors = require('cors')

// CORS whitelisting
routes.use(cors({
    origin: 'http://localhost:3001',
    //origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200
    // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

routes.use('/appointments', require('./appointments'))
routes.use('/users', require('./users'))

routes.get('/', (req, res) => {
  res.json({ message: "No root route"})
})

module.exports = routes
