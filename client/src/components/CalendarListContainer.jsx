import React, { useState, useEffect } from 'react'
import UserService from '../services/users'
import CalendarList from './CalendarList'

export default (props) => {

  const [ users, setUsers ] = useState([])
  useEffect(() => {
    async function fetchData() {
      const fetchedUsers = await UserService.getAll()
      setUsers(fetchedUsers)
    }
    fetchData()
  }, [])

  return <CalendarList users={users} />
}
