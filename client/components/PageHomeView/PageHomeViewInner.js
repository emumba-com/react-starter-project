// libs
import React from 'react'

const PageHomeViewInner = props => {
  const {
    isLoading,
    isDataAvailable = true
  } = props

  return (
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
  )
}

export default PageHomeViewInner
