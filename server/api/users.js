const router = require('express').Router()
const db = require('../db')

router.param('userId', (req, res, next, userId) => {
  try {
    const user = db.get('users').getById(userId).value()
    if (!user) return res.status(404).send('Not Found')

    req.user = user
    next()
  } catch(err) {
    next(err)
  }
})


router.get('/:userId', (req, res, next) => {
  res.json(req.user)
})


router.get('/:userId/availabilities', (req, res, next) => {
  const avails = db.get('availabilities')
                   .filter({ userId: req.params.userId })
                   .sortBy('startTime')
                   .value()
  res.json(avails)
})

module.exports = router
