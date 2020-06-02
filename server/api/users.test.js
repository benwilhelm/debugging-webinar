const assert = require('assert').strict
const request = require('supertest')
const server = require("../index")
const db = require('../db')

describe('/users', function () {

  beforeEach(() => setupDb(db))

  describe('GET /users/:userId', () => {
    it('should get user object', () => {
      return request(server)
      .get(`/api/users/1`)
      .expect(200)
      .then(res => {
        const user = res.body
        assert.equal(user.name, "User Primo")
        assert.equal(user.email, "primo@example.com")
      })
    })

    it('should return 404 for unknown user', () => {
      return request(server)
      .get('/api/users/404')
      .expect(404)
    })
  })

  describe('GET /users/:userId/availabilities', () => {
    it('should return availabilities for given user', () => {
      return request(server)
      .get('/api/users/1/availabilities')
      .expect(200)
      .then(({ body: avails }) => {
        assert.equal(avails.length, 2)
        assert.equal(avails[0].userId, '1')
        assert.equal(avails[0].startTime, '2020-06-04T10:00:00.000Z')
        assert.equal(avails[1].userId, '1')
        assert.equal(avails[1].startTime, '2020-06-05T10:00:00.000Z')
      })
    })
  })
})


function setupDb(db) {
  db.setState({
    users: [
      { id: '1', name: 'User Primo', email: 'primo@example.com'}
    ],
    availabilities: [
      { userId: '1', startTime: '2020-06-04T10:00:00.000Z' },
      { userId: '1', startTime: '2020-06-05T10:00:00.000Z' },
      { userId: '2', startTime: '2020-06-06T10:00:00.000Z' },
    ],
    appointments: []
  })

  db.write()
}
