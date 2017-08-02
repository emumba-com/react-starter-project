// libs
import React from 'react'

// src
import Page404Inner from './Page404Inner'

export default class Page404 extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <Page404Inner
      {...this.props}/>
  }
}
