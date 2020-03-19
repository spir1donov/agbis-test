import React from 'react'
import { Route, Switch } from 'react-router-dom'
import withAuth from './middleware/withAuth'
import Orders from './views/Orders'
import Client from './views/Client'
import Login from './views/Login'
import Logout from './views/Logout'
import './App.scss'

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={withAuth(Orders)} />
        <Route path="/client" component={withAuth(Client)} />
        <Route path="/logout" component={withAuth(Logout)} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  )
}

export default App
