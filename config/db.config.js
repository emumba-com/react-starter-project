import config from './app.config'

const { mysql: { username, password, multiStatement, dbName, host, enableLogging } } = config

export default { username, password, multiStatement, dbName, host, enableLogging }
