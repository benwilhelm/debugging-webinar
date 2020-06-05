import React, { useState, useEffect } from 'react'
import UserService from '../services/users'
import AuthService from '../services/auth'
import CalendarList from './CalendarList'

export default (props) => {

  const [ users, setUsers ] = useState([])
  useEffect(() => {
    async function fetchData() {
      const currentUser = AuthService.getCurrentUser()
      const fetchedUsers = await UserService.getAll()

      // don't list myself in the calendars list
      setUsers(fetchedUsers.filter(
        ({ email }) => email !== currentUser.email
      ))
    }
    fetchData()
  }, [])

  return <CalendarList users={users} />
}
