/* @flow */

// libs

// src
import * as ActionTypes from '../../actions'
import {
    buildEntityReducer
  } from '../../utils'

export default buildEntityReducer({
  fetchOneActions: [ActionTypes.ICONS_FETCH_BY_ID, ActionTypes.ICONS_FETCH_BY_ID_SUCCESS, ActionTypes.ICONS_FETCH_BY_ID_FAILURE]
})
