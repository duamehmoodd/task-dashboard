import TaskCard from './TaskCard'

function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <div>
      {/* ternary shows a message when the list is empty */}
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        // map turns each task into a row and key helps React track each one
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))
      )}
    </div>
  )
}

export default TaskList