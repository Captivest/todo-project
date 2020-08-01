import React, { Component } from 'react'
import { Container } from 'reactstrap'
import TODO from './Card'
import Form from './Form'

const todoObj = [
  {
    name: 'Harshit',
    todos: ['Do this', 'Do that']
  },
  {
    name: 'Aniket',
    todos: ['Do this', 'Do that']
  },
  {
    name: 'Swapnil',
    todos: ['Do this', 'Do that']
  },
  {
    name: 'Subhash',
    todos: ['Do this', 'Do that']
  }
]

export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = { todoObj }
    this.submit = this.submit.bind(this)
  }

  submit (e) {
    e.preventDefault()
    var newArr = [...this.state.todoObj]
    const ind = newArr.findIndex(o => o.name === this.state.name)
    if (ind > -1) {
      newArr[ind].todos = [...newArr[ind].todos, this.state.newtodo]
    } else {
      const newObj = { name: this.state.name, todos: [this.state.newtodo] }
      newArr = [...this.state.todoObj, newObj]
    }
    this.setState({ todoObj: newArr, name: '', newtodo: '' })
  }

  render () {
    const { name, newtodo } = this.state
    const newObj = this.state.todoObj.map(t => (
      <TODO head={t.name} ti={t.todos.map(ti => ti)} />
    ))
    return (
      <Container fluid>
        <Form
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
          onSubmit={this.submit}
          name={name}
          newtodo={newtodo}
        />
        <div
          style={{
            display: 'grid',
            gridGap: '2em',
            gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))'
          }}
        >
          {newObj}
        </div>
      </Container>
    )
  }
}
