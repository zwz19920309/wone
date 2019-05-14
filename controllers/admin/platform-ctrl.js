const HttpResult = require('../../common/http/http-result')
const platformService = require('../../services/admin/platform-service')

// 获取平台列表
const getPlatFormList = async (ctx) => {
  let platformList = await platformService.getPlatFormList()
  platformList.forEach((platform, index) => {
    platform.index = '1-' + (index + 1)
    platform.submenus = [
      { index: (platform.index + '-1'), path: 'sceneList?platformId=' + platform.id, name: '应用' },
      { index: (platform.index + '-2'), path: 'signonList?platformId=' + platform.id, name: '模板' },
      { index: (platform.index + '-3'), path: 'awardList?platformId=' + platform.id, name: '奖品' },
      { index: (platform.index + '-4'), path: 'awardRecordList?platformId=' + platform.id, name: '奖励记录' }
    ]
  })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: platformList }, 'SUCCESS')
}

// 获取平台列表
const addPlatForm = async (ctx) => {
  let { name } = ctx.request.body
  if (!name) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数缺失'))
  }
  let result = await platformService.addPlatForm({ name: name })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, result, 'SUCCESS')
}

module.exports = {
  getPlatFormList,
  addPlatForm
}
