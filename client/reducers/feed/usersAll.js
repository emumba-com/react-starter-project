/* @flow */

import * as ActionTypes from "../../actions"
import { buildFeedReducer } from "../../utils"

export default buildFeedReducer({
  actions: [
    ActionTypes.USERS_FETCH_ALL,
    ActionTypes.USERS_FETCH_ALL_SUCCESS,
    ActionTypes.USERS_FETCH_ALL_FAILURE
  ],
  entityCreateActions: [
    ActionTypes.USERS_CREATE,
    ActionTypes.USERS_CREATE_SUCCESS,
    ActionTypes.USERS_CREATE_FAILURE
  ],
  entityDeleteActions: [
    ActionTypes.USERS_DELETE,
    ActionTypes.USERS_DELETE_SUCCESS,
    ActionTypes.USERS_DELETE_FAILURE
  ]
})
