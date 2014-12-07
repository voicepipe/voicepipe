var config = module.exports = {}
var protocol = 'http:'
var host = config.host = 'fritx.me'
var url = config.url = protocol = '//' + host

config.secret = '' + Math.random()

config.wx = {
  validGet: true,
  validPost: false,
  token: 'whahax'
  //loginAccount: true,
  //voiceFormat: 'mp3',
  //minSeconds: 20,
  //maxNameLength: 16,
  //account: require('../private/wx-account') // private
}
