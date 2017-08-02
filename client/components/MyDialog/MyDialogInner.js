import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from './MyDialogInner.less'

import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'

const MyDialogInner = (props) => {
  const {open, onRequestClose, title, children, actions, narrow} = props
  
  return (
    <ReactCSSTransitionGroup
      transitionName={ {
        enter: styles.enter,
        enterActive: styles.enterActive,
        leave: styles.leave,
        leaveActive: styles.leaveActive,
        appear: styles.appear,
        appearActive: styles.appearActive
      } }
      transitionAppear
      transitionAppearTimeout={500}>
        {open &&
          <div className={styles.root}>
            <div className={styles.screen}></div>
            <div className={styles.contentWrapper} onClick={onRequestClose} id="content-wrapper">
              <div className={`${styles.content} ${narrow ? styles.narrow : ''}`}>
                <Paper className={styles.paper}>
                  <div className={styles.title}><h2 className="dialog-heading" style={{margin: 0, textAlign: 'center'}}>{title}</h2></div>
                  <div className={styles.children}>{children}</div>
                  <div className={styles.actions}>{actions}</div>
                </Paper>
              </div>
            </div>
          </div>
        }
    </ReactCSSTransitionGroup>
  )
}

export default MyDialogInner;
