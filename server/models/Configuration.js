import Sequelize from 'sequelize'
import sequelize from './../utils/sequelize'

export default sequelize.define('configurations', {
  key: {type: Sequelize.STRING(128), field: 'key'},
  value: {type: Sequelize.STRING(128), field: 'value'},
  notes: {type: Sequelize.STRING(1024), field: 'notes'}
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,
  // disable the modification of table names
  freezeTableName: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true
})
