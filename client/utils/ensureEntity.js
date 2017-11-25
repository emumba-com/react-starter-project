/* @flow */

// libs
import React from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'

// src
import {
  getEntity,
  getEntityStatus, getFeed,
  hasPropChanged,
  ENTITY_STATUS_UNATTEMPTED
} from './utils'

/**
 * A utility higher order function to make sure that a particular entity (or entities) are present in redux store
 * when a React component is mounted. Here are two different types of operations you can do with this:
 *
 * 1. Fetch specific nodes by ID
 * You must provide following items in the `options` to make it work:
 * - entityKey
 * - fetchEntity
 * - id
 *
 * 2. Fetch all nodes
 * You must provide following items in the `options` to make it work:
 * - entityKey
 * - fetchAll
 * - feedKey
 */
export default (options:{
  entityKey: string,
  fetchEntity?: Function,
  id?: Function,
  fetchAll?: Function,
  feedKey?: string,
  skip?: boolean
}) => (WrappedComponent:Object) => {
  const {
    entityKey, fetchEntity, fetchAll, feedKey, skip = false,
    id: fnGetId = (props) => get(props, 'match.params.id')
  } = options

  if ( skip ) return WrappedComponent

  return (
    connect((state, ownProps) => {
      if ( fetchAll ) {
        // this is a fetchAll action

        if (!feedKey) throw new Error(`You must provide a feedKey if you're providing fetchAll.`)

        const feed = getFeed(state, feedKey, entityKey)
        const entity = feed && feed.items

        return {
          __ensureEntity__entity__: entity,
          __ensureEntity__type__: 'fetchAll'
        }
      }

      // this is a fetch on action
      let id = fnGetId(ownProps)

      if ( !id ) {
        return {
          __ensureEntity__type__: 'skip'
        }
      }
      // if ( !id ) throw new Error(`Couldn't find an entity id. Make sure your @ensureEntity config is correct.`)

      id = Array.isArray(id) ? id : [ id ]

      const entity = id.map(n => getEntity(state, entityKey, n))
      const status = id.map(n => getEntityStatus(state, entityKey, n))

      // console.log(`[ensureEntity/connect/${entityKey}] `, entityKey, entity, status, ownProps.match)

      return {
        __ensureEntity__entity__: entity,
        __ensureEntity__type__: 'fetchEntity',
        __ensureEntity__id__: id,
        __ensureEntity__status__: status
      }
    })(
      class EnsureEntity extends React.Component {
        componentDidMount() {
          const { __ensureEntity__id__, __ensureEntity__status__, __ensureEntity__type__, dispatch } = this.props

          if ( __ensureEntity__type__ === 'fetchAll' ) {
            dispatch(fetchAll())
          } else if ( __ensureEntity__type__ === 'fetchEntity' ) {
            this.handleChangeId( __ensureEntity__id__, __ensureEntity__status__ )
          }
        }
        componentWillReceiveProps(nextProps) {
          const { __ensureEntity__type__, __ensureEntity__id__, __ensureEntity__status__ } = nextProps

          if ( __ensureEntity__type__ === 'fetchEntity' && hasPropChanged('__ensureEntity__id__', this.props, nextProps) ) {
            this.handleChangeId(__ensureEntity__id__, __ensureEntity__status__)
          }
        }
        handleChangeId(nextId, nextStatus) {
          const { dispatch } = this.props

          nextStatus.forEach((status, index) => {
            if ( status === ENTITY_STATUS_UNATTEMPTED ) {
              dispatch(fetchEntity(nextId[index]))
            }
          })
        }
        render() {
          const { __ensureEntity__entity__, __ensureEntity__type__, __ensureEntity__status__, ...rest } = this.props

          return <WrappedComponent {...rest} {...{[entityKey]: __ensureEntity__entity__}}/>
        }
      })
  )
}
