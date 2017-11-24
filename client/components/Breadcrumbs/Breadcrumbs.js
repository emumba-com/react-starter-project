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
    let node
    let environment

    if ( entityKey === 'environments' ) {
        environment = getEntity(state, entityKey, id)
    } else if ( entityKey === 'nodes' ) {
        node = getEntity(state, entityKey, id)
        environment = getEntity(state, 'environments', node && node.envId)
    }

    return { node, environment }
})
export default class Breadcrumbs extends React.Component {
    static propTypes = {
        entityKey: PropTypes.oneOf(['environments', 'nodes']),
        id: PropTypes.number,
        inclusive: PropTypes.bool
    }
    render() {
        const { entityKey, inclusive, node, environment, id, children } = this.props

        return (
            <Choose>
                <When condition={children && children.length}>
                    <p className={styles.root}>{children}</p>
                </When>
                <When condition={entityKey === 'environments' && !inclusive}>
                    <p className={styles.root}><Link to="/">Home</Link> /</p>
                </When>
                <When condition={entityKey === 'environments' && inclusive && environment}>
                    <p className={styles.root}><Link to="/">Home</Link> / <Link to={`/environments/${environment.id}`}>{environment.name}</Link> /</p>
                </When>
                <When condition={entityKey === 'nodes' && !environment && !inclusive}>
                    <p className={styles.root}><Link to="/">Home</Link> /</p>
                </When>
                <When condition={entityKey === 'nodes' && !environment && inclusive && node}>
                    <p className={styles.root}><Link to="/">Home</Link> / <Link to={`/nodes/${node.id}`}>{node.name}</Link> /</p>
                </When>
                <When condition={entityKey === 'nodes' && environment && !inclusive}>
                    <p className={styles.root}><Link to="/">Home</Link> / <Link to={`/environments/${environment.id}`}>{environment.name}</Link> /</p>
                </When>
                <When condition={entityKey === 'nodes' && environment && inclusive && node}>
                    <p className={styles.root}><Link to="/">Home</Link> / <Link to={`/environments/${environment.id}`}>{environment.name}</Link> / <Link to={`/nodes/${node.id}`}>{node.name}</Link> /</p>
                </When>
                <Otherwise>
                    <p className={styles.root}><Link to="/">Home</Link> /</p>
                </Otherwise>
            </Choose>
        )
    }
}
