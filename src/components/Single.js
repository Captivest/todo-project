import React, { Component } from 'react'
import axios from 'axios'

export default class Single extends Component {
  constructor (props) {
    super(props)
    this.state = { todo: [] }
  }
  componentDidMount () {
    const pid = this.props.match.params.uid
    axios
      .get(`http://localhost:4000/todo?userid=${pid}`)
      .then(res => {
        const newtd = [...res.data.data]
        this.setState({ todo: newtd })
      })
      .catch(err => {
        this.setState({ todo: [] })
      })
  }

  render () {
    console.log(this.props)
    const { params } = this.props.match
    const { name, org } = params
    const { todo } = this.state
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
          {name} && {org}
        </h1>
        <ul>{todos}</ul>
      </div>
    )
  }
}
