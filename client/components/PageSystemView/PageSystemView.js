// libs
import React from "react"
import { connect } from "react-redux"

// src
import PageSystemViewInner from "./PageSystemViewInner"
import { } from "../../actions"
import { hasFeed as fnHasFeed, getFeed, requireLiveData } from "../../utils"

@connect(state => {
  return {
  }
})
export default class PageSystemView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>React Starter Project</h1>
      </div>
    )
  }
}
