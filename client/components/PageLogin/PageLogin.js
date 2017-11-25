// libs
import React from 'react'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import get from 'lodash/get'

// src
import PageLoginInner from './PageLoginInner'
import { login } from '../../actions'
import { bindForm } from '../../utils'

const fields = ['email', 'password']

@reduxForm({
  form: 'loginForm',
  fields,
  validate: values => {
    return {}
  }
})
@bindForm({
  onSubmit: (values, dispatch, props) => {
    const { email, password } = values

    return dispatch(login(email, password))
      .then(action => {
        const { error, payload } = action

        if ( !error ) {
          const linkNext = get(payload, 'user.linkHome', '/')
          dispatch(push(linkNext))
        }
        
        return action
      })
  }
})
export default class PageLogin extends React.Component {
  render() {
    return <PageLoginInner {...this.props}/>
  }
}
