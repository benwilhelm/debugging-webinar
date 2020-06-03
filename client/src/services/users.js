const baseUrl = "http://localhost:3000/api/users"

const UserService = {

  async getAll() {
    const res = await fetch(baseUrl)
    const users = await res.json()
    return users
  },

  async getById(id) {
    const res = await fetch(`${baseUrl}/${id}`)
    const user = await res.json()
    return user
  },

  async getAvailability(id, startDate, days) {
    const res = await fetch(`${baseUrl}/${id}/timeslots?startDate=${startDate}&days=${days}`)
    const timeslots = await res.json()
    return timeslots
  }

}

export default UserService
