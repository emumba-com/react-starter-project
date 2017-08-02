// libs
import Sequelize from 'sequelize'
import cls from 'continuation-local-storage'

// src
import { dbName, username, password, host, multiStatement, enableLogging } from '../../config/db.config.js'

Sequelize.cls = cls.createNamespace('my-very-own-namespace')

const sequelize = new Sequelize(dbName, username, password, {
  host,
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: multiStatement
  },
  logging: enableLogging,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

export default sequelize

const cache = {}

const makeKey = (host0, username0) => `${host0}#!#${username0}`

export const getMySQLConnection = (database0, host0, username0, password0) => {
  const key = makeKey(host0, username0)

  if (!cache[key]) {
    cache[key] = new Sequelize(database0, username0, password0, {
      host: host0,
      dialect: 'mysql',
      dialectOptions: {
        multipleStatements: true
      },
      logging: enableLogging,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    })
  }

  return cache[key]
}
