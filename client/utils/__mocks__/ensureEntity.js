// libs
import React from 'react'

export default (options:{
    entityKey: string,
    fetchEntity?: Function,
    id?: Function,
    fetchAll?: Function,
    feedKey?: string,
    skip?: boolean
}) => (WrappedComponent:Object) => {    
    return (
        class EnsureEntity extends React.Component {
            render() {
                return <WrappedComponent {...this.props}/>
            }
        }
    )
}
