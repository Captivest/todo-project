import React, { Component } from 'react'
import axios from 'axios'

export default class Single extends Component {
  constructor (props) {
    super(props)
    this.state = { todo: [], uid: '', fn: '', ln: '' }
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

  render () {
    const { org } = this.props.match.params
    const { todo, fn, ln } = this.state
    var todos = []
    const tdl = todo.length
    if (tdl === 0) {
      return <h1>No Employee of this name</h1>
    } else {
      todos = todo.map(t => <li>{`->${t.body}`}</li>)
    }
    return (
      <div>
        <h1>
          {`${fn} ${ln}`} works in department - {org}
        </h1>
        <ul>{todos}</ul>
      </div>
    )
  }
}
