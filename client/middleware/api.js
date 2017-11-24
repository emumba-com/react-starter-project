import "isomorphic-fetch"

const delay = 0

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, options) {
  const promise = new Promise(resolve => {
    if (delay > 0) {
      setTimeout(() => resolve(), delay)
    } else {
      resolve()
    }
  })

  return (
    promise
      .then(() => fetch(endpoint, options))
      .then(response => response.json().then(json => ({ json, response })))
      .then(({ json, response: { ok } }) => {
        if (!ok) {
          return Promise.reject(json)
        }

        return json
      })
  )
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol("Call API")

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === "undefined") {
    return next(action)
  }

  let { endpoint } = callAPI
  const { types, method } = callAPI
  let { fetchOptions } = callAPI

  if (typeof endpoint === "function") {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== "string") {
    throw new Error("Specify a string endpoint URL.")
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected an array of three action types.")
  }

  if (!types.every(type => typeof type === "string")) {
    throw new Error("Expected action types to be strings.")
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]

    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(
    actionWith({
      type: requestType
    })
  )

  if (!fetchOptions) {
    fetchOptions = {
      method: method || "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify(action.payload)
    }
  }

  return callApi(endpoint, fetchOptions).then(
    response =>
      next(
        actionWith({
          payload: response,
          type: successType
        })
      ),
    error =>
      next(
        actionWith({
          type: failureType,
          payload: error || "Something bad happened",
          error: true
        })
      )
  )
}
