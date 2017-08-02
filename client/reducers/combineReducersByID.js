import { combineReducers } from 'redux'

const combineReducersByID = props => reducers => {
  const {types = [], getID} = props
  const reduceStateForEntity = combineReducers(reducers)

  return (state = {}, action) => {
    if (!types.includes(action.type)) return state

    const id = getID(action)
    const nextState = {...state}
    let hasChanged = false

    if (!state[id]) {
      nextState[id] = {}
      hasChanged = true
    }

    const previousStateForEntity = state[id]
    const nextStateForEntity = reduceStateForEntity(previousStateForEntity, action)
    nextState[id] = nextStateForEntity
    hasChanged = hasChanged || previousStateForEntity !== nextStateForEntity

    return hasChanged ? nextState : state
  }
}

export default combineReducersByID
