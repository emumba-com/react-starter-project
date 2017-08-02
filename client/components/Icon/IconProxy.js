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
                <path style={ style } d="M50.286,18.697c0,6.451-2.017,11.384-6.049,14.803c-4.031,3.416-9.765,5.125-17.2,5.125h-5.453v21.321H8.873V0h19.148&#xA;&#x9;&#x9;c7.271,0,12.799,1.565,16.586,4.694C48.394,7.825,50.286,12.492,50.286,18.697z M21.584,28.21h4.183&#xA;&#x9;&#x9;c3.908,0,6.832-0.773,8.773-2.317c1.94-1.544,2.911-3.793,2.911-6.745c0-2.979-0.814-5.179-2.44-6.601&#xA;&#x9;&#x9;c-1.625-1.421-4.175-2.133-7.646-2.133h-5.781V28.21z"/>
            </svg>
        )
    }
}
