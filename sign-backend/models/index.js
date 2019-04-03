const sequelize = require('../mysql/bn-app-mysql')

const checkInType = require('./admin/checkintype.js')
const dateType = require('./admin/datetype.js')
const signon = require('./client/signon.js')
const scene = require('./admin/scene.js')
const scenesign = require('./admin/scenesign.js')

signon.belongsTo(checkInType, { foreignKey: 'checkintype_id', constraints: false })
scenesign.belongsTo(scene, { foreignKey: 'scene_id', constraints: false })
scenesign.belongsTo(signon, { foreignKey: 'signon_id', constraints: false })

sequelize.sync({
  // force: true will drop the table if it already exists
  force: false,
  // Alters tables to fit models. Not recommended for production use. Deletes data in columns that were removed or had their type changed in the model.
  alter: false
}).then(function () {
  // Table created
  console.log('@@##db sync!-------------------------------------------------')
}).catch((err) => {
  console.log('@@##db sync failed.... ' + err)
})
