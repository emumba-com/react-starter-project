// libs
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport'
import helmet from 'helmet'
import compression from 'compression'
import { Server } from 'http'
import { renderFile } from 'ejs'

// src
import devUtils from './utils/devUtils'
import logUtils from './utils/logUtils'
import {
  build404ErrorHandler,
  build500ErrorHandler,
  setupPassport,
  setupSessionStore,
  getPort,
  isProduction
} from './utils'

const port = getPort()
const app = express()
const httpServer = Server(app)
setupSessionStore(app)

// gzip filter
app.use(compression())
app.disable('etag')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.engine('ejs', renderFile);
app.set('view engine', 'ejs');
app.set('views', path.resolve('./server/templates/web'));
app.use(express.static(path.resolve('./client/dist')));
app.use(express.static(path.resolve('./server/public')));
// app.use('/images', express.static(__dirname + "/images"));
// If you declare your session and passport configs above static directory configs then all requests 
//for static content will also get a session, which is not good.
app.use(cookieParser());
// security package
app.use(helmet())
//see setting details here: https://github.com/expressjs/session
//app.use(expressSession(, store: new MySQLStore(options)}));
app.use(passport.initialize())
app.use(passport.session())
setupPassport()

if ( isProduction() ) {
  // handle logging
  logUtils.setupWinstonProductionLogs()
  app.use(logUtils.setupUrlLogs)
} else {
  devUtils.setupWebpack(app)
}

if ( process.env.UNIVERSAL_RENDERING === 'false' ) {
  devUtils.setupHMR()
}

// Include server routes as a middleware
[
  'api/defaultApiController',
  'api/iconApiController',
  'api/userApiController',
  'defaultController'
].forEach(name => app.use(require(`./controllers/${name}`)))

app.use(build404ErrorHandler())
app.use(build500ErrorHandler())

// scheduledTaskUtils.initializeScheduledTasks()
// notificationService.setupSocketIo(sessionStore, setupSocketIO(httpServer))

httpServer.listen(port, err => {
  if (err) {
    console.error(`Server startup failed: `, err)
  }

  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
})
