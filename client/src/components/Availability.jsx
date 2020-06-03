import React from 'react'
import './Availability.css'

export default (props) => {
  return (
    <div className="Availability">
      <div className="row">
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
      </div>
    </div>
  )
}


function Day(props) {
  return (
    <div className="col-sm">
      <h4>Day</h4>
      <ul className="list-unstyled">
        <li className="hour">10am</li>
        <li className="hour half">&nbsp;</li>
        <li className="hour">11am</li>
        <li className="hour unavailable half">&nbsp;</li>
        <li className="hour unavailable">12pm</li>
        <li className="hour unavailable half">&nbsp;</li>
        <li className="hour unavailable">1pm</li>
        <li className="hour unavailable half">&nbsp;</li>
        <li className="hour unavailable">2pm</li>
        <li className="hour half">&nbsp;</li>
        <li className="hour">3pm</li>
        <li className="hour half">&nbsp;</li>
        <li className="hour">4pm</li>
        <li className="hour half">&nbsp;</li>
      </ul>
    </div>
  )
}
