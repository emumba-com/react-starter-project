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
                <path style={{strokeWidth, 'strokeLinecap': 'round', 'strokeMiterlimit': '10'}} d="M57.998,29.39c0,9.889-2.814,17.463-8.442,22.722C43.926,57.37,35.797,60,25.168,60H8.158V-0.071h18.86&#xA;&#x9;&#x9;c9.807,0,17.421,2.588,22.845,7.765C55.286,12.872,57.998,20.104,57.998,29.39z M44.768,29.718&#xA;&#x9;&#x9;c0-12.901-5.697-19.353-17.093-19.353h-6.779v39.116h5.464C38.632,49.481,44.768,42.894,44.768,29.718z"/>
            </svg>
        )
    }
}
