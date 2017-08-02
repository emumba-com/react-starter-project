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
                <g>
                    <path style={style} d="M38.476,5.367v30.333c0,3.462-0.774,6.496-2.326,9.104c-1.549,2.607-3.788,4.606-6.715,5.996&#xA;&#x9;&#x9;c-2.93,1.39-6.393,2.084-10.389,2.084c-6.028,0-10.709-1.544-14.044-4.633C1.667,45.161,0,40.936,0,35.57V5.367h9.907v28.695&#xA;&#x9;&#x9;c0,3.614,0.726,6.265,2.18,7.953c1.454,1.688,3.858,2.532,7.214,2.532c3.249,0,5.605-0.849,7.069-2.549&#xA;&#x9;&#x9;c1.463-1.699,2.197-4.365,2.197-7.998V5.367H38.476z"/>
                    <path style={style} d="M49.954,52.242V5.367h9.938v46.875H49.954z"/>
                </g>
            </svg>
        )
    }
}
