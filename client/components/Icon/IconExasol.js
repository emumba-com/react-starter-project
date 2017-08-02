import React from 'react'

export default class IconRedis extends React.Component {
    render() {
        const { className } = this.props
        const style = {
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeMiterlimit: '10'
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
                <path style={ style } d="M29.706,16.683l9.19-14.698c0,0,1.227-1.819,3.137-1.819h11.133c0,0,2.105,0.372,0.592,2.303l-15.832,24.77&#xA;&#x9;c0,0-0.943,1.998,0.504,3.974l16.975,27.074c0,0,0.967,1.546-0.703,1.713H41.767c0,0-2.459-0.396-3.338-2.525l-9.507-16.82&#xA;&#x9;L17.657,58.222c0,0-2.086,1.611-3.14,1.778c-1.362-0.044-11.286,0-11.286,0s-1.867-0.176-0.33-2.416L20.38,30.576&#xA;&#x9;c0,0,0.856-1.493-0.264-3.492L4.723,1.701c0,0-0.439-1.535,1.187-1.535h12.252c0,0,2.481,0.679,3.008,2.018L29.706,16.683z"/>
            </svg>
        )
    }
}
