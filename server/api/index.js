const express = require('express')
const router = express.Router()
const SqlController = require('../sql/article.js')

router.get('/article/list', function (req, res) {
  var query = req.query
  var data = require('../fakeData/article.js').getList(query.current, query.size)
  var resData = {
    total: data.total,
    list: data.list,
    current: data.current,
    size: data.size
  }
  res.status(200).send(resData)
})

router.get('/article/class', function (req, res) {
  SqlController.getClass().then((result) => {
    res.status(200).send(result).end()
  })
})

router.post('/article/class', function (req, res) {
  var createData = req.body
  SqlController.addClass(createData).then((result) => {
    res.status(200).send(result).end()
  })
})

router.post('/login', function (req, res) {
  res.status(200).send({token: 'yes12345'})
})
router.get('/get_info', function (req, res) {
  res.status(200).send({username: 'ADMIN'})
})
module.exports = router
