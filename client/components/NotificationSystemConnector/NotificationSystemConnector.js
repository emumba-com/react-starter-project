// libs
import React from 'react'
import {connect} from 'react-redux'
import NotificationSystem from 'react-notification-system'

const mapStateToProps = state => {
  const {errorMessage} = state
  
  return {errorMessage}
}

@connect(mapStateToProps)
export default class NotificationSystemConnector extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem
  }
  componentWillReceiveProps(nextProps) {
    const {errorMessage: errorNext} = nextProps
    const {errorMessage: errorNow} = this.props
    
    if (!errorNow && errorNext) {
      this.errorDidAppear(errorNext)
    } else if (errorNow && !errorNext) {
      this.errorDidDisappear()
    }
  }
  errorDidAppear(error) {
    const {message} = error
    
    this.notificationSystem.addNotification({
      message,
      level: 'error',
      position: 'br',
      autoDismiss: 0
    })
  }
  errorDidDisappear() {
    this.notificationSystem.clearNotifications()
  }
  render() {
    return <NotificationSystem ref="notificationSystem" />
  }
}
