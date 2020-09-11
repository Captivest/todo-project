import React, { Component } from 'react'
import history from './history'
import eobj from './data'

const MainForm = ({ onChange, onSubmit, username, org }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        placeholder='Username'
        name='username'
        value={username}
        type='text'
      />
      <input
        onChange={onChange}
        placeholder='Organization'
        name='org'
        value={org}
        type='text'
      />
      <button type='button' onClick={() => history.push('/register')}>
        SignUp
      </button>
      <button type='submit'>SignIn</button>
    </form>
  )
}

export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = { eobj }
    this.submit = this.submit.bind(this)
  }

  submit (e) {
    e.preventDefault()
    var neobj = [...this.state.eobj]
    const ind = neobj.findIndex(
      i => i.name === this.state.username && i.admin === true
    )
    if (ind > -1) return history.push('/dashboard')
    else return history.push(`/single/${this.state.username} ${this.state.org}`)
  }

  render () {
    const { username, org } = this.state
    console.log(this.props)
    return (
      <div>
        <h1>Work Management System</h1>
        <MainForm
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
          onSubmit={this.submit}
          username={username}
          org={org}
        />
      </div>
    )
  }
}
