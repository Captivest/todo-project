import React from 'react'

const Form = ({ onChange, onSubmit, name, newtodo }) => {
  return (
    <form style={{ marginBottom: '2em' }} onSubmit={onSubmit}>
      {'Name => '}
      <input
        onChange={onChange}
        placeholder='Name'
        name='name'
        value={name}
        type='text'
      />{' '}
      {'NewTodo => '}
      <input
        onChange={onChange}
        placeholder='Type Todo'
        name='newtodo'
        value={newtodo}
        type='text'
      />
      <button type='submit'>Add</button>
    </form>
  )
}

export default Form
