/* @flow */

// src
import { CALL_API } from '../../middleware/api'

export const USERS_FETCH_ALL =         'USERS_FETCH_ALL'
export const USERS_FETCH_ALL_SUCCESS = 'USERS_FETCH_ALL_SUCCESS'
export const USERS_FETCH_ALL_FAILURE = 'USERS_FETCH_ALL_FAILURE'

export function fetchAllUsers() {
  return {
    [CALL_API]: {
      types: [
        USERS_FETCH_ALL,
        USERS_FETCH_ALL_SUCCESS,
        USERS_FETCH_ALL_FAILURE
      ],
      endpoint: '/api/users'
    }
  }
}
