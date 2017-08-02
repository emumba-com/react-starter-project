import Sequelize from 'sequelize'
import sequelize from './../utils/sequelize'

export default sequelize.define('icons', {
  name: {type: Sequelize.STRING(128), field: 'name'},
  path: {type: Sequelize.STRING(128), field: 'path'}
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,
  // disable the modification of table names
  freezeTableName: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true
})
