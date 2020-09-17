import React, { Component } from 'react'
import history from './history'
import axios from 'axios'
import '../views/homepage.css'

const MainForm = ({ onChange, onSubmit, username, org }) => {
  return (
    <form className='form1' onSubmit={onSubmit}>
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
    this.state = { username: '', member_of_org: '' }
    this.submit = this.submit.bind(this)
  }

  submit (e) {
    e.preventDefault()
    console.log(this.state)
    const user = {
      username: this.state.username,
      member_of_org: this.state.org
    }
    console.log(user)
    axios.post('http://localhost:4000/login', user).then(res => {
      console.log(res.data)
      if (res.data.data.length === 0) {
        this.setState({ username: '', org: '' })
      } else if (res.data.data[0].isadmin === 1) {
        console.log('dash works')
        return history.push(`/dashboard/${this.state.org}`)
      } else {
        console.log('Single works')
        return history.push(`/single/${this.state.username} ${this.state.org}`)
      }
    })
    /* if (ind > -1) return history.push('/dashboard')
    else return history.push(`/single/${this.state.username} ${this.state.org}`) */
  }

  render () {
    const { username, org } = this.state
    return (
      <div className='main'>
        <div className='header'>
          <h1>Work Management System</h1>
        </div>

        <MainForm
          onChange={e => {
            this.setState({ [e.target.name]: e.target.value })
            console.log(this.state)
          }}
          onSubmit={this.submit}
          username={username}
          org={org}
        />
      </div>
    )
  }
}
