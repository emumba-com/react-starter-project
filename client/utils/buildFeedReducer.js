/* @flow */

// libs
import { combineReducers } from "redux"
import get from "lodash/get"

export default (options: Object) => {
  const {
    actions: [ACTION_FETCH, ACTION_SUCCESS, ACTION_FAILURE],
    entityCreateActions: [
      ENTITY_CREATE_ONE,
      ENTITY_CREATE_ONE_SUCCESS,
      ENTITY_CREATE_ONE_FAILURE
    ] = ["e0", "e0s", "e0f"],
    entityDeleteActions: [
      ENTITY_DELETE_ONE,
      ENTITY_DELETE_ONE_SUCCESS,
      ENTITY_DELETE_ONE_FAILURE
    ] = ["e1", "e1s", "e1f"],
    reducerItems
  } = options

  function isLoading(state = false, action) {
    switch (action.type) {
      case ACTION_FETCH: {
        return true
      }
      case ACTION_FAILURE:
      case ACTION_SUCCESS: {
        return false
      }
      default: {
        return state
      }
    }
  }

  function __items__(state = [], action) {
    switch (action.type) {
      case ACTION_SUCCESS: {
        return [...action.payload.map(item => item.id)]
      }
      case ENTITY_CREATE_ONE_SUCCESS: {
        return [...state, action.payload.id]
      }
      case ENTITY_DELETE_ONE_SUCCESS: {
        const newState = [...state]
        const id = get(action, "meta.id")
        const index = newState.indexOf(id)

        if (index > -1) {
          newState.splice(index, 1)
        }

        return newState
      }
      default: {
        return state
      }
    }
  }

  function items(state = [], action) {
    const newState = __items__(state, action)

    return reducerItems ? reducerItems(newState, action) : newState
  }

  function meta(
    state = {
      offset: 0,
      limit: 10,
      total: 0,
      requestCount: 0,
      lastItemsFetchedCount: 0
    },
    action
  ) {
    switch (action.type) {
      case ACTION_SUCCESS: {
        return {
          ...state,
          offset: 0,
          total: action.payload.length,
          requestCount: state.requestCount + 1,
          lastItemsFetchedCount: action.payload.length
        }
      }
      default: {
        return state
      }
    }
  }

  return combineReducers({
    isLoading,
    items,
    meta
  })
}
