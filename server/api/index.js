const express = require('express')
const router = express.Router()
const SqlController = require('../sql/article.js')
var utils = require('../utils/index')

router.get('/article/list', function (req, res) {
  SqlController.getArticleList(req.query).then((result) => {
    res.status(200).send(result).end()
  })
  // var query = req.query
  // var data = require('../fakeData/article.js').getList(query.current, query.size)
  // var resData = {
  //   total: data.total,
  //   list: data.list,
  //   current: data.current,
  //   size: data.size
  // }
  // res.status(200).send(resData)
})

router.get('/article/:id', function (req, res, next) {
  if (utils.isUUID(req.params.id)) {
    SqlController.getArticle(req.params.id).then((result) => {
      if (result.list.length) {
        res.status(200).send(result.list[0]).end()
      } else {
        res.status(404).end()
      }
    })
  } else {
    next()
  }
})

router.put('/article/:id/:field', function (req, res) {
  let isSelf = req.body.isSelf
  let func = null
  switch (req.params.field) {
    case 'is_self':
      func = SqlController.changeArticleIsSelf
      break
    case 'is_publish':
      func = SqlController.changeArticleIsPublish
      break
    default:
      res.status(404).end()
      break
  }
  func.apply(SqlController, [req.params.id, isSelf]).then(result => {
    res.status(200).send(result).end()
  })
})

router.post('/article/list', function (req, res) {
  var data = req.body
  SqlController.addArticle(data).then((result) => {
    res.status(200).send(result).end()
  })
})

router.delete('/article/list', function (req, res) {
  var data = req.body
  SqlController.removeArticle(data).then((result) => {
    res.status(200).send(result).end()
  })
})

router.get('/article/class', function (req, res) {
  SqlController.getClass(req.query).then((result) => {
    res.status(200).send(result).end()
  })
})

router.post('/article/class', function (req, res) {
  var data = req.body
  if (data.id) {
    SqlController.updateClass(data).then((result) => {
      res.status(200).send(result).end()
    })
  } else {
    SqlController.addClass(data).then((result) => {
      res.status(200).send(result).end()
    })
  }
})

router.delete('/article/class', function (req, res) {
  var data = req.body
  if (data.length > 0) {
    SqlController.removeClass(data).then((result) => {
      res.status(200).send(result).end()
    })
  } else {
    res.status(400).send('参数数组不能为空').end()
  }
})

router.post('/login', function (req, res) {
  res.status(200).send({token: 'yes12345'})
})
router.get('/get_info', function (req, res) {
  res.status(200).send({username: 'ADMIN'})
})
module.exports = router
