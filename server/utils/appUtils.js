// libs
import session from 'express-session'
import expressMySqlStore from 'express-mysql-session'

// src
import { host, username, password, dbName } from '../../config/db.config'
import config from '../../config/app.config'

const COOKIE_NAME = 'guardians_of_galaxy_vol_2'
const SESSION_SECRET = 'Hoaysdris_ids_a_sCehampion_3n59dn39fns'

export const isProduction = () => {
  return process.env.NODE_ENV === 'production'
}

export const isTest = () => {
  return process.env.NODE_ENV === 'test'
}

export const makeLogContextString = req => {
  let strUser
  const { user, headers, connection: { remoteAddress } } = req

  // to get forwarded header, added this line on nginx website config
  // proxy_set_header  X-Forwarded-For $remote_addr;
  const ip = headers['x-forwarded-for'] || remoteAddress

  if (user) {
    strUser = `${user.id} (${user.email})`
  } else {
    strUser = 'Anonymous'
  }

  return `[${strUser}, ${ip}]`
}

export const stringEndsWith = (str, suffix) => {
  return str.indexOf(suffix, str.length - suffix.length) !== -1
}

export const getPort = () => {
  return isProduction() ? 3000 : 3000
}

export const setupSessionStore = (app) => {
  const MySQLStore = expressMySqlStore(session)
  const options = {
    host, // Host name for database connection.
    port: 3306, // Port number for database connection.
    user: username, // Database user.
    password, // Password for the above database user.
    database: dbName, // Database name.
    checkExpirationInterval: 900000, // How frequently expired sessions will be cleared; milliseconds.
    expiration: 86400000, // The maximum age of a valid session; milliseconds.
    createDatabaseTable: true, // Whether or not to create the sessions database table, if one does not already exist.
    schema: {
      tableName: 'sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data'
      }
    }
  }

  const sessionStore = new MySQLStore(options)

  // http://stackoverflow.com/questions/1134290/cookies-on-localhost-with-explicit-domain
  const domain = config.app.host

  // https://www.npmjs.com/package/express-session
  app.use(session({
    key: COOKIE_NAME,
    secret: SESSION_SECRET,
    store: sessionStore,
    cookie: {
      domain: domain,
      maxAge: 31536000000
    },
    resave: false,
    saveUninitialized: false
  }))

  return sessionStore
}
