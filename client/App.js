// libs
import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import PropTypes from 'prop-types'

// src
import styles from './App.less'
import MUITheme from '../config/theme'
import {
  PageLogin,
  PageLogout,
  Page404,
  PageHomeView,
  DashboardHeader,
  PublicRoute,
  PrivateRoute,
  NotificationSystemConnector
} from './components'

export default class App extends React.Component {
  static propTypes = {
    userAgent: PropTypes.string,
    store: PropTypes.object,
    Router: PropTypes.element,
    routerProps: PropTypes.routerProps
  }

  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  constructor(props) {
    super(props)
  }
  getChildContext() {
    const { userAgent } = this.props
    const theme = userAgent ? Object.assign({ userAgent }, MUITheme) : MUITheme

    return {
      muiTheme: getMuiTheme(theme)
    }
  }
  render() {
    const { store, Router, routerProps } = this.props

    return (
      <Provider store={store}>
        <Router {...routerProps}>
          <div className={styles.root}>
            <DashboardHeader />
            <NotificationSystemConnector />
            <div className={styles.layout}>
              <div className={styles.primaryColumn}>
                <div className={`container-fluid ${styles.pageContainer}`}>
                  <Switch>

                    <PublicRoute path="/login" component={PageLogin} />
                    <Route path="/logout" component={PageLogout} />
                    <PrivateRoute exact path="/" component={PageHomeView} />
                    <Route component={Page404} />

                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
