/* @flow */
import React from 'react'
import { connect } from 'react-redux'

// src
import { startSequentialTimer } from './utils'

/**
 * A higher order function that repeatedely triggers a function
 * every given interval as long as target component is mounted.
 * Useful for polling functions that fetch psuedo-live data.
 */
export default options => (WrappedComponent: Object) => {
  const { fetch, fetchArgs = [], interval = 10000 } = options

  if (!fetch) {
    throw new Error("fetch function was not provided")
  }

  if (!Array.isArray(fetchArgs) && typeof fetchArgs !== "function") {
    throw new Error("fetchArgs can be either an array or a function")
  }

  return @connect()
  class RequireLiveData extends React.Component {
    start() {
      const { dispatch } = this.props
      
      this.stop = startSequentialTimer(
        () => {
          const __fetchArgs__ = Array.isArray(fetchArgs)
            ? fetchArgs
            : fetchArgs(this.props)
            
          return dispatch(fetch(...__fetchArgs__))
        },
        interval
      )
    }
    componentDidMount() {
      this.start()
    }
    componentWillUnmount() {
      this.stop && this.stop()
    }
    reset = () => {
      console.log('[requireLiveData] Resetting timer ...')
      this.stop && this.stop()
      this.start()
    }
    render() {
      return <WrappedComponent {...this.props} requireLiveDataReset={this.reset}/>
    }
  }
}
