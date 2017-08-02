import React from 'react'

export default class IconNginx extends React.Component {
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
                <path style={{strokeWidth, 'strokeLinecap': 'round', 'strokeMiterlimit': '10'}} d="M60.074,27.854H30.449v0.008c-0.054-0.001-0.106-0.008-0.16-0.008c-3.076,0-5.569,2.493-5.569,5.57&#xA;&#x9;c0,3.075,2.493,5.568,5.569,5.568c0.054,0,0.106-0.006,0.16-0.008v0.008l12.255,0.255l-3.372,7.058l-17.333,0.011l-8.954-15.927&#xA;&#x9;l8.899-16.402l18.604-0.012l4.433,9.578l10.805-0.153l-8.223-20l-32.721,0.02L14.808,3.4L0.074,30.554l0.111,0.061l14.758,26.253&#xA;&#x9;v0.023h0.013l0.001,0.003l0.004-0.003l31.002-0.02v-0.049l0.051,0.023L60.074,27.854z"/>
            </svg>
        )
    }
}
