const SETTING = require('../setting.js')
const mysql = require('mysql')

var db_config = SETTING.mysql.getConfig()

var connection = mysql.createConnection(db_config)

connection.connect(function (err) {
  if (err) {
    console.log('Fail to connect mysql ')
    console.log(err)
    return false
  } else {
  }
})

module.exports = connection