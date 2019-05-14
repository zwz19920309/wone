const rp = require('request')
const config = require('../../config/config')
const getUserInfoByToken = async (token) => {
  // var options = {
  //   uri: config.userApi.uri + '/getUserinfo/app',
  //   headers: {
  //     'x-version': config.userApi.version,
  //     'x-app-id': config.userApi.appId
  //   },
  //   qs: {
  //     access_token: token // -> uri + '?access_token=xxxxx%20xxxxx'
  //   },
  //   json: true // Automatically parses the JSON string in the response
  // }
  // let res = await rp(options)
  // var options = {
  //   uri: 'http://localhost:3001/bonus/admin/resignform/getResignFormList',
  //   json: true // Automatically parses the JSON string in the response
  // }
  // rp(options)
  let res = {}
  return res
}

module.exports = {
  getUserInfoByToken
}
