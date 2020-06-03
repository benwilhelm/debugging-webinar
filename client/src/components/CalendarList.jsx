import React from 'react'

export default ({users}) => (
  <div className="CalendarList">
    <h2 className="h3">Available Calendars</h2>
    <ul className='list-unstyled'>
      {users.map(user => <ListItem key={user.id} user={user} />)}
    </ul>
  </div>
)

function ListItem({user}) {
  return (
    <li>
      {user.name}
    </li>
  )
}
