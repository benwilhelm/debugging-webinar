process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const faker = require('faker')
const moment = require('moment')

const db = require('./index')
faker.seed(4283948)

const NUM_USERS=5

const users = [...Array(NUM_USERS)].map((o, i) => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  return {
    id: faker.random.uuid(),
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`
  }
})


const availabilities = users.map((user) => {
  return [...Array(5)].map((o, i) => ({
    userId: user.id,
    startTime: moment('2020-06-15T10:00:00.000Z').add(i, 'days'),
    duration: 180
  }))
}).flat()


db.setState({
  users,
  availabilities
}).write()
