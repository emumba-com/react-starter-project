// libs
import React from 'react'
import DocumentTitle from 'react-document-title'

const PageHomeViewInner = props => {
  const {
    isLoading,
    isDataAvailable = true
  } = props

  return (
    <div>
      <DocumentTitle title='Home - React Starter'/>
      <Choose>
        <When condition={isLoading}>
          Loading...
        </When>
        <When condition={isDataAvailable}>
          <h1>React Starter Project</h1>
        </When>
        <Otherwise>
          Data Unavaiable
        </Otherwise>
      </Choose>
    </div>
  )
}

export default PageHomeViewInner
