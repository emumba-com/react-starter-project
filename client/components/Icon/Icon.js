// libs
import React from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import PropTypes from 'prop-types'

// src
import styles from './Icon.less'
import { getEntity, ensureEntity } from '../../utils'
import { fetchIconByID } from '../../actions'
// import cloud from './cloud.svg'
import IconBastion from './IconBastion'
import IconCloud from './IconCloud'
import IconDatabase from './IconDatabase'
import IconEnvelope from './IconEnvelope'
import IconExasol from './IconExasol'
import IconFile from './IconFile'
import IconIntegration from './IconIntegration'
import IconMySQL from './IconMySQL'
import IconNginx from './IconNginx'
import IconProxy from './IconProxy'
import IconRedis from './IconRedis'
import IconUI from './IconUI'
import IconVPN from './IconVPN'

const map = {
    'bastion.svg': IconBastion,
    'cloud.svg': IconCloud, // added
    'database.svg': IconDatabase,
    'envelope.svg': IconEnvelope, // added
    'exasol.svg': IconExasol,
    'file.svg': IconFile, // added
    'integration.svg': IconIntegration,
    'mysql.svg': IconMySQL,
    'nginx.svg': IconNginx, // added
    'proxy.svg': IconProxy,
    'redis.svg': IconRedis, // added
    'ui.svg': IconUI,
    'vpn.svg': IconVPN
}


@ensureEntity({
    entityKey: 'icons',
    id: props => {
        // console.log('[Icon/ensureEntity/id] props: ', props)
        return props.id
    },
    fetchEntity: fetchIconByID
})
export default class Icon extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired
    }

    render() {
        const { className, status } = this.props
        const C = map[get(this.props, 'icons[0].path')] || IconCloud

        return (
            <span className={[styles.root, className].join(' ')}>
                <C className={styles[status]}/>
            </span>
        )
    }
}
