const rp = require('request-promise')
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
  let res
  await rp('https://api.weixin.qq/12312/QQ?appid=' + 31231321 + '&secret=' + 21312312 + '&code=' + 123123 + '&grant_type=authorization_code').then((result, err) => {
    res = JSON.parse(result)
  })
  return res
}

module.exports = {
  getUserInfoByToken
}
