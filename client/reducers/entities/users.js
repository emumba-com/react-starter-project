// src
import * as ActionTypes from '../../actions'
import { buildEntityReducer, mergeNewEntities, ENTITY_STATUS_DATA_AVAILABLE } from '../../utils'

export default buildEntityReducer({
  fetchOneActions: [
    ActionTypes.USERS_FETCH_BY_ID,
    ActionTypes.USERS_FETCH_BY_ID_SUCCESS,
    ActionTypes.USERS_FETCH_BY_ID_FAILURE
  ],
  fetchAllActions: [
    ActionTypes.USERS_FETCH_ALL,
    ActionTypes.USERS_FETCH_ALL_SUCCESS,
    ActionTypes.USERS_FETCH_ALL_FAILURE
  ],
  updateActions: [
    ActionTypes.USERS_UPDATE,
    ActionTypes.USERS_UPDATE_SUCCESS,
    ActionTypes.USERS_UPDATE_FAILURE
  ],
  deleteActions: [
    ActionTypes.USERS_DELETE,
    ActionTypes.USERS_DELETE_SUCCESS,
    ActionTypes.USERS_DELETE_FAILURE
  ],
  reducer: function users(state = {}, action) {
    switch (action.type) {
      case ActionTypes.USER_LOGIN_SUCCESS: {
        if (!action.payload) {
          throw new Error(`Can't execute ${ ActionTypes.USER_LOGIN_SUCCESS }. {payload} isn't available in action`)
        }

        const { payload: { user } } = action

        return mergeNewEntities(state, [user], ENTITY_STATUS_DATA_AVAILABLE)
      }
      default: {
        return state
      }
    }
  }
})
