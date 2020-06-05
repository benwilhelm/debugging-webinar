import React from 'react'
import './Availability.css'
import moment from 'moment'

export default function Availability({
  startDay,
  days,
  availability={},
  setNewAppointment,
  appointments,
  calendar
}) {
  return (
    <div className="Availability">

      <div className="row">
        { [...Array(days)].map((x, i) => {
          const date = moment(startDay).add(i, 'days')
          return (
            <Day key={i}
             date={date.format('YYYY-MM-DD')}
             startTime='9:00'
             hours={8}
             availability={availability}
             appointments={appointments}
             setNewAppointment={setNewAppointment}
             calendar={calendar}
            />)
        }) }
      </div>
    </div>
  )
}


function Day({
  date,
  startTime,
  hours,
  availability={},
  setNewAppointment,
  appointments,
  calendar
}) {
  const [hh, mm] = startTime
  const dayAndTime = moment(date).hours(hh).minutes(mm)

  return (
    <div className="col-sm">
      <p className="day--date">{dayAndTime.format('ddd, MMM D')}</p>
      <ul className="list-unstyled">
        {[...Array(hours*2)].map((x, i) => {
          const time = moment(dayAndTime).add(i*30, 'minutes')
          const available = availability[time.toISOString()]
          const appointment = appointments[time.toISOString()]
          return <TimeSlot
                   key={time}
                   time={time}
                   available={available}
                   appointment={appointment}
                   onClick={() => {
                     setNewAppointment({
                       startTime: time,
                       name: calendar.name
                     })
                   }}
                  />
        })}
      </ul>
    </div>
  )
}

function TimeSlot({ time, available=false, onClick, appointment }) {
  const m = time.minutes()
  const timeFormatted = m ? " " : time.format('ha')

  const classNames = ['hour']
  if (m) classNames.push('half')
  if (!available) classNames.push('unavailable')
  return <li className={classNames.join(' ')}
             onClick={available ? onClick : noop}
         >
          <span className='timeslot--time'>{ timeFormatted }</span>
          <span className="timeslot--appointment">{ appointment ? appointment.name : '' }</span>

        </li>
}

function noop() {}
