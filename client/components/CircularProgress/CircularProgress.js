// libs
import React from 'react'

// src
import styles from './CircularProgress.less'

export default class CircularProgress extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return <div className={styles.root}>
      <svg height="10em" width="10em">
        <circle r="3em" cx="5em" cy="5em" fill="transparent" stroke-dasharray="0em" stroke-dashoffset="0em" stroke-dasharray="" stroke="#DEDEDE"></circle>
        <circle r="3em" cx="5em" cy="5em" fill="transparent" stroke-dasharray="20em" stroke-dashoffset="18em" stroke="red"></circle>
      </svg>
    </div>
  }
}
