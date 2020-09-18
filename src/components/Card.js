import React from 'react'
import axios from 'axios'

export default class TODO extends React.Component {
  constructor (props) {
    super(props)
    this.state = { todo: this.props.ti, title: '', aid: '', tr: '', usid: '' }
    this.delete = this.delete.bind(this)
    this.updt = this.updt.bind(this)
    this.submit = this.submit.bind(this)
  }
  //RECEIVE NEW PROPS
  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.ti !== this.state.todo) {
      this.setState({ todo: nextProps.ti })
    }
  }
  //AFTER UPDATING SUBMIT TODO
  submit (e) {
    e.preventDefault()
    console.log(this.state)
    const data = {
      status: 0,
      userid: this.state.usid,
      title: this.state.title,
      body: this.state.bd,
      assign_id: this.state.aid,
      time_rem: this.state.tr
    }
    console.log(data)
    axios.put(`http://localhost:4000/todo/org`, data).then(() => {
      axios
        .get(`http://localhost:4000/todo?userid=${data.userid}`)
        .then(res => {
          this.setState({ ch: 0, bd: '', todo: res.data.data })
        })
    })
  }
  //UPDATE TARGETED TODO
  updt (st) {
    this.setState({
      ch: 1,
      usid: this.props.uid,
      bd: st.body,
      title: st.title,
      aid: st.assign_id,
      tr: st.time_rem
    })
    console.log(st, this.state)
  }
  //DELETE TODO
  delete (uid, aid) {
    const del_td = { userid: uid, assign_id: aid }
    axios
      .delete(`http://localhost:4000/todo/org`, { params: del_td })
      .then(() => {
        axios.get(`http://localhost:4000/todo?userid=${uid}`).then(res => {
          this.setState({ todo: res.data.data })
        })
      })
  }

  render () {
    var { uid, head } = this.props
    const { bd, ch = 0 } = this.state
    const lit = this.state.todo.map((t, i) => (
      <li key={i}>
        <p
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}
        >
          {`${t.body}`}
          <span
            style={{ fontSize: '1.2vh' }}
          >{`Created on - ${t.time_cr}`}</span>
        </p>
        <span>
          {`${t.time_rem} hrs`}
          <button onClick={() => this.updt(t)}>Edit</button>
          <button onClick={() => this.delete(uid, t.assign_id)}>Delete</button>
        </span>
      </li>
    ))

    if (ch === 1) {
      return (
        <div className='card' style={{ height: `${this.props.height}px` }}>
          <h2>{head}</h2>
          <form onSubmit={this.submit}>
            <input
              type='text'
              placeholder='Update'
              onChange={e => this.setState({ [e.target.name]: e.target.value })}
              name='bd'
              value={bd}
            />
            <button type='submit'>update</button>
          </form>
          <ul className='scroll'>{lit}</ul>
        </div>
      )
    } else {
      return (
        <div className='card' style={{ height: `${this.props.height}px` }}>
          <h2>{head}</h2>
          <ul className='scroll'>{lit}</ul>
        </div>
      )
    }
  }
}
