/* @flow */

// src
import { CALL_API } from '../../middleware/api'

export const ICONS_FETCH_ALL =         'ICONS_FETCH_ALL'
export const ICONS_FETCH_ALL_SUCCESS = 'ICONS_FETCH_ALL_SUCCESS'
export const ICONS_FETCH_ALL_FAILURE = 'ICONS_FETCH_ALL_FAILURE'

export function fetchAllIcons() {
  return {
    [CALL_API]: {
      types: [
        ICONS_FETCH_ALL,
        ICONS_FETCH_ALL_SUCCESS,
        ICONS_FETCH_ALL_FAILURE
      ],
      endpoint: '/api/icons'
    }
  }
}
