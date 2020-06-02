process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const express = require("express")
const server = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')
const bodyParser = require("body-parser")

server.use(bodyParser.json())
server.use(routes)

// Error handler
server.use((err, req, res, next) => {
  console.error('ERROR', err)
  res.status(500).send()
})

module.exports = server

if (require.main === module) {
  server.listen(PORT, (err) => {
    if (err) console.error(err)
    console.log(`express server listening on port ${PORT}`)
  })
}
