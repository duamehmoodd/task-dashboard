import { memo } from 'react'

// memo makes the row re render only when its props change
const TaskCard = memo(function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div>
      {task.title} - {task.completed ? 'Completed' : 'Pending'} -{' '}
      {task.priority === 'High' ? <b>High</b> : task.priority}{' '}
      <button onClick={() => onToggle(task.id, task.title)}>
        {task.completed ? 'Undo' : 'Complete'}
      </button>{' '}
      <button onClick={() => onDelete(task.id, task.title)}>Delete</button>
    </div>
  )
})

export default TaskCard