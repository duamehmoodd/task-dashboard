import { useState, useEffect, useMemo, useCallback, useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'
import Header from './components/functional/Header'
import TaskForm from './components/functional/TaskForm'
import TaskList from './components/functional/TaskList'
import ActivityLogger from './components/class/ActivityLogger'

function App() {
  // useContext gives us the theme without passing props down
  const { theme } = useContext(ThemeContext)

  // we pass a function here because localStorage should be read only once
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [lastAction, setLastAction] = useState(null)

  // runs every time tasks change so localStorage stays updated
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const pendingCount = tasks.filter((t) => !t.completed).length

  useEffect(() => {
    document.title = `${pendingCount} Pending Tasks`
  }, [pendingCount])

  // useCallback keeps the same function so TaskCard does not re-render again and again
  const addTask = useCallback((title, priority) => {
    const newTask = { id: Date.now(), title, priority, completed: false }
    setTasks((old) => [...old, newTask])
    setLastAction({ text: `Added task: ${title}` })
  }, [])

  const deleteTask = useCallback((id, title) => {
    setTasks((old) => old.filter((t) => t.id !== id))
    setLastAction({ text: `Deleted task: ${title}` })
  }, [])

  const toggleTask = useCallback((id, title) => {
    setTasks((old) =>
      old.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
    setLastAction({ text: `Changed status: ${title}` })
  }, [])

  // useMemo only filters again when tasks or filters change
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const statusOk =
        statusFilter === 'All' ||
        (statusFilter === 'Completed' && t.completed) ||
        (statusFilter === 'Pending' && !t.completed)
      const priorityOk = priorityFilter === 'All' || t.priority === priorityFilter
      return statusOk && priorityOk
    })
  }, [tasks, statusFilter, priorityFilter])

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value)
    setLastAction({ text: `Status filter: ${e.target.value}` })
  }

  const handlePriorityChange = (e) => {
    setPriorityFilter(e.target.value)
    setLastAction({ text: `Priority filter: ${e.target.value}` })
  }

  const pageStyle = {
    minHeight: '100vh',
    padding: '20px',
    background: theme === 'dark' ? '#111' : 'white',
    color: theme === 'dark' ? 'white' : 'black',
  }

  return (
    <div style={pageStyle}>
      <Header pending={pendingCount} />
      <TaskForm onAddTask={addTask} />

      <h2>My Tasks</h2>
      <select value={statusFilter} onChange={handleStatusChange}>
        <option value="All">All Tasks</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>{' '}
      <select value={priorityFilter} onChange={handlePriorityChange}>
        <option value="All">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
      <ActivityLogger lastAction={lastAction} />
    </div>
  )
}
export default App