// libs
import React from 'react'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'

// src
import styles from './PageErrorView.less'

const mapStateToProps = state => {
  const {
    entities: {events}
  } = state

  return {
    events
  }
}

@connect(mapStateToProps)
export default class PageErrorView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div className={`${styles.root} row`}>
        <DocumentTitle title="Dashboard - GivingAt.work"/>
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
          <div className="row">
            <div className="col-lg-8">
              <h1>Environment Editor</h1>
            </div>
            <div className="col-lg-4">
            </div>
          </div>
        </div>
      </div>
    )
  }

}
