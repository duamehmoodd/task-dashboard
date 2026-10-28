import { Component } from 'react'
import CardWrapper from '../functional/CardWrapper'

class ActivityLogger extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logs: [],
      toast: '',
    }
    this.timer = null
  }
  // runs once after the component appears so we load saved data here
  componentDidMount() {
    const saved = localStorage.getItem('logs')
    if (saved) {
      this.setState({ logs: JSON.parse(saved) })
    }
    window.addEventListener('keydown', this.handleKey)
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.lastAction && prevProps.lastAction !== this.props.lastAction) {
      const newLog = {
        id: Date.now(),
        text: this.props.lastAction.text,
        time: new Date().toLocaleTimeString(),
      }
      this.setState((state) => ({
        logs: [newLog, ...state.logs],
        toast: newLog.text,
      }))

      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.setState({ toast: '' })
      }, 2000)
    }
    if (prevState.logs !== this.state.logs) {
      localStorage.setItem('logs', JSON.stringify(this.state.logs))
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
    window.removeEventListener('keydown', this.handleKey)
  }
  handleKey = (e) => {
    if (e.key === 'Escape') {
      this.setState({ toast: '' })
    }
  }

  clearLogs = () => {
    this.setState({ logs: [] })
  }

  render() {
    return (
      <CardWrapper>
        <h2>Activity Logger</h2>
        {this.state.toast && <p><b>Notification: {this.state.toast}</b></p>}
        <button onClick={this.clearLogs}>Clear Logs</button>
        {this.state.logs.length === 0 ? (
          <p>No activity yet.</p>
        ) : (
          this.state.logs.slice(0, 10).map((log) => (
            <p key={log.id}>
              <b>{log.text}</b>
              <br />
              {log.time}
            </p>
          ))
        )}
      </CardWrapper>
    )
  }
}

export default ActivityLogger