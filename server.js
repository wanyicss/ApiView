// 引入必要的模块
const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path');
const ejs  = require('ejs');
const bodyParser = require('body-parser')
const router = require('./lib/ctrl/index')
const compress = require('compression')

// 创建一个express实例
var app = express()
app.set('views', path.join(__dirname, './app/views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(compress())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/static',express.static(path.join(__dirname, './app/public')));
app.use('/output',express.static(path.join(__dirname, './output')));

app.use(router)

// 监听 8888 端口，开启服务器
app.listen(8888, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:8888')
})
