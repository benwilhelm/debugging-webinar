import React, { useState, useEffect } from 'react'
import UserService from '../services/users'
import AuthService from '../services/auth'
import CalendarList from './CalendarList'

export default (props) => {

  const [ users, setUsers ] = useState([])
  const [ currentUser, setCurrentUser ] = useState({})

  useEffect(() => {
    async function fetchData() {
      const fetchedUsers = await UserService.getAll()

      // don't list currentUser in the calendars list
      const currentUser = AuthService.getCurrentUser()
      setCurrentUser(currentUser)
      setUsers(fetchedUsers.filter(
        ({ email }) => email !== currentUser.email
      ))

    }
    fetchData()
  }, [])



  return <CalendarList users={users} currentUser={currentUser} />
}
