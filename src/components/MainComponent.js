import React, { Component } from 'react'
import '../views/dashboard.css'
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
        var data = []
        var tmpd = [...res.data.data]
        for (let i = 0; i < tmpd.length - 1; i += 2) {
          data = [...data, { user: tmpd[i], todo: tmpd[i + 1] }]
        }
        data = data.filter(k => k.todo.length !== 0)
        this.setState({ todos: data })
      })
  }

  submit (e) {
    e.preventDefault()
    const porg = this.props.match.params.org
    axios
      .get(`http://localhost:4000/todo/org?isadmin=1&member_of_org=${porg}`)
      .then(res => {
        var data_1 = []
        var tmpd_1 = [...res.data.data]
        for (let i = 0; i < tmpd_1.length - 1; i += 2) {
          data_1 = [...data_1, { user: tmpd_1[i], todo: tmpd_1[i + 1] }]
        }
        var newArr = [...data_1]
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
          axios.post('http://localhost:4000/todo', td).then(() => {
            axios
              .get(
                `http://localhost:4000/todo/org?isadmin=1&member_of_org=${porg}`
              )
              .then(res => {
                var data_2 = []
                var tmpd_2 = [...res.data.data]
                for (let i = 0; i < tmpd_2.length - 1; i += 2) {
                  data_2 = [...data_2, { user: tmpd_2[i], todo: tmpd_2[i + 1] }]
                }
                data_2 = data_2.filter(k => k.todo.length !== 0)
                this.setState({
                  todos: data_2,
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
      })
  }
  render () {
    var rdlist = [...Array(this.state.todos.length)].map(
      () => Math.ceil(Math.random() * 100) + 300
    )
    console.log(rdlist)
    const { title, userid, body, durVal } = this.state
    const newObj = this.state.todos.map((t, i) => (
      <TODO
        uid={t.user[0].uid}
        head={`${t.user[0].fname} ${t.user[0].lname}`}
        ti={t.todo.map(ti => ti)}
        dur={t.todo.map(d => d.time_rem)}
        height={rdlist[i]}
      />
    ))
    var members = this.state.todos.map(m => (
      <li>
        <span>{m.user[0].uid}</span>
        <p>{`${m.user[0].fname} ${m.user[0].lname}`}</p>
      </li>
    ))
    members = [
      <li>
        <span>ID</span>
        <p>Users</p>
      </li>,
      ...members
    ]
    return (
      <div className='main'>
        <div className='members'>
          <h2>{this.props.match.params.org}</h2>
          <ul className='scroll'>{members}</ul>
        </div>

        <div className='content'>
          <Form
            onChange={e => this.setState({ [e.target.name]: e.target.value })}
            onSubmit={this.submit}
            userid={userid}
            title={title}
            body={body}
            durVal={durVal}
          />
          <div className='masonry scroll'>{newObj}</div>
        </div>
      </div>
    )
  }
}
