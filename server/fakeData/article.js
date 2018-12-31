const util = require('../utils/index')
var obj = {
  ARTICLE_LIST_COUNT: 136,
  getList (current, size) {
    var arr = []
    var size = size || 20
    for (var i = 0; i < size; i++) {
      arr.push({
        title: '文章' + (i + 1),
        class: this.getRandomClass(),
        datetime: util.getRandomNum((new Date('2017/1/1 10:00:00')).valueOf(), (new Date('2018/12/31 23:00:00')).valueOf()),
        isOriginal: util.getRandomNum(0, 3) % 2 > 0,
        visitCount: util.getRandomNum(0, 300),
        commentCount: util.getRandomNum(0, 50),
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