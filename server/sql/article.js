var uuid = require('uuid')
var obj = {
  TableName: {
    list: 'article_list',
    class: 'article_class'
  },
  fields: {
    class: {
      id: 'class_id',
      parentId: 'class_parent_id',
      name: 'class_name',
      create_time: 'class_create_time',
      is_enable: 'is_enable'
    },
    list: {
      id: 'article_id',
      class_id: 'article_class_id',
      title: 'article_title',
      content: 'article_content',
      create_time: 'article_create_time',
      articleUpdateTime: 'article_update_time',
      isPublish: 'article_is_publish',
      isSelf: 'article_is_self',
      isTop: 'article_is_top',
      readCount: 'article_read_count',
      commentCount: 'article_comment_count',
      is_enable: 'is_enable'
    }
  },
  /******************************
   * Class
   ******************************/
  getClass (data) {
    var sql = `SELECT * FROM ${this.TableName.class}`
    let queryArr = []
    if (data) {
      for (let key in this.fields.class) {
        let column = this.fields.class[key]
        if (data[column]) {
          queryArr.push(`\`${column}\`='${data[column]}'`)
        }
      }
    }
    if (queryArr.length > 0) {
      sql += ` WHERE ${queryArr.join(' AND ')}`
    }
    const con = require('./index')
    return new Promise(function (resolve, reject) {
      con.query(sql, function (err, result) {
        var resultObj = {
          isSuccess: false
        }
        if (err) {
          console.log('[SELECT ERROR] - ', err.message)
          resultObj.message = err.message
        } else {
          resultObj.isSuccess = true
          resultObj.list = []
          result.forEach(item => {
            resultObj.list.push({
              id: item.class_id,
              title: item.class_name,
              parentId: item.class_parent_id
            })
          })
        }
        resolve(resultObj)
      })
    })
  },
  addClass (data) {
    const con = require('./index')
    var insertSqlStr = `INSERT INTO \`${this.TableName.class}\` (\`class_id\`,\`class_name\`,\`class_parent_id\`,\`class_create_time\`) VALUES (?,?,?,?)`
    var insertSqlParams = [uuid.v1(), data.title, data.parentId, (new Date()).format('yyyy/MM/dd hh:mm:ss')]
    return new Promise(function (resolve, reject) {
      con.query(insertSqlStr, insertSqlParams, function (err, result) {
        var resultObj = {
          isSuccess: false
        }
        if (err) {
          console.log('[INSERT ERROR] - ', err.message)
          resultObj.message = err.message
        } else {
          resultObj.isSuccess = true
          resultObj.id = insertSqlParams[0]
        }
        resolve(resultObj)
      })
    })
  },
  updateClass (data) {
    const con = require('./index')
    var insertSqlStr = `UPDATE \`${this.TableName.class}\` SET \`class_name\` = ? WHERE \`class_id\` = ?`
    var insertSqlParams = [data.title, data.id]
    return new Promise(function (resolve, reject) {
      con.query(insertSqlStr, insertSqlParams, function (err, result) {
        var resultObj = {
          isSuccess: false
        }
        if (err) {
          console.log('[UPDATE ERROR] - ', err.message)
          resultObj.message = err.message
        } else {
          resultObj.isSuccess = true
          resultObj.affectedRows = result.affectedRows
        }
        resolve(resultObj)
      })
    })
  },
  removeClass (data) {
    const con = require('./index')
    var insertSqlStr = `DELETE FROM \`${this.TableName.class}\` WHERE \`${this.fields.class.id}\` IN ('${data.join(',')}')`
    var insertSqlParams = []
    return new Promise(function (resolve, reject) {
      con.query(insertSqlStr, insertSqlParams, function (err, result) {
        var resultObj = {
          isSuccess: false
        }
        if (err) {
          console.log('[INSERT ERROR] - ', err.message)
          resultObj.message = err.message
        } else {
          resultObj.isSuccess = true
          resultObj.affectedRows = result.affectedRows
        }
        resolve(resultObj)
      })
    })
  },
  /******************************
   * Article
   ******************************/
  getArticleList (data) {
    var sql = `SELECT * FROM ${this.TableName.list} AS list _WHERE_ LEFT JOIN ${this.TableName.class} AS class ON class.${this.fields.class.id} = list.${this.fields.list.class_id}`
    let queryArr = []
    if (data) {
      for (let key in this.fields.class) {
        let column = this.fields.class[key]
        if (data[column]) {
          queryArr.push(`\`${column}\`='${data[column]}'`)
        }
      }
    }
    if (queryArr.length > 0) {
      sql = sql.replace('_WHERE_', `WHERE ${queryArr.join(' AND ')}`)
    } else {
      sql = sql.replace('_WHERE_', '')
    }
    const con = require('./index')
    return new Promise(function (resolve, reject) {
      con.query(sql, function (err, result) {
        var resultObj = {
          isSuccess: false
        }
        if (err) {
          console.log('[SELECT ERROR] - ', err.message)
          resultObj.message = err.message
        } else {
          resultObj.isSuccess = true
          resultObj.list = result
        }
        resolve(resultObj)
      })
    })
  },
  getArticle (id) {
    var sql = `SELECT * FROM ${this.TableName.list} AS list WHERE list.${this.fields.list.id} = '${id}'`
    const con = require('./index')
    return new Promise(function (resolve, reject) {
      con.query(sql, function (err, result) {
        var resultObj = {
          isSuccess: false
        }
        if (err) {
          console.log('[SELECT ERROR] - ', err.message)
          resultObj.message = err.message
        } else {
          resultObj.isSuccess = true
          resultObj.list = result
        }
        resolve(resultObj)
      })
    })
  },
  addArticle (data) {
    const con = require('./index')
    var insertSqlStr = `INSERT INTO \`${this.TableName.list}\` (\`${this.fields.list.id}\`,\`${this.fields.list.title}\`,\`${this.fields.list.content}\`,\`${this.fields.list.class_id}\`, \`${this.fields.list.create_time}\`) VALUES (?,?,?,?,?)`
    var insertSqlParams = [uuid.v1(), data.title, data.content, data.classId, (new Date()).format('yyyy/MM/dd hh:mm:ss')]
    return new Promise(function (resolve, reject) {
      con.query(insertSqlStr, insertSqlParams, function (err, result) {
        var resultObj = {
          isSuccess: false
        }
        if (err) {
          console.log('[INSERT ERROR] - ', err.message)
          resultObj.message = err.message
        } else {
          resultObj.isSuccess = true
          resultObj.id = insertSqlParams[0]
        }
        resolve(resultObj)
      })
    })
  },
  removeArticle (idList) {
    const con = require('./index')
    var insertSqlStr = `DELETE FROM \`${this.TableName.list}\` WHERE \`${this.fields.list.id}\` IN (${idList.map(item=>`'${item}'`).join(',')})`
    var insertSqlParams = []
    return new Promise(function (resolve, reject) {
      con.query(insertSqlStr, insertSqlParams, function (err, result) {
        var resultObj = {
          isSuccess: false
        }
        if (err) {
          console.log('[INSERT ERROR] - ', err.message)
          resultObj.message = err.message
        } else {
          resultObj.isSuccess = true
          resultObj.affectedRows = result.affectedRows
        }
        resolve(resultObj)
      })
    })
  },
  changeArticleIsSelf (id, isSelf) {
    const con = require('./index')
    var insertSqlStr = `UPDATE \`${this.TableName.list}\` SET \`${this.fields.list.isSelf}\` = ? WHERE \`${this.fields.list.id}\` = ?`
    var insertSqlParams = [isSelf, id]
    return new Promise(function (resolve, reject) {
      con.query(insertSqlStr, insertSqlParams, function (err, result) {
        var resultObj = {
          isSuccess: false
        }
        if (err) {
          console.log('[UPDATE ERROR] - ', err.message)
          resultObj.message = err.message
        } else {
          resultObj.isSuccess = true
          resultObj.affectedRows = result.affectedRows
        }
        resolve(resultObj)
      })
    })
  },
  changeArticleIsPublish (id, isPublish) {
    const con = require('./index')
    var insertSqlStr = `UPDATE \`${this.TableName.list}\` SET \`${this.fields.list.isPublish}\` = ? WHERE \`${this.fields.list.id}\` = ?`
    var insertSqlParams = [isPublish, id]
    return new Promise(function (resolve, reject) {
      con.query(insertSqlStr, insertSqlParams, function (err, result) {
        var resultObj = {
          isSuccess: false
        }
        if (err) {
          console.log('[UPDATE ERROR] - ', err.message)
          resultObj.message = err.message
        } else {
          resultObj.isSuccess = true
          resultObj.affectedRows = result.affectedRows
        }
        resolve(resultObj)
      })
    })
  }
}
module.exports = obj
