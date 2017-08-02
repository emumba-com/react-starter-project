import React from 'react'

export default class IconRedis extends React.Component {
    render() {
        const fill = 'white' // '#7FABDA'
        const stroke = '#c3c9d8' // '#7383BF'
        const strokeWidth = '2'
        const { className } = this.props

        return (
            <svg className={['icon', className].join(' ')}
                id="Layer_1"
                version="1.1"
                viewBox="0 0 60 60"
                x="0px"
                y="0px"
                style={{marginTop: 2}}
                xmlSpace="preserve">
                <path style={{strokeWidth, 'strokeLinecap': 'round', 'strokeMiterlimit': '10'}} d="M22.916,59.996V0.165h12.686v59.831H22.916z"/>
            </svg>
        )
    }
}
