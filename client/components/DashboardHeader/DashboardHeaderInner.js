// libs
import React from 'react'
import { Link } from 'react-router-dom'

// src
import styles from './DashboardHeaderInner.less'
import { IconLogo } from '../Icon'

const DashboardHeaderInner = props => {
  const {
    user,
    logoLink = '/'
  } = props

  return (
    <div className={styles.root} style={{height: '6rem'}}>
      <div className={styles.visible}>
        <div className={styles.headerBar}>
          <div className={styles.branding}>
            <Link to={logoLink}>
              <IconLogo/>
            </Link>
          </div>
          <div className={styles.breadcrumbs}>
          </div>
          <div className={styles.searchWidget}>
          </div>
          <div className={styles.authentication}>
            <If condition={user}>
              {user.firstName} {user.lastName}{" | "}
              <Link to="/logout" style={{color: 'white'}}>Logout</Link>
            </If>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeaderInner
