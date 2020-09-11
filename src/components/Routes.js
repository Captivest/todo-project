import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import HomePage from './HomePage'
import MainComponent from './MainComponent'
import Register from './Register'
import Single from './Single'
import history from './history'

export default class Routes extends Component {
  render () {
    return (
      <Router history={history}>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/dashboard' exact component={MainComponent} />
          <Route path='/register' exact component={Register} />
          <Route path='/single/:name :org' exact component={Single} />
        </Switch>
      </Router>
    )
  }
}
