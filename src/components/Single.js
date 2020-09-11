import React, { Component } from 'react'
import eobj from './data'

export default class Single extends Component {
  constructor (props) {
    super(props)
    this.state = { eobj }
  }

  render () {
    console.log(this.props)
    const { eobj } = this.state
    const { params } = this.props.match
    const { name, org } = params
    const ind = eobj.findIndex(
      i => i.name === name && i.org === org && i.admin === false
    )
    if (ind === -1) {
      return <h1>No Employee of this name</h1>
    }
    const ob = eobj[ind]
    const todo = ob.todo.map(t => <li>{`->${t}`}</li>)

    return (
      <div>
        <h1>
          {name} && {org}
        </h1>
        <ul>{todo}</ul>
      </div>
    )
  }
}
