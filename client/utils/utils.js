/* @flow */

// libs
import has from 'lodash/has'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import fromPairs from 'lodash/fromPairs'
import React from 'react'

export const ENTITY_STATUS_UNATTEMPTED = "ENTITY_STATUS_UNATTEMPTED"
export const ENTITY_STATUS_LOADING = "ENTITY_STATUS_LOADING"
export const ENTITY_STATUS_DATA_UNAVAILABLE = "ENTITY_STATUS_DATA_UNAVAILABLE"
export const ENTITY_STATUS_DATA_AVAILABLE = "ENTITY_STATUS_DATA_AVAILABLE"
export const ENTITY_STATUS_DELETING = "ENTITY_STATUS_DELETING"
export const ENTITY_STATUS_UPDATING = "ENTITY_STATUS_UPDATING"

/**
 * @returns {boolean} - Determines whether the code is running in a server
 */
export const isServer = () => typeof window === "undefined" || !window.document

export const startSequentialTimer = (
  service: Function,
  interval: number = 30000
): void => {
  let timeoutID
  ;(function initiateService() {
    service().catch().then(() => {
      timeoutID = setTimeout(initiateService, interval)
    })
  })()

  return () => {
    clearInterval(timeoutID)
  }
}
/**
 * Given a store state and an entity id, the func returns whether the entity object
 * is present in the store.
 * 
 * @param {Object} state 
 * @param {string} key 
 * @param {number} id 
 */
export const hasEntity = (state: Object, key: string, id: number): boolean =>
  has(state, `entities.${key}.${id}`)

/**
 * Given a store state and an entity id, the func returns the entity object if found.
 * Returns empty object otherwise
 */
export const getEntity = (state: Object, key: string, id: number): Object =>
  get(state, `entities.${key}.${id}`, {})

/**
 * A utility func that, given a redux store state, finds out if a user is logged
 * in at the moment.
 * @param {Object} state - redux store state
 * @return {boolean} - A boolean value that determines if user is logged in
 */
export const isUserLoggedIn = (state: Object): boolean =>
  !!get(state, "auth.user")

/**
 * Given a redux store state, 
 * 
 * @param {Object} state 
 * @return {Object|undefined}
 */
export const getCurrentUser = (state: Object): Object =>
  getEntity(state, "users", get(state, "auth.user"))

/**
 * A utility functions for reducers, that merges an array of new entities into
 * an existing store state.
 *
 * @param {Object} state - entities state object from redux store
 * @param {Array} entities - an array of new entities
 * @param {string} status - (optional) value of meta key __status__
 * @returns {Object} - A new state object for redux store with merged entities
 */
export const mergeNewEntities = (
  state: Object,
  entities: Array<Object>,
  status?: string
): Object => {
  const newEntitiesMap = {}
  const newStatusObject = status ? { __status__: status } : {}

  entities.forEach(item => {
    newEntitiesMap[item.id] = Object.assign(
      {},
      state[item.id] || {},
      item,
      newStatusObject
    )
  })

  return { ...state, ...newEntitiesMap }
}

/**
 * A utility functions for reducers, that replaces an array of new entities into
 * an existing store state.
 *
 * @param {Object} state - entities state object from redux store
 * @param {Array} entities - an array of new entities
 * @param {string} status - (optional) value of meta key __status__
 * @returns {Object} - A new state object for redux store with replaced entities
 */
export const replaceNewEntities = (
  state: Object,
  entities: Array<Object>,
  status?: string
): Object => {
  const newEntitiesMap = {}
  const newStatusObject = status ? { __status__: status } : {}

  entities.forEach(item => {
    newEntitiesMap[item.id] = Object.assign({}, item, newStatusObject)
  })

  return { ...state, ...newEntitiesMap }
}

/**
 * Sets provided status as __status__ and pushes current __status__ into a property __previousStatus__ 
 * 
 * @param {Object} state - entities state object from redux store
 * @param {Array} entities - an array of new entities
 * @param {string} status - (optional) value of meta key __status__
 * @returns {Object} - A new state object for redux store with replaced entities
 */
export const pushEntitiesStatus = (
  state: Object,
  entities: Array<Object>,
  status?: string = ENTITY_STATUS_DATA_AVAILABLE
) =>
  mergeNewEntities(
    state,
    entities.map(e => ({ ...e, __previousStatus__: e.__status__ })),
    status
  )

/**
 * If there's any __previousStatus__, puts it back to __status__
 * 
 * @param {Object} state - entities state object from redux store
 * @param {Array} entities - an array of new entities
 * @returns {Object} - A new state object for redux store with replaced entities
 */
export const popEntitiesStatus = (state: Object, entities: Array<Object>) =>
  mergeNewEntities(
    state,
    entities.map(e => ({
      ...e,
      __status__: e.__previousStatus__ || e.__status__,
      __previousStatus__: null
    }))
  )


/**
 * Given a store state and a feed key, func confirms if the store contains
 * any items for the feed.
 * 
 * If entityKey is provided, the func ANDs the check with presence of entity
 * against each item in the feed.
 * 
 * @param {Object} state - Redux store state
 * @param {string} key - feed key
 * @param {string} entityKey - (options) entity key
 * @return {boolean} - A boolean value
 */
export const hasFeed = (
  state: Object,
  key: string,
  entityKey?: string
): boolean => {
  const items = get(state, `feed.${key}.items`, [])
  const hasItems = Boolean(items.length)

  if (!(hasItems && entityKey)) {
    return hasItems
  }

  // $FlowFixMe
  return items.every(id => hasEntity(state, entityKey, id))
}

/**
 * Given a store state and a feed key, returns feed object {items, isLoading, meta}.
 * If entityKey is provided, it returns full objects in items array instead of IDs.
 * 
 * @param {Object} state 
 * @param {string} feedKey 
 * @param {string} entityKey
 */
export const getFeed = (
  state: Object,
  feedKey: string,
  entityKey: ?string
): Object => {
  const feed = get(state, `feed.${feedKey}`, { items: [] })

  if (!entityKey) {
    return feed
  }

  return {
    ...feed,
    // $FlowFixMe
    items: feed.items.map(id => getEntity(state, entityKey, id))
  }
}

/**
 * Given a store state and an entity id, the func returns one of the four
 * states of the given entity
 */
export const getEntityStatus = (
  state: Object,
  entity: string,
  id: number
): string => {
  const instance = getEntity(state, entity, id)

  return instance ? instance.__status__ : ENTITY_STATUS_UNATTEMPTED
}

/**
 * 
 * @param {string} key 
 * @param {Object} thisProps 
 * @param {Object} nextProps 
 */
export const hasPropChanged = (
  key: string,
  thisProps: Object,
  nextProps: Object
): boolean => {
  return !isEqual(thisProps[key], nextProps[key])
}

/**
 * Converts a query string into a map
 * @param {*} query 
 */
export const parseQueryString = (query: string): Object =>
  fromPairs(
    query.substring(1).split("&").map(s => s.split("=").map(decodeURIComponent))
  )

export const getPathname = (state: Object): string =>
  get(state, "routing.location.pathname", "")
