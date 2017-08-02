import React from 'react'

export default class IconEnvelope extends React.Component {
    render() {
        const fill = 'white' // '#7FABDA'
        const stroke = '#c3c9d8' // '#7383BF'
        const strokeWidth = '2'
        const { className } = this.props

        const style = {
            strokeWidth
        }

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
                    <rect style={style} height="46" width="58" x="1" y="7"/>
                    <polygon style={style} points="1,7 30,30 59,7"/>
                </g>
            </svg>
        )
    }
}
