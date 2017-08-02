import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { ConnectedRouter as Router } from 'react-router-redux'

import configureStore from '../store/configureStore'
import { history } from '../utils/configureRouter'
import App from '../App'

injectTapEventPlugin()
const store = configureStore(window.GAW.preloadedState)
ReactDOM.render(<App store={store} Router={Router} routerProps={{history}}/>, document.getElementById('root'))
// configureSocketIO(store)
