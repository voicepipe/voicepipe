var path = require('path')
var express = require('express')
var config = require('../config')
var WxBase = require('./wxbase')
var wxHandler = require('./wx-handler')
var app = module.exports = express()

app.use(express.static(
  path.resolve(__dirname, '../../dist/web/')
  ))


// 使用 wxbase
var wxBase = new WxBase(config.wx, wxHandler)
wxBase.watch(app, '/wx')

if (!module.parent) {
  app.listen(process.env.PORT || 3066)
}
