import axios from 'axios'
import React, { Component } from 'react'
import history from './history'
import '../views/register.css'

const RegForm = ({
  onChange,
  onSubmit,
  username,
  firstname,
  lastname,
  org,
  check
}) => {
  return (
    <form className='form3' onSubmit={onSubmit}>
      <input
        onChange={onChange}
        placeholder='Firstname'
        name='firstname'
        value={firstname}
        type='text'
      />
      <input
        onChange={onChange}
        placeholder='Lastname'
        name='lastname'
        value={lastname}
        type='text'
      />
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
        <span>
          {<p>Yes</p>}
          <input type='radio' name='admin' value='1' />
        </span>
        <span>
          {<p>No</p>}
          <input type='radio' name='admin' value='0' />
        </span>
      </div>
      <button type='submit'>SignUP</button>
    </form>
  )
}

export default class Register extends Component {
  constructor (props) {
    super(props)
    this.state = { username: '', lastname: '', firstname: '', org: '' }
    this.submit = this.submit.bind(this)
  }

  submit (e) {
    e.preventDefault()
    var d = {
      username: this.state.username,
      member_of_org: this.state.org,
      isadmin: Number(this.state.admin),
      firstname: this.state.firstname,
      lastname: this.state.lastname
    }
    axios
      .post('http://localhost:4000/signup', d)
      .then(() => history.push('/'))
      .catch(err => {
        this.setState({ username: '', lastname: '', firstname: '', org: '' })
      })
  }

  render () {
    const { username, lastname, firstname, org } = this.state
    return (
      <div className='reg'>
        <h1>Registration</h1>
        <RegForm
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
          onSubmit={this.submit}
          username={username}
          firstname={firstname}
          lastname={lastname}
          org={org}
          check={e => this.setState({ [e.target.name]: e.target.value })}
        />
      </div>
    )
  }
}
