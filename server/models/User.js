// libs
import Sequelize from 'sequelize'

// src
import sequelize from './../utils/sequelize'

const User = sequelize.define('users', {
  email: {type: Sequelize.STRING(128), field: 'email'},
  password: {type: Sequelize.STRING(128), field: 'password'},
  firstName: {type: Sequelize.STRING(128), field: 'firstName'},
  lastName: {type: Sequelize.STRING(128), field: 'lastName'},
  linkHome: {type: Sequelize.STRING(128), field: 'linkHome', defaultValue: '/'},
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
  // disable the modification of table names
  freezeTableName: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true
})

export default User
