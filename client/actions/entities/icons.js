// src
import { CALL_API } from '../../middleware/api'

export const ICONS_FETCH_BY_ID =         'ICONS_FETCH_BY_ID'
export const ICONS_FETCH_BY_ID_SUCCESS = 'ICONS_FETCH_BY_ID_SUCCESS'
export const ICONS_FETCH_BY_ID_FAILURE = 'ICONS_FETCH_BY_ID_FAILURE'

export function fetchIconByID(id:number):Object {
  return {
    [CALL_API]: {
      types: [
        ICONS_FETCH_BY_ID,
        ICONS_FETCH_BY_ID_SUCCESS,
        ICONS_FETCH_BY_ID_FAILURE
      ],
      endpoint: `/api/icons/${id}`,
      method: 'GET'
    },
    meta: { id }
  }
}
