const router = require('express').Router()
const db = require('../db')
const { authenticateApi } = require('../auth').middleware

router.post('/', authenticateApi, (req, res) => {
  const appt = db.get('appointments').insert(req.body).write()
  res.json(appt)
})

module.exports = router
