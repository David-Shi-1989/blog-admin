const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const webpackServerConfig = require('../build/webpack.server.conf')
const compiler = webpack(webpackServerConfig)
const apiRouter = require('./api/index')
const ueditorRouter = require('./api/ueditor')

const DIST_DIR = path.join(__dirname, '../', 'dist')

Date.prototype.format = function(fmt)   
{ //author: meizz
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

app.use(express.static(path.join(__dirname, 'static')))

app.get('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  var headerContentType = ''
  if (req.url.endsWith('js')) {
    headerContentType = 'application/javascript'
  } else if (req.url.endsWith('css')) {
    headerContentType = 'text/css'
  } else if (req.url.endsWith('mp3') || req.url.endsWith('aac') || req.url.endsWith('m4a')) {
    headerContentType = 'audio/' + req.url.slice(req.url.length - 3)
  } else if (req.url.endsWith('html')) {
    headerContentType = 'text/html; charset=UTF-8'
  } else {
    headerContentType = 'application/json;charset=utf-8'
  }
  res.header('Content-Type', headerContentType)
  next()
})
app.use('/static', express.static('static'))

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackServerConfig.output.publicPath,
  noInfo: true
}))
app.use(require('webpack-hot-middleware')(compiler))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get(['/', '/index.html'], (req, res, next) => {
  const filename = path.join(DIST_DIR, 'index.html')
  compiler.outputFileSystem.readFile(filename, function (err, result) {
    if (err) {
      return next(err)
    }
    res.header('Content-Type', 'text/html; charset=UTF-8')
    res.send(result)
    res.end()
  })
})
app.use('/api', apiRouter)
app.use(ueditorRouter)

// app.use('/api', ueditorRouter)
app.listen(3000, () => {
  console.log('App listening on port 3000')
})
