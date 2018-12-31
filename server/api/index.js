const express = require('express')
const router = express.Router()

router.get('/article/list', function (req, res) {
  var data = require('../fakeData/article.js').getList(1, 20)
  var resData = {
    total: data.total,
    list: data.list,
    current: data.current,
    size: data.size
  }
  res.status(200).send(resData)
})

router.post('/login', function (req, res) {
  res.status(200).send({token: 'yes12345'})
})
router.get('/get_info', function (req, res) {
  res.status(200).send({username: 'ADMIN'})
})
module.exports = router