import React from 'react'

export default class IconFile extends React.Component {
    render() {
        const fill = 'white' // '#7FABDA'
        const stroke = '#c3c9d8' // '#7383BF'
        const strokeWidth = '2'
        const { className } = this.props
        const style = {strokeWidth, 'strokeLinecap': 'round', 'strokeMiterlimit': '10'}

        return (
            <svg className={['icon', className].join(' ')}
                id="Layer_1"
                version="1.1"
                viewBox="0 0 60 60"
                x="0px"
                y="0px"
                style={{marginTop: 2}}
                xmlSpace="preserve">
                <g>
                    <polygon style={style} points="6,59 54,59 54,1 21,1 6,15"/>
                    <polyline style={Object.assign({ fill: 'none' }, style)} fill="none" points="6,15 21,15 21,1"/>
                </g>
            </svg>
        )
    }
}
