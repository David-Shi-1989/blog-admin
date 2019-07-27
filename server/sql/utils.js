var utils = {
  sqlTpl: {
    update (tableName, fieldList, valueList, conditionList) {
      if (typeof (tableName) === 'string' && isArray(fieldList) && isArray(valueList) && fieldList.length === valueList && fieldList.length > 0) {
        var tpl = `UPDATE ${tableName} SET `
        // SET
        for (let i = 0; i < fieldList.length; i++) {
          let column = fieldList[i]
          let value = valueList[i]
          if (typeof (value) === 'string') {
            value = '"' + value + '"'
          }
          tpl += `${column}=${value},`
        }
        tpl = tpl.replace(/,$/g, '')

        // WHERE
        if (conditionList && isArray(conditionList) && conditionList.length > 0) {
          tpl += `WHERE `
          for (let i = 0; i < conditionList.length; i++) {
            tpl += `${conditionList[i]} AND`
          }
          tpl = tpl.replace(/\s*AND$/g, '')
        } else {
          tpl += `WHERE 1`
        }
        return tpl
      } else {
        throw new Error(`参数有误，请检查`, tableName, fieldList.join(','), valueList.join(','))
      }
    }
  }
}
function isArray (arr) {
  return Array.prototype.isPrototypeOf(arr)
}
module.exports = utils
