import React from 'react'
import './Availability.css'
import moment from 'moment'

export default ({ startDay, days}) => {
  return (
    <div className="Availability">
      <div className="row">
        { [...Array(days)].map((x, i) => {
          const date = moment(startDay).add(i, 'days')
          return <Day key={i} date={date.format('YYYY-MM-DD')} startTime='9:00' hours={8} />
        }) }
      </div>
    </div>
  )
}


function Day({date, startTime, hours}) {
  const [hh, mm] = startTime
  const dayAndTime = moment(date).hours(hh).minutes(mm)

  return (
    <div className="col-sm">
      <h4>{dayAndTime.format('ddd, MMM D')}</h4>
      <ul className="list-unstyled">
        {[...Array(hours*2)].map((x, i) => {
          const time = moment(dayAndTime).add(i*30, 'minutes')
          return <TimeSlot key={time} time={time} />
        })}
      </ul>
    </div>
  )
}

function TimeSlot({ time }) {
  const m = time.minutes()
  const text = m ? " " : time.format('ha')
  const className = m ? "hour half" : "hour"
  return <li className={className}>{ text }</li>
}
