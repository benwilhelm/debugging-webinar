import React from 'react';
import CalendarListContainer from './components/CalendarListContainer'
import AvailabilityContainer from './components/AvailabilityContainer'
import './App.css'

function App() {
  return (
    <div className="App container-fluid mt-4">
      <div className="row">
        <div className="col-md-9">
          <AvailabilityContainer />
        </div>
        <div className="col-md-3">
          <CalendarListContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
