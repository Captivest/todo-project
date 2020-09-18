import React from 'react'

const Form = ({ onChange, onSubmit, title, userid, body, durVal }) => {
  return (
    <form className='form2' onSubmit={onSubmit}>
      <input
        onChange={onChange}
        placeholder='User ID'
        name='userid'
        value={userid}
        type='text'
      />
      <input
        onChange={onChange}
        placeholder='Title'
        name='title'
        value={title}
        type='text'
      />
      <input
        onChange={onChange}
        placeholder='Type Todo'
        name='body'
        value={body}
        type='text'
      />

      <input
        onChange={onChange}
        placeholder='Time Remaining (in hrs)'
        name='durVal'
        value={durVal}
        type='text'
      />
      <button type='submit'>+</button>
    </form>
  )
}

export default Form
