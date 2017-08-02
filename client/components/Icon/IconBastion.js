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
                <path style={{strokeWidth, 'strokeLinecap': 'round', 'strokeMiterlimit': '10'}} d="M9.418,0.192h18.612c8.482,0,14.638,1.208,18.469,3.621c3.831,2.413,5.748,6.251,5.748,11.516&#xA;&#x9;&#x9;c0,3.572-0.839,6.503-2.516,8.794c-1.678,2.291-3.907,3.668-6.688,4.132v0.409c3.79,0.846,6.524,2.427,8.201,4.745&#xA;&#x9;&#x9;c1.679,2.319,2.517,5.4,2.517,9.245c0,5.456-1.97,9.708-5.911,12.765C43.91,58.472,38.558,60,31.794,60H9.418V0.192z M22.1,23.878&#xA;&#x9;&#x9;h7.363c3.437,0,5.925-0.532,7.465-1.596c1.541-1.063,2.312-2.823,2.312-5.277c0-2.291-0.839-3.934-2.516-4.93&#xA;&#x9;&#x9;c-1.677-0.995-4.328-1.493-7.956-1.493H22.1V23.878z M22.1,33.94v15.585h8.264c3.49,0,6.067-0.666,7.731-2.005&#xA;&#x9;&#x9;c1.663-1.336,2.495-3.381,2.495-6.135c0-4.964-3.546-7.445-10.636-7.445H22.1z"/>
            </svg>
        )
    }
}
