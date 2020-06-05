const moment = require('moment')
const router = require('express').Router()
const db = require('../db')
const { authenticateApi } = require('../auth').middleware

router.use(authenticateApi)

router.param('userId', (req, res, next, userId) => {
  try {
    const user = db.get('users').getById(userId).value()
    if (!user) return res.status(404).send('Not Found')

    req.queriedUser = user
    next()
  } catch(err) {
    next(err)
  }
})


router.get('/', (req, res, next) => {
  const users = db.get('users').value()
  res.json(users)
})

router.get('/:userId', (req, res, next) => {
  res.json(req.queriedUser)
})


router.get('/:userId/availabilities', (req, res, next) => {
  const avails = db.get('availabilities')
                   .filter({ userId: req.params.userId })
                   .sortBy('startTime')
                   .value()
  res.json(avails)
})

router.get('/:userId/timeslots', (req, res, next) => {
  const startDate = req.query.startDate ? moment(req.query.startDate) : moment()
  const days = req.query.days ? +req.query.days : 1
  const endDate = moment(req.query.startDate).add(days, 'days')

  const avails = db.get('availabilities')
                   .filter({ userId: req.params.userId })
                   .filter(avail => (
                     moment(avail.startTime).isAfter(startDate)
                     && moment(avail.startTime).isBefore(endDate)
                   ))


  const slots = avails.reduce((acc, avail, idx) => {
    for (let i=0; i<avail.duration; i+=30) {
      const timeStamp = moment(avail.startTime).add(i, 'minutes').toISOString()
      acc[timeStamp] = true
    }
    return acc
  }, {})

  res.json(slots)
})

module.exports = router
