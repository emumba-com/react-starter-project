// libs
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

@connect(state => {
  const {auth: {user}} = state

  return {user}
})
export default class PrivateRoute extends React.Component {
  
  render() {
    const { component, render, user, ...rest } = this.props
    
    return (
      <Route {...rest} render={props => (
        <Choose>
          <When condition={user}>
            {
              component ? React.createElement(component, props) :
              render ? render(props) :
              null
            }
          </When>
          <Otherwise>
            <Redirect to={{
              pathname: '/login',
              state: { from: rest.location }
            }}/>
          </Otherwise>
        </Choose>
      )}/>
    )
  }
}
