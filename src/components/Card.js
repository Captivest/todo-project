import React from 'react'
import axios from 'axios'
import { Card, Button, CardTitle } from 'reactstrap'

export default class TODO extends React.Component {
  constructor (props) {
    super(props)
    this.state = { todo: this.props.ti }
    this.delete = this.delete.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.ti !== this.state.todo) {
      this.setState({ todo: nextProps.ti })
    }
  }

  delete (uid, aid) {
    const del_td = { userid: uid, assign_id: aid }
    axios
      .delete(`http://localhost:4000/todo/org`, { params: del_td })
      .then(() => {
        axios.get(`http://localhost:4000/todo?userid=${uid}`).then(res => {
          this.setState({ todo: res.data.data })
          console.log(this.state)
        })
      })
  }

  render () {
    var { uid, head, dur = [] } = this.props
    const lit = this.state.todo.map((t, i) => (
      <li>
        {`${t.body} ------- ${dur[i]}`}
        <button onClick={() => this.delete(uid, t.assign_id)}>del</button>
      </li>
    ))
    const rand = () => Math.ceil(Math.random() * 3)
    return (
      <div>
        <Card
          body
          inverse
          style={{
            backgroundColor: '#333',
            borderColor: '#333',
            margin: '0 0 20px',
            gridRowEnd: `span ${rand()}`,
            overflow: 'hidden'
          }}
        >
          <CardTitle>{head}</CardTitle>

          <ul>{lit}</ul>

          <Button>Button</Button>
        </Card>
      </div>
    )
  }
}
