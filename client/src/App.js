import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import AvailabilityContainer from './components/AvailabilityContainer'

import UserService from './services/users'
import AuthService from './services/auth'
import CalendarList from './components/CalendarList'

import './App.css'


function AppComponent() {

  const [ users, setUsers ] = useState([])
  const [ currentUser, setCurrentUser ] = useState({})

  useEffect(() => {

    async function fetchData() {
      const fetchedUsers = await UserService.getAll()

      // don't list currentUser in the calendars list
      const currentUser = AuthService.getCurrentUser()
      setCurrentUser(currentUser)
      setUsers(fetchedUsers.filter(
        ({ email }) => email !== currentUser.email
      ))

    }
    fetchData()
  }, [])

  return (
    <div className="App container-fluid mt-4">
      <div className="row">
        <div className="col-md-9">
          <Switch>
            <Route path="/calendars/:calendarId">
              <AvailabilityContainer users={users} currentUser={currentUser} />
            </Route>
          </Switch>
        </div>
        <div className="col-md-3">
          <CalendarList users={users} currentUser={currentUser} />
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppComponent />
    </Router>
  );
}

export default App;
