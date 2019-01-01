const util = require('../utils/index')
var obj = {
  ARTICLE_LIST_COUNT: 136,
  getList (current, size) {
    var arr = []
    var size = parseInt(size || 20)
    var current = parseInt(current || 1)
    var beginIndex = (current - 1) * size + 1
    var endIndex = Math.min(beginIndex + size, this.ARTICLE_LIST_COUNT)
    for (var i = beginIndex; i <= endIndex; i++) {
      arr.push({
        title: '文章' + i,
        class: this.getRandomClass(),
        datetime: util.getRandomNum((new Date('2018/12/31 23:00:00')).valueOf(), (new Date('2017/1/1 10:00:00')).valueOf()),
        isOriginal: util.getRandomNum(1, 0) % 2 > 0,
        visitCount: util.getRandomNum(300, 0),
        commentCount: util.getRandomNum(50, 0),
      })
    }
    return {total: this.ARTICLE_LIST_COUNT, list: arr, size: size, current: current}
  },
  getClass () {
    return ['前端Vue', '前端框架', 'CSS', '原生JS', '算法', '图像处理', '数据结构']
  },
  getRandomClass () {
    var classList = this.getClass()
    let random = util.getRandomNum(classList.length - 1, 0)
    return classList[random]
  }
}
module.exports = obj