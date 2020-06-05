import React from 'react'
import './Availability.css'
import moment from 'moment'

export default ({ startDay, days, availability={} }) => {
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
            />)
        }) }
      </div>
    </div>
  )
}


function Day({date, startTime, hours, availability={}}) {
  const [hh, mm] = startTime
  const dayAndTime = moment(date).hours(hh).minutes(mm)

  return (
    <div className="col-sm">
      <h4>{dayAndTime.format('ddd, MMM D')}</h4>
      <ul className="list-unstyled">
        {[...Array(hours*2)].map((x, i) => {
          const time = moment(dayAndTime).add(i*30, 'minutes')
          const available = availability[time.toISOString()]
          return <TimeSlot key={time} time={time} available={available} />
        })}
      </ul>
    </div>
  )
}

function TimeSlot({ time, available=false }) {
  const m = time.minutes()
  const text = m ? " " : time.format('ha')

  const classNames = ['hour']
  if (m) classNames.push('half')
  if (!available) classNames.push('unavailable')
  return <li className={classNames.join(' ')}>{ text }</li>
}
