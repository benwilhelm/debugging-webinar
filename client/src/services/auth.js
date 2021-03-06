const currentUser = {
  "id": "94444ef7-2293-40aa-bfe5-1208d154fe28",
  "name": "Lauriane Walsh",
  "email": "lauriane.walsh@example.com"
}

const AuthService = {
  getCurrentUser() {
    return (currentUser)
  },

  getAuthHeader() {
    const { email } = this.getCurrentUser()
    const str = `${email}:---`
    const encoded = new Buffer(str).toString('base64')
    return {
      "Authorization": `Basic ${encoded}`
    }
  }
}

export default AuthService
