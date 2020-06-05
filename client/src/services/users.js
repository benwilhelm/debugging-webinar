import AuthService from './auth'
const baseUrl = "http://localhost:3000/api/users"

const UserService = {

  async getAll() {
    const authHeader = AuthService.getAuthHeader()
    const res = await fetch(baseUrl, { headers: {...authHeader} })
    const users = await res.json()
    return users
  },

  async getById(id) {
    const authHeader = AuthService.getAuthHeader()
    const res = await fetch(`${baseUrl}/${id}`, { headers: {...authHeader} })
    const user = await res.json()
    return user
  },

  async getAvailability(id, startDate, days) {
    const authHeader = AuthService.getAuthHeader()
    const res = await fetch(
      `${baseUrl}/${id}/timeslots?startDate=${startDate}&days=${days}`,
      { headers: {...authHeader} }
    )
    const timeslots = await res.json()
    return timeslots
  },

  async getAppointments(id) {
    const authHeader = AuthService.getAuthHeader()
    const res = await fetch(
      `${baseUrl}/${id}/appointments`,
      { headers: {...authHeader} }
    )
    const appointments = await res.json()
    return appointments
  }

}

export default UserService
