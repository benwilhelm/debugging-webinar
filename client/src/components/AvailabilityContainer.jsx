import React, { useState, useEffect } from 'react'
import Availability from './Availability.jsx'
import { useParams } from 'react-router-dom'

import UserService from '../services/users'

export default (props) => {
  const { userId } = useParams()
  const startDay = '2020-06-15'
  const numDays = 5

  const [ availability, setAvailability ] = useState({})
  useEffect(() => {
    setAvailability({})
    ;(async function getAvailability() {
      const availability = await UserService.getAvailability(userId, startDay, numDays)
      setAvailability(availability)
    })()
  }, [userId])

  return <Availability startDay={startDay} days={numDays} availability={availability} />
}
