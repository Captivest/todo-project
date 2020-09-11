import React, { Component } from 'react'
import eobj from './data'

const RegForm = ({ onChange, onSubmit, username, org, check }) => {
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
      <div onChange={check}>
        {<p>Admin:</p>}
        {<p>Yes</p>}
        <input type='radio' name='admin' value='true' />
        {<p>No</p>}
        <input type='radio' name='admin' value='' />
      </div>
      <button type='submit'>SignUP</button>
    </form>
  )
}

export default class Register extends Component {
  constructor (props) {
    super(props)
    this.state = { eobj }
    this.submit = this.submit.bind(this)
  }

  submit (e) {
    e.preventDefault()
    var neobj = [...this.state.eobj]
    if (neobj.findIndex(i => i.name === this.state.username) === -1) {
      var d = {
        name: this.state.username,
        org: this.state.org,
        admin: Boolean(this.state.admin),
        todo: []
      }
      neobj = [...neobj, d]
      this.setState({ eobj: neobj })
      console.log(neobj)
    }
  }

  render () {
    const { username, org } = this.state
    return (
      <div>
        <h1>Registration</h1>
        <RegForm
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
          onSubmit={this.submit}
          username={username}
          org={org}
          check={e => this.setState({ [e.target.name]: e.target.value })}
        />
      </div>
    )
  }
}
