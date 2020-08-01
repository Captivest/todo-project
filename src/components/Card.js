import React from 'react'
import { Card, Button, CardTitle, CardText } from 'reactstrap'

const TODO = ({ style, head, ti = [] }) => {
  return (
    <div>
      <Card
        body
        inverse
        style={{ backgroundColor: '#333', borderColor: '#333' }}
      >
        <CardTitle>{head}</CardTitle>
        <CardText>
          <ul>
            {ti.map(item => (
              <li>{item}</li>
            ))}
          </ul>
        </CardText>
        <Button>Button</Button>
      </Card>
    </div>
  )
}

export default TODO