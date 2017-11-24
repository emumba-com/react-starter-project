// libs
import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

export default class Timeago extends React.Component {
  
  static propTypes = {
    timestamp: PropTypes.number
  }
  
  constructor(props) {
    super(props)
    this.state = {
      timeago: this.getTimeago(),
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
      const now = (new Date).getTime()
      const millisPassed = now - timestamp

      this.setState({
        timeago: this.getTimeago(),
        datetime: this.getDatetime()
      })

      // if more than 24 hours have passed, skip
      if (millisPassed > 86400000) return

      // console.log(`Scheduling timer in next ${millisPassed} millis for comment "${value}"`)
      this.scheduleTimer(millisPassed)
    }, millis)
  }
  
  getTimeago() {
    const {timestamp} = this.props

    return moment(timestamp).fromNow()
  }
  
  getDatetime() {
    const { timestamp } = this.props

    return moment(timestamp).format('h:m a, MMMM D, YYYY')
  }
  
  render() {
    const { className } = this.props
    const { timeago } = this.state
    //alert(`time ago value is ${timeago - 3600000}`);
    
    return <span className={className}>{timeago}</span>
  }
}
