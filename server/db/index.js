const low = require('lowdb')
const lodashId = require('lodash-id')
const FileSync = require("lowdb/adapters/FileSync")
const path = require("path")
const NODE_ENV = process.env.NODE_ENV

const dataPath = path.join(__dirname, `_data.${NODE_ENV}.json`)
const adapter = new FileSync(dataPath)

const db = low(adapter)
const defaultState = () => ({
  users: [],
  appointments: [],
  availabilities: []
})

db._.mixin(lodashId)

db.reset = function() {
  this.setState(defaultState()).write()
}
db.defaults(defaultState()).write()

module.exports = db
