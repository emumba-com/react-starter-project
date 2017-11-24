// libs
import React from "react"
import { connect } from "react-redux"

// src
import { } from "../../actions"
import PageHomeViewInner from './PageHomeViewInner'

@connect(state => {
  return {
  }
})
export default class PageHomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <PageHomeViewInner {...this.props}/>
    )
  }
}
