import { useState, useRef, useEffect } from 'react'
import CardWrapper from './CardWrapper'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Low')

  // useRef gives direct access to the input element
  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  const handleSubmit = (e) => {
    // this stops the page from refreshing on submit
    e.preventDefault()
    if (title.trim() === '') return

    onAddTask(title, priority)
    setTitle('')
    inputRef.current.focus()
  }

  return (
    <CardWrapper>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter task name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{' '}
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>{' '}
        <button type="submit">Add Task</button>
      </form>
    </CardWrapper>
  )
}

export default TaskForm