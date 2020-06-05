import AuthService from './auth'
const baseUrl = "http://localhost:3000/api/appointments"

const AppointmentService = {
  async create(appointment) {
    const authHeader = AuthService.getAuthHeader()
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        ...authHeader,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(appointment)
    })
    const response = await res.json()
    return response
  }
}

export default AppointmentService
