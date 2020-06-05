import AuthService from './auth'
const baseUrl = "http://localhost:3000/api/users"

function getAuthHeader() {
  const { email } = AuthService.getCurrentUser()
  const str = `${email}:---`
  const encoded = new Buffer(str).toString('base64')
  return new Headers({
    "Authorization": `Basic ${encoded}`
  })
}

const UserService = {

  async getAll() {
    const headers = getAuthHeader()
    const res = await fetch(baseUrl, { headers })
    const users = await res.json()
    return users
  },

  async getById(id) {
    const headers = getAuthHeader()
    const res = await fetch(`${baseUrl}/${id}`, { headers })
    const user = await res.json()
    return user
  },

  async getAvailability(id, startDate, days) {
    const headers = getAuthHeader()
    const res = await fetch(`${baseUrl}/${id}/timeslots?startDate=${startDate}&days=${days}`, { headers })
    const timeslots = await res.json()
    return timeslots
  }

}

export default UserService
