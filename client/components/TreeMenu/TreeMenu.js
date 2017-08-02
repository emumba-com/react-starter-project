// libs
import React from 'react'
import get from 'lodash/get'

// src
import styles from './TreeMenu.less'
import Node from './Node'

export default class TreeMenu extends React.Component {
    componentWillReceiveProps(nextProps) {
        const thisPath = get(this.props, 'match.path')
        const nextPath = get(nextProps, 'match.path')

        if (thisPath !== nextPath) {
            this.handleChangeHashLink(nextPath)
        }
    }
    handleChangeHashLink(hashLink) {
        // construct node path
        // expand tree till that node path
        // collapse others

    }
    render() {
        const { data: __data, location: {pathname: path} } = this.props
        const data = Array.isArray(__data) ? __data : [__data]

        return (
            <ul className={styles.root}>
                {
                    data.map(item => <Node {...item} path={path}/>)
                }
            </ul>
        )
    }
}

