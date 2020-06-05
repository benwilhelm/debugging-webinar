const assert = require('assert').strict
const request = require('supertest')
const server = require("../index")
const db = require('../db')

describe('/appointments', () => {

  beforeEach(() => setupDb(db))

  describe('POST /appointments', () => {

    it('should respond 401 with no auth header', () => {
      return request(server)
      .post("/api/appointments")
      .send({
        userId: 1,
        startTime: "2020-06-01T08:00:00.000Z",
        duration: 30,
        name: "Test Appointment"
      })
      .expect(401)
    })

    it('should create a new appointment', () => {
      return request(server)
      .post("/api/appointments")
      .auth('primo@example.com', 'dunmatter')
      .send({
        userId: 1,
        startTime: "2020-06-01T08:00:00.000Z",
        duration: 30,
        name: "Test Appointment"
      })
      .expect(200)
      .then(res => {
        assert(res.body.id, "Id should be generated")
        assert.equal(res.body.name, "Test Appointment")
        // assert.equal(res.body.startTime)
      })
    })
  })
})


function setupDb(db) {
  db.setState({
    users: [
      { id: '1', name: 'User Primo', email: 'primo@example.com'}
    ],
    availabilities: [],
    appointments: []
  })

  db.write()
}
