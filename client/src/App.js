import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import CalendarListContainer from './components/CalendarListContainer'
import AvailabilityContainer from './components/AvailabilityContainer'
import './App.css'

function App() {
  return (
    <div className="App container-fluid mt-4">
      <Router>
        <div className="row">
          <div className="col-md-9">
            <Switch>
              <Route path="/users/:userId">
                <AvailabilityContainer />
              </Route>
            </Switch>
          </div>
          <div className="col-md-3">
            <CalendarListContainer />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
