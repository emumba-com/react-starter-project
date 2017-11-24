import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'
import moment from 'moment'

import * as ActionTypes from '../actions'
import entities from './entities'
import aggregatedData from './aggregatedData'
import feed from './feed'

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error, payload } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return payload || null
  }

  return state
}

function auth(state = {user: null}, action) {
  const {type, payload} = action
  
  switch (type) {
    case ActionTypes.USER_LOGIN_SUCCESS: {
      return {...state, user: payload.user.id}
    }
    case ActionTypes.USER_LOGOUT_SUCCESS: {
      return {...state, user: null}
    }
    default: {
      return state
    }
  }
}


export function meta(state = {}, action) {
  const { type, payload } = action

  switch (type) {
    default: {
      return state
    }
  }
}

const rootReducer = combineReducers({
  auth,
  meta,
  entities,
  aggregatedData,
  feed,
  form: formReducer,
  errorMessage,
  routing
})

export default rootReducer
