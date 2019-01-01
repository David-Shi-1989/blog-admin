exports.install = function (Vue, options) {
  var obj = {

  }
  Number.prototype.random = function (num1, num2) {
    var Min = 0
    var Max = 10
    if (arguments.length == 0) {

    } else if (arguments.length == 1) {
      Max = parseInt(num1)
    } else if (arguments.length == 2) {
      Min = Math.min(parseInt(num1), parseInt(num2))
      Max = Math.max(parseInt(num1), parseInt(num2))
    }
    return parseInt(Math.random() * (Max - Min + 1) + Min, 10)
  }
  String.prototype.random = function (length, chars) {
    var len = length || 32
    var $chars = chars || 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
    var maxPos = $chars.length
    var str = ''
    for (var i = 0; i < len; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return str
  }
  Date.prototype.format = function (fmt) {
    var o = {
      'M+' : this.getMonth() + 1,                 //月份
      'd+' : this.getDate(),                    //日
      'h+' : this.getHours(),                   //小时
      'm+' : this.getMinutes(),                 //分
      's+' : this.getSeconds(),                 //秒
      'q+' : Math.floor((this.getMonth() + 3) / 3), //季度
      'S'  : this.getMilliseconds()             //毫秒
    }
    if(/(y+)/.test(fmt))
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+'').substr(4 - RegExp.$1.length))
    for(var k in o) {
      if(new RegExp('('+ k +')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (('00'+ o[k]).substr((''+ o[k]).length)))
      }
    }
    return fmt
  }
  Vue.prototype.util = obj
}
