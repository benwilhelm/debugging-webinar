import React from 'react'
import { NavLink } from 'react-router-dom'
import './CalendarList.css'

export default ({users, currentUser}) => (
  <div className="CalendarList">
    <h2 className="h3">Logged in as</h2>
    <LinkToCalendar user={currentUser} />
    <h2 className="h3 mt-4">Available Calendars</h2>
    <ul className='list-unstyled'>
      {users.map(user => <li key={user.id}><LinkToCalendar user={user} /></li>)}
    </ul>
  </div>
)

function LinkToCalendar({user}) {
  return (
    <NavLink className='calendar-link' to={`/users/${user.id}`}>
      {user.name}
    </NavLink>
  )
}
