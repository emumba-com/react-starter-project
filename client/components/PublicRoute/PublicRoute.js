// libs
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  const {auth: {user}} = state
  
  return {user}
}

@connect(mapStateToProps)
export default class PublicRoute extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const {component, render, user, ...rest} = this.props
    
    return (
      <Route {...rest} render={props => (
        <Choose>
          <When condition={!user}>
            {
              component ? React.createElement(component, props) :
              render ? render(props) :
              null
            }
          </When>
          <Otherwise>
            <Redirect to={{
              pathname: '/',
              state: { from: rest.location }
            }}/>
          </Otherwise>
        </Choose>
      )}/>
    )
  }
}
