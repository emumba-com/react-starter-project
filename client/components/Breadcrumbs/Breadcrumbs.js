// libs
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// src
import styles from './Breadcrumbs.less'
import { getEntity } from '../../utils'

@connect((state, ownProps) => {
  const { entityKey, id } = ownProps
  const entity = getEntity(state, entityKey, id)

  return { entity }
})
export default class Breadcrumbs extends React.Component {
  static propTypes = {
    entityKey: PropTypes.oneOf(['environments', 'nodes']),
    id: PropTypes.number,
    inclusive: PropTypes.bool
  }
  render() {
    const { children } = this.props

    return (
      <Choose>
        <When condition={children && children.length}>
          <p className={styles.root}>{children}</p>
        </When>
        <Otherwise>
          <p className={styles.root}><Link to="/">Home</Link> /</p>
        </Otherwise>
      </Choose>
    )
  }
}
