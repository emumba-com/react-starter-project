// libs
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import configureStore from '../store/configureStore'


export default function configurePage(component) {
  injectTapEventPlugin()
  const store = configureStore(window.GAW.preloadedState)
  const element = React.createElement(component, {
    store
  })
  ReactDOM.render(element, document.getElementById('root'))
}
