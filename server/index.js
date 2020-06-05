process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 3000

const express = require("express")
const server = express()
const api = require('./api')
const bodyParser = require("body-parser")

server.use(bodyParser.json())

// Fake network latency
server.use((req, res, next) => {
  const delay = process.env.NODE_ENV === 'development'
              ? Math.random() * 500
              : 0
  setTimeout(next, delay)
})

server.use('/api', api)

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
