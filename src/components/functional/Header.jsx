import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

function Header({ pending }) {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div>
      <h1>Task Management Dashboard</h1>
      <p>Pending Tasks: {pending}</p>
      <button onClick={toggleTheme}>Change Theme ({theme})</button>
    </div>
  )
}

export default Header