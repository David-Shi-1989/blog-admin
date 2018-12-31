var obj = {
  getRandomNum (Max, Min) {
    var minNum = Min || 0
    var maxNum = Max || 10
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
  },
  getRandomStr (length, chars) {
    var len = length || 32
    var $chars = chars || 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
　  var maxPos = $chars.length
    var str = ''
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
　　}
　　return str;
  }
}
module.exports = obj