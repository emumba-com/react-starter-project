// libs
import React from 'react'
import moment from 'moment'

/**
 * Just like Timeago, except it accepts a timestamp in future
 * and it runs a countdown in seconds.
 * 
 * It ticks every second.
 */
export default class Timeahead extends React.Component {
  
  static propTypes = {
    timestamp: React.PropTypes.number
  }
  
  constructor(props) {
    super(props)
    this.state = {
      timeahead: this.getTimeahead(),
      datetime: this.getDatetime()
    }
  }
  
  componentDidMount() {
    this.scheduleTimer()
  }
  
  componentWillUnmount() {
    clearTimeout(this.timerID)
  }
  
  scheduleTimer(millis = 0) {
    this.timerID = setTimeout(() => {
      const { timestamp } = this.props
      const millisTill =  timestamp - Date.now()

      this.setState({
        timeahead: this.getTimeahead(),
        datetime: this.getDatetime()
      })

      // if we're already there, skip
      if (millisTill < 0 ) return

      // console.log(`Scheduling timer in next ${millisPassed} millis for comment "${value}"`)
      this.scheduleTimer(1000)
    }, millis)
  }
  
  getTimeahead() {
    const { timestamp } = this.props
    
    // console.log(`input: ${timestamp}, now: ${Date.now()}, diff: ${timestamp - Date.now()}`)
    // return moment(timestamp).toNow()
    return `${Math.ceil((timestamp - Date.now()) / 1000)} seconds`
  }
  
  getDatetime() {
    const { timestamp } = this.props

    return moment(timestamp).format('h:m a, MMMM D, YYYY')
  }
  
  render() {
    const { className } = this.props
    const { timeahead } = this.state
    
    return <span className={className}>{timeahead}</span>
  }
}
