// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timeLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onIncrement = () => {
    this.setState(prevState => ({
      timeLimitInMinutes: prevState.timeLimitInMinutes + 1,
    }))
  }

  onDecrement = () => {
    const {timeLimitInMinutes} = this.state

    if (timeLimitInMinutes > 1) {
      this.setState(prevState => ({
        timeLimitInMinutes: prevState.timeLimitInMinutes - 1,
      }))
    }
  }

  renderTimerLimitController = () => {
    const {timeElapsedInSeconds, timeLimitInMinutes} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div className="time-limit-controller-container">
        <p className="limit-label">Set Timer Limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-btn"
            disabled={isButtonDisabled}
            onClick={this.onDecrement}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timeLimitInMinutes}</p>
          </div>

          <button
            className="limit-controller-btn"
            disabled={isButtonDisabled}
            onClick={this.onIncrement}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeElapsedInSeconds, timeLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timeLimitInMinutes,
    } = this.state

    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state

    const startOrPauseImg = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

    const startOrPauseAlt = isTimerRunning ? 'play icon' : 'pause icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            className="timer-controller-icon"
            src={startOrPauseImg}
            alt={startOrPauseAlt}
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          type="button"
          className="timer-controller-btn"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds, timeLimitInMinutes} = this.state
    const totalRemainingTime = timeLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingTime / 60)
    const seconds = Math.floor(totalRemainingTime % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const elapsedText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="time-state">{elapsedText}</p>
            </div>
          </div>

          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
