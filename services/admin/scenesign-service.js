const DBHelper = require('../../common/db/db-helper')
/**
  * 删除场景签到数据
  * @method deleteScenesign
  * @param  {object} params -场景签到参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const bulkDeleteScenesign = async (params) => {
  let result = await DBHelper.bulkDekleteSceneSign({ signonIds: params.signonIds, sceneId: params.sceneId })
  return result
}

/**
  * 批量增加签到数据
  * @method deleteScenesign
  * @param  {Array} params -场景签到参数数组
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const bulkCreateScenesign = async (params) => {
  let result = await DBHelper.bulkSaveSceneSign(params)
  return result
}

module.exports = {
  bulkCreateScenesign,
  bulkDeleteScenesign
}
