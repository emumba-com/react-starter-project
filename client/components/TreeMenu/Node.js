// libs
import React from 'react'

// src
import styles from './Node.less'

const makeHashable = str => {
    return str.toLowerCase().split(' ').join('_')
}

export default class Node extends React.Component {
    constructor(props) {
        super(props)
    }
    getHashLink() {
        const { parentHashLink, label } = this.props
        
        if ( !this.hashLink ) {
            this.hashLink = (parentHashLink ? parentHashLink + '-' : '') + makeHashable(label)
        }

        return this.hashLink
    }
    handleHashLinkMatch() {

    }
    render() {
        const { label, children, path } = this.props
        const classNames = []
        const linkClassNames = [ styles.link ]
        const hasChildren = children && children.length
        const hashLink = this.getHashLink()
        const didMatchHashLink = path.indexOf(hashLink) > -1
        const didAbsolutelyMatchHashLink = didMatchHashLink && (path.length - 1) === hashLink.length

        if ( didAbsolutelyMatchHashLink ) {
            linkClassNames.push( styles.active )
        }

        return (
            <li className={classNames.join(' ')}>
                <a href={`#${hashLink}`}  className={ linkClassNames.join(' ') }>{label}</a>
                <If condition={ hasChildren && didMatchHashLink }>
                    <ul className={styles.children}>
                        {children.map(child => <Node {...child} path={path} parentHashLink={hashLink}/>)}
                    </ul>
                </If>
            </li>
        )
    }
}
