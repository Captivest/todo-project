import React, { Component } from 'react'
import axios from 'axios'
import history from './history'
import '../views/single.css'
export default class Single extends Component {
  constructor (props) {
    super(props)
    this.state = { todo: [], uid: '', fn: '', ln: '' }
    this.delete = this.delete.bind(this)
  }
  componentDidMount () {
    console.log(this.props)
    let pname = this.props.match.params.name
    let porg = this.props.match.params.org
    axios
      .post('http://localhost:4000/login', {
        username: pname,
        member_of_org: porg
      })
      .then(res => {
        console.log(pname, porg)
        let uid = res.data.data[0].userid
        let firstname = res.data.data[0].firstname
        let lastname = res.data.data[0].lastname
        axios
          .get(`http://localhost:4000/todo?userid=${uid}`)
          .then(res => {
            console.log(res.data.data)
            const newtd = [...res.data.data]
            this.setState({
              todo: newtd,
              uid: uid,
              fn: firstname,
              ln: lastname
            })
          })
          .catch(err => {
            this.setState({ todo: [], uid: '', fn: '', ln: '' })
          })
      })
  }

  delete (aid) {
    const del_td = { userid: this.state.uid, assign_id: aid }
    axios.delete(`http://localhost:4000/todo`, { params: del_td }).then(() => {
      axios
        .get(`http://localhost:4000/todo?userid=${this.state.uid}`)
        .then(res => {
          this.setState({ todo: res.data.data })
        })
    })
  }

  render () {
    const { org } = this.props.match.params
    const { todo, fn, ln } = this.state
    var todos = []
    todos = todo.map(t => (
      <li>
        <p>
          {`${t.body}`}
          <br />
          <span>{`${t.time_cr}`}</span>
        </p>
        <span className='timebtn'>
          <span>{`${t.time_rem} hrs`}</span>
          <button onClick={() => this.delete(t.assign_id)}>Done</button>
        </span>
      </li>
    ))
    return (
      <div className='main3'>
        <div className='header1'>
          <h1>{org}</h1>
          <button onClick={() => history.push('/')}>Log out</button>
        </div>

        <div className='card2'>
          <h1>{`${fn} ${ln}`}</h1>
          <ul className='scroll'>{todos}</ul>
        </div>
      </div>
    )
  }
}
