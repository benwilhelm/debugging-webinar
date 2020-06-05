import React from 'react'
import moment from 'moment'

function NewAppointmentModal({ appointment, closeModal, saveAppointment }) {
  if (!appointment)
    return null

  const startTime = moment(appointment.startTime)
  const style = {
    display: "block",
    backgroundColor: "rgba(0,0,0,0.5)",
  }

  return (
    <div className="modal fade show" style={style} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Appointment</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              Book a new appointment with <strong>{appointment.name}</strong> on<br/>
              on <strong>{startTime.format("dddd, MMMM D")}</strong> at <strong>{startTime.format("H:mma")}</strong>?
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={saveAppointment}>Book It!</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewAppointmentModal
