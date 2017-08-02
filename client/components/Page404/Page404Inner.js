// libs
import React from 'react'
import {Link} from 'react-router-dom'
import DocumentTitle from 'react-document-title'

// src
import styles  from './Page404Inner.less'

const Page404Inner = props => {
  return (
    <div className={`${styles.root} row`}>
      <DocumentTitle title='404 - GivingAt.work'/>
      <div className="col-lg-6 col-lg-offset-3">
        <h1>404</h1>
        <h2>Looks like you've wandered into an unknown land</h2>
        <Link to="/">Take me back home</Link>
      </div>
    </div>
  )
}

export default Page404Inner
