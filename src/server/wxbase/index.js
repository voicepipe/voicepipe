var _ = require('lodash'),
  WxValidator = require('./validator'),
  WxParser = require('./parser'),
  wxParser = new WxParser();

var WxBase = module.exports = function (wxConfig, wxHandler) {
  var wxToken = wxConfig.token,
    wxValidGet = wxConfig.validGet,
    wxValidPost = wxConfig.validPost;

  this.wxValidator = new WxValidator(wxToken, wxValidGet, wxValidPost);
  this.wxHandler = wxHandler;
}

WxBase.prototype.watch = function (app, wxPath) {
  this.wxValidator.watch(app, wxPath); // 微信验证
  app.post(wxPath, readXml, replyMsg.bind(this));
}

function replyMsg(req, res) {
  var self = this;
  wxParser.toMsg(req.wxXml, function (err, reqMsg) {
    if (err) {    // 请求无效
      console.warn('Invalid Request: ' + req.wxXml); // 打印无效请求
      return res.sendStatus(400);
    }
    req.wxMsg = reqMsg;
    res.wxMsg = {
      toUserName: reqMsg.fromUserName,
      fromUserName: reqMsg.toUserName
    }
    res.sendWxMsg = sendWxMsg;
    // 用户自定义的处理过程
    self.wxHandler(req, res);
  });
}

function sendWxMsg(obj) {
  var res = this;
  _.extend(res.wxMsg, {
    createTime: Date.now()
  }, obj);
  wxParser.toXml(res.wxMsg, function (err, xml) {
    res.send(xml);
  });
}

function readXml(req, res, next) {
  req.wxXml = '';
  req.on('data', function (chunk) {
    req.wxXml += chunk;
  });
  req.on('end', next);
}
