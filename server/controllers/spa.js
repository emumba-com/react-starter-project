// libs
import ejs from 'ejs'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import request from 'request'
import DocumentTitle from 'react-document-title'

// src
import configureStore from '../../client/store/configureStore'
import { getPort } from '../utils'

const enableUniversalRendering = process.env.UNIVERSAL_RENDERING === 'true'

const makeUniversalHTML = (req, res, preloadedState) => {
  const App = require('../../client/App')

  const store = configureStore(preloadedState)
  const context = {}
  const html = renderToString(
    <App store={store} Router={StaticRouter} routerProps={{ location: req.url, context }} userAgent={req.headers['user-agent']} />
  )
  const title = DocumentTitle.rewind()
  let terminate = false

  if (context.url) {
    res.redirect(302, context.url)
    terminate = true
  }

  return { title, html, terminate }
}

const makeEmptyHTML = () => {
  const html = ''
  const title = 'Emumba'
  const terminate = false

  return { html, title, terminate }
}

const renderSPA = (req, res, preloadedState) => {
  const { user } = req

  // console.log(`[renderSPA] preloadedState: ${JSON.stringify(preloadedState)}`)

  preloadedState.auth = preloadedState.auth || {}
  preloadedState.auth.user = preloadedState.auth.user || user ? user.id : null
  preloadedState.entities = preloadedState.entities || {}
  preloadedState.entities.users = preloadedState.entities.users || {}

  if (user) {
    preloadedState.entities.users[user.id] = user
    returnSPAResponse(req, res, preloadedState)
  } else {
    returnSPAResponse(req, res, preloadedState)
  }
}

const returnSPAResponse = (req, res, preloadedState) => {
  // console.log(`[renderSPAResponse] preloadedState: ${JSON.stringify(preloadedState)}`)

  const makeHTML = enableUniversalRendering ? makeUniversalHTML : makeEmptyHTML
  const { title, html, terminate } = makeHTML(req, res, preloadedState)

  if (terminate) return

  request(`http://localhost:${getPort()}/manifest.json`, (err, response, str) => {
    if (err) {
      throw err
    }

    const manifest = JSON.parse(str)

    ejs.renderFile(path.resolve('./server/templates/web/app.ejs'), { preloadedState, html, title, manifest }, {}, (err0, str0) => {
      if (err0) {
        throw err0
      }

      res.send(str0)
    })
  })
}

export const renderResponse = (req, res, preloadedState = {}) => renderSPA(req, res, preloadedState)
