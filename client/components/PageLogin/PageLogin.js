// libs
import React from 'react'
import {reduxForm} from 'redux-form'
import {push} from 'react-router-redux'
import get from 'lodash/get'

// src
import PageLoginInner from './PageLoginInner'
import {login} from '../../actions/entities/users'
import { bindForm } from '../../utils'

const fields = ['email', 'password']

const validate = values => {
  return {}
}

@reduxForm({
  form: 'loginForm',
  fields,
  validate
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
  constructor(props) {
    super(props)
  }
  render() {
    return <PageLoginInner {...this.props}/>
  }
  
  //HH: sorry @umar, I am ruining some beautiful code. 
  getParameterByName(name, url) {
    if (!url) 
      url = window.location.href;
    
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
}
