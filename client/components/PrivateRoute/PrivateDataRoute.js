// libs
import React from 'react'
import { Route } from 'react-router-redux'
import { connect } from 'react-redux'
import pathToRegexp from 'path-to-regexp'

// src
import PrivateRoute from './PrivateRoute'

@connect((state, ownProps) => {
  const { dataURIs } = state
  const { dataURI, computedMatch: { params } } = ownProps
  const makeURI = pathToRegexp.compile(dataURI)
  const uri = makeURI(params)

  console.log(`fetching data for uri: ${uri}`)

  return {
    isLoadingData: true
  }
})
export default class PrivateDataRoute extends React.Component {

  render() {
    const {hasData, isLoadingData, errorLoadingData, component, ...rest} = this.props
    
    return (
      <div>
        <PrivateRoute
          {...rest}
          render={props => (
            hasData
              ? React.createElement(props)
              : isLoadingData
                ? <div>Loading ...</div>
                : errorLoadingData
                  ? <div>Error loading data!</div>
                  : null
          )}/>
      </div>
    )
  }
}
