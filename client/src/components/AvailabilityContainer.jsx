import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'

import Availability from './Availability.jsx'
import UserService from '../services/users'
import AppointmentService from '../services/appointments'
import NewAppointmentModal from './NewAppointmentModal.jsx'

function AvailabilityContainer({users, currentUser}) {
  const { calendarId } = useParams()
  const calendar = users.find(user => user.id === calendarId)

  const startDay = '2020-06-15'
  const numDays = 5

  const [ availability, setAvailability ] = useState({})
  const [ appointments, setAppointments ] = useState({})

  const [ newAppointment, setNewAppointment] = useState(false)
  const closeAppointmentModal = () => setNewAppointment(false)
  const saveAppointment = async () => {
    const appointment = await AppointmentService.create({
      startTime: newAppointment.startTime,
      name: newAppointment.name,
      calendarId,
      userId: currentUser.id
    })
    setAppointments({...appointments, [appointment.startTime]: appointment})
    closeAppointmentModal()
  }


  useEffect(() => {
    setAvailability({})
    ;(async function getAvailability() {
      const availability = await UserService.getAvailability(calendarId, startDay, numDays)
      setAvailability(availability)
    })()
  }, [calendarId])

  useEffect(() => {
    setAppointments([])
    ;(async function getAppointments() {
      if (!currentUser.id) return
      const appointments = await UserService.getAppointments(currentUser.id)
      const appointmentsIndexed = _.keyBy(appointments, 'startTime')
      setAppointments(appointmentsIndexed)
    })()
  }, [currentUser.id])

  return <>
    <Availability
      startDay={startDay}
      days={numDays}
      availability={availability}
      appointments={appointments}
      setNewAppointment={setNewAppointment}
      calendar={calendar}
    />

    <NewAppointmentModal
      appointment={newAppointment}
      closeModal={closeAppointmentModal}
      saveAppointment={saveAppointment}
    />
  </>
}

export default AvailabilityContainer
