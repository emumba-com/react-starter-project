/* @flow */

// libs
import has from "lodash/has"
import get from "lodash/get"

// src
import {
  mergeNewEntities,
  replaceNewEntities,
  pushEntitiesStatus,
  popEntitiesStatus,
  ENTITY_STATUS_LOADING,
  ENTITY_STATUS_DATA_AVAILABLE,
  ENTITY_STATUS_DATA_UNAVAILABLE,
  ENTITY_STATUS_DELETING,
  ENTITY_STATUS_UPDATING
} from "./utils"

export default (options: Object) => {
  const {
    fetchOneActions: [FETCH_ONE, FETCH_ONE_SUCCESS, FETCH_ONE_FAILURE] = [
      "1",
      "1s",
      "1f"
    ],
    fetchAllActions: [FETCH_ALL, FETCH_ALL_SUCCESS, FETCH_ALL_FAILURE] = [
      "2",
      "2s",
      "2f"
    ],
    deleteActions: [DELETE_ONE, DELETE_ONE_SUCCESS, DELETE_ONE_FAILURE] = [
      "3",
      "3s",
      "3f"
    ],
    updateActions: [UPDATE_ONE, UPDATE_ONE_SUCCESS, UPDATE_ONE_FAILURE] = [
      "4",
      "4s",
      "4f"
    ],
    createActions: [CREATE_ONE, CREATE_ONE_SUCCESS, CREATE_ONE_FAILURE] = [
      "5",
      "5s",
      "5f"
    ],
    reducer
  } = options

  function __entityReducer__(state: Object = {}, action: Object) {
    const { type } = action
    switch (type) {
      case FETCH_ONE: {
        if (!has(action, "meta.id")) {
          throw new Error(
            `Can't execute ${FETCH_ONE} without required data. Did you forget to include {meta: {id}} in action?`
          )
        }

        const id = get(action, "meta.id")

        return mergeNewEntities(
          state,
          [
            {
              id
            }
          ],
          ENTITY_STATUS_LOADING
        )
      }
      case FETCH_ONE_SUCCESS: {
        if (!action.payload) {
          throw new Error(
            `Can't execute ${FETCH_ONE_SUCCESS}. {payload} isn't available in action`
          )
        }

        const { payload } = action

        return mergeNewEntities(state, [payload], ENTITY_STATUS_DATA_AVAILABLE)
      }
      case FETCH_ONE_FAILURE: {
        if (!has(action, "payload.message") || !has(action, "meta.id")) {
          throw new Error(
            `Can't execute ${FETCH_ONE_FAILURE}, payload.message or meta.id were not found in action`
          )
        }

        const { payload: { message }, meta: { id } } = action

        return mergeNewEntities(
          state,
          [
            {
              id,
              __message__: message
            }
          ],
          ENTITY_STATUS_DATA_UNAVAILABLE
        )
      }
      case CREATE_ONE: {
        return state
      }
      case CREATE_ONE_SUCCESS: {
        return mergeNewEntities(
          state,
          [action.payload],
          ENTITY_STATUS_DATA_AVAILABLE
        )
      }
      case CREATE_ONE_FAILURE: {
        return state
      }
      case UPDATE_ONE: {
        const id = get(action, "meta.id")

        if (!id) {
          throw new Error(
            `Couldn't complete action ${UPDATE_ONE}. Did you forget to specify {meta: {id}} in action?`
          )
        }

        return pushEntitiesStatus(state, [{ id }], ENTITY_STATUS_UPDATING)
      }
      case UPDATE_ONE_SUCCESS: {
        return mergeNewEntities(
          state,
          [action.payload],
          ENTITY_STATUS_DATA_AVAILABLE
        )
      }
      case UPDATE_ONE_FAILURE: {
        const id = get(action, "meta.id")

        if (!id) {
          throw new Error(
            `Couldn't complete action ${UPDATE_ONE_FAILURE}. Did you forget to specify {meta: {id}} in action?`
          )
        }

        return popEntitiesStatus(state, [{ id }])
      }
      case DELETE_ONE: {
        const id = get(action, "meta.id")

        if (!id) {
          throw new Error(
            `Couldn't complete action ${DELETE_ONE}. Did you forget to specify {meta: {id}} in action?`
          )
        }

        return pushEntitiesStatus(state, [{ id }], ENTITY_STATUS_DELETING)
      }
      case DELETE_ONE_SUCCESS: {
        const id = get(action, "meta.id")

        if (!id) {
          throw new Error(
            `Couldn't complete action ${DELETE_ONE_SUCCESS}. Did you forget to specify {meta: {id}} in action?`
          )
        }

        return replaceNewEntities(
          state,
          [{ id }],
          ENTITY_STATUS_DATA_UNAVAILABLE
        )
      }
      case DELETE_ONE_FAILURE: {
        const id = get(action, "meta.id")

        if (!id) {
          throw new Error(
            `Couldn't complete action ${DELETE_ONE_FAILURE}. Did you forget to specify {meta: {id}} in action?`
          )
        }

        return popEntitiesStatus(state, [{ id }])
      }
      case FETCH_ALL: {
        return state
      }
      case FETCH_ALL_SUCCESS: {
        return mergeNewEntities(
          state,
          action.payload,
          ENTITY_STATUS_DATA_AVAILABLE
        )
      }
      case FETCH_ALL_FAILURE: {
        return state
      }
      default: {
        return state
      }
    }
  }

  return function entityReducer(state: Object = {}, action: Object) {
    const newState = __entityReducer__(state, action)

    return reducer ? reducer(newState, action) : newState
  }
}
