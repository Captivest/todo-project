import React from 'react'

const Form = ({ onChange, onSubmit, title, userid, body, durVal }) => {
  return (
    <form style={{ marginBottom: '2em' }} onSubmit={onSubmit}>
      {'Userid => '}
      <input
        onChange={onChange}
        placeholder='userid'
        name='userid'
        value={userid}
        type='text'
      />{' '}
      {'title => '}
      <input
        onChange={onChange}
        placeholder='ttitle'
        name='title'
        value={title}
        type='text'
      />{' '}
      {'NewTodo => '}
      <input
        onChange={onChange}
        placeholder='Type Todo'
        name='body'
        value={body}
        type='text'
      />
      {'Time Limit => '}
      <input
        onChange={onChange}
        placeholder='in min'
        name='durVal'
        value={durVal}
        type='text'
      />
      <button type='submit'>Add</button>
    </form>
  )
}

export default Form
