const router = require('express').Router()
const db = require('../db')

router.post('/', (req, res) => {
  const appt = db.get('appointments').insert(req.body).write()
  res.json(appt)
})

module.exports = router
