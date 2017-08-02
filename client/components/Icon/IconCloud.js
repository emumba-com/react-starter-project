import React from 'react'

export default class IconCloud extends React.Component {
    render() {
        const fill = 'white' // '#7FABDA'
        const stroke = '#c3c9d8' // '#7383BF'
        const strokeWidth = '2'
        const { className } = this.props

        return (
            <svg className={['icon', className].join(' ')} id="Capa_1" style={{'enableBackground': 'new 0 0 60 60'}} version="1.1" viewBox="0 0 60 60" x="0px" y="0px" xmlSpace="preserve">
                <path style={{strokeWidth, 'strokeLinecap': 'round', 'strokeMiterlimit': '10'}} d="M50.003,27&#xA;&#x9;c-0.115-8.699-7.193-16-15.919-16c-5.559,0-10.779,3.005-13.661,7.336C19.157,17.493,17.636,17,16,17c-4.418,0-8,3.582-8,8&#xA;&#x9;c0,0.153,0.014,0.302,0.023,0.454C8.013,25.636,8,25.82,8,26c-3.988,1.912-7,6.457-7,11.155C1,43.67,6.33,49,12.845,49h24.507&#xA;&#x9;c0.138,0,0.272-0.016,0.408-0.021C37.897,48.984,38.031,49,38.169,49h9.803C54.037,49,59,44.037,59,37.972&#xA;&#x9;C59,32.601,55.106,27.961,50.003,27z"/>
                <path style={{strokeWidth, 'strokeLinecap': 'round', 'strokeMiterlimit': '10'}} d="M50.003,27&#xA;&#x9;c0,0-2.535-0.375-5.003,0"/>
                <path style={{strokeWidth, 'strokeLinecap': 'round', 'strokeMiterlimit': '10'}} d="M8,25c0-4.418,3.582-8,8-8&#xA;&#x9;s8,3.582,8,8"/>
            </svg>
        )
    }
}
