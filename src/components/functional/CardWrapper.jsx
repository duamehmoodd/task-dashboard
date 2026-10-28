import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

function CardWrapper(props) {
  const { theme } = useContext(ThemeContext)

  const style = {
    background: theme === 'dark' ? '#111' : 'white',
    color: theme === 'dark' ? 'white' : 'black',
  }

  // props.children is whatever is written between the CardWrapper tags
  return <div style={style}>{props.children}</div>
}

export default CardWrapper