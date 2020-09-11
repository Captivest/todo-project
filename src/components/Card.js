import React from 'react'
import { Card, Button, CardTitle, CardText } from 'reactstrap'

const TODO = ({ style, head, ti = [], dur = [] }) => {
  const lit = ti.map((t, i) => <li>{`${t} ------- ${dur[i]}`}</li>)
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
        <CardText>
          <ul>{lit}</ul>
        </CardText>
        <Button>Button</Button>
      </Card>
    </div>
  )
}

export default TODO
