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
  }

}

export default UserService
