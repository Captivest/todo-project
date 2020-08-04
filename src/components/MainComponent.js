import React, { Component } from 'react'
import { Container } from 'reactstrap'
import TODO from './Card'
import Form from './Form'

const todoObj = [
  {
    name: 'Harshit',
    todos: ['DO THIS', 'DO THAT'],
    dV: [5, 10]
  },
  {
    name: 'Aniket',
    todos: ['DO THIS', 'DO THAT'],
    dV: [5, 10]
  },
  {
    name: 'Swapnil',
    todos: ['DO THIS', 'DO THAT'],
    dV: [5, 10]
  },
  {
    name: 'Subhash',
    todos: ['DO THIS', 'DO THAT'],
    dV: [5, 10]
  }
]

export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = { todoObj }
    this.submit = this.submit.bind(this)
  }

  componentDidMount () {
    let rep = setInterval(() => {
      let newLi = [...this.state.todoObj]
      newLi = newLi.map(l => ({
        ...l,
        dV: [...l.dV].map(d => (d > 1 ? d - 1 : 0))
      }))
      this.setState({ todoObj: newLi })
      if (newLi.every(lt => lt.dV.every(lti => lti === 0))) {
        clearInterval(rep)
      }
    }, 1000)
  }

  submit (e) {
    e.preventDefault()
    var newArr = [...this.state.todoObj]
    const ind = newArr.findIndex(o => o.name === this.state.name)
    if (ind > -1) {
      newArr[ind].todos = [...newArr[ind].todos, this.state.newtodo]
      newArr[ind].dV = [...newArr[ind].dV, Number(this.state.durVal)]
    } else {
      const newObj = {
        name: this.state.name,
        todos: [this.state.newtodo],
        dV: [Number(this.state.durVal)]
      }
      newArr = [...this.state.todoObj, newObj]
    }
    this.setState({ todoObj: newArr, name: '', newtodo: '', durVal: '' })
  }

  render () {
    const { name, newtodo, durVal } = this.state
    const newObj = this.state.todoObj.map(t => (
      <TODO head={t.name} ti={t.todos.map(ti => ti)} dur={t.dV.map(d => d)} />
    ))
    return (
      <Container fluid>
        <Form
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
          onSubmit={this.submit}
          name={name}
          newtodo={newtodo}
          durVal={durVal}
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
