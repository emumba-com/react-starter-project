// libs
import React from 'react'
import { connect } from 'react-redux'

// src
import { logout } from '../../actions'

@connect(null, { logout })
export default class PageLogout extends React.Component {
  
  componentDidMount() {
    this.props.logout()
  }
  
  render() {
    return null
  }
}
