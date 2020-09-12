import React, { Component } from 'react'
import { Container } from 'reactstrap'
import TODO from './Card'
import Form from './Form'
import axios from 'axios'

export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = { todos: [] }
    this.submit = this.submit.bind(this)
  }

  componentDidMount () {
    const porg = this.props.match.params.org
    axios
      .get(`http://localhost:4000/todo/org?isadmin=1&member_of_org=${porg}`)
      .then(res => {
        console.log(res.data)
        var data = []
        var tmpd = [...res.data.data]
        for (let i = 0; i < tmpd.length - 1; i += 2) {
          data = [...data, { user: tmpd[i], todo: tmpd[i + 1] }]
        }
        data = data.filter(k => k.todo.length !== 0)
        this.setState({ todos: data })
        console.log(data)
      })
  }

  submit (e) {
    e.preventDefault()
    const porg = this.props.match.params.org
    var newArr = [...this.state.todos]
    console.log(newArr)
    const ind = newArr.findIndex(
      o => o.user[0].uid === Number(this.state.userid)
    )
    if (ind > -1) {
      const td = {
        userid: Number(this.state.userid),
        title: this.state.title,
        body: this.state.body,
        time_rem: this.state.durVal
      }
      console.log(td)
      axios.post('http://localhost:4000/todo', td).then(() => {
        axios
          .get(`http://localhost:4000/todo/org?isadmin=1&member_of_org=${porg}`)
          .then(res => {
            var data = []
            var tmpd = [...res.data.data]
            for (let i = 0; i < tmpd.length - 1; i += 2) {
              data = [...data, { user: tmpd[i], todo: tmpd[i + 1] }]
            }
            data = data.filter(k => k.todo.length !== 0)
            console.log(data)
            this.setState({
              todos: data,
              userid: '',
              title: '',
              body: '',
              durVal: ''
            })
          })
      })
    } else {
      console.log('Member Not found')
      this.setState({ userid: '', title: '', body: '', durVal: '' })
    }
  }
  render () {
    const { title, userid, body, durVal } = this.state
    const newObj = this.state.todos.map(t => (
      <TODO
        head={`${t.user[0].fname} ${t.user[0].lname}`}
        ti={t.todo.map(ti => ti.body)}
        dur={t.todo.map(d => d.time_rem)}
      />
    ))
    return (
      <Container fluid>
        <Form
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
          onSubmit={this.submit}
          userid={userid}
          title={title}
          body={body}
          durVal={durVal}
        />
        <div
          style={{
            display: 'grid',
            gridGap: '2em',
            gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
            gridAutoFlow: 'dense'
          }}
        >
          {newObj}
        </div>
      </Container>
    )
  }
}
