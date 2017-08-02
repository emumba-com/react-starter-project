// libs
import React from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"

// src
import DashboardHeaderInner from "./DashboardHeaderInner"
import { getCurrentUser } from "../../utils"

const mapStateToProps = state => {
  const user = getCurrentUser(state)
  
  return { user }
}

@connect(mapStateToProps)
export default class DashboardHeader extends React.Component {
  constructor(props) {
    super(props)
  }
  gotoLink(link) {
    const { dispatch } = this.props
    dispatch(push(link))
  }
  render() {
    return (
      <DashboardHeaderInner
        {...this.props}
        gotoLink={this.gotoLink}
      />
    )
  }
}
