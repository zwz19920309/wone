const DBHelper = require('../../common/db/db-helper')
/**
  * 获取场景列表
  * @method getSceneList
  * @param  {object} params - 参数
  * @return {object} 场景列表
 */
const getSceneList = async (params) => {
  let sceneList = await DBHelper.getSceneList(params)
  return sceneList
}

/**
  * 增加场景
  * @method addScene
  * @param  {object} params -场景参数
  * @return {object} 增加结果
 */
const addScene = async (params) => {
  let result = await DBHelper.saveScene(params.name, params.note)
  return result
}

module.exports = {
  getSceneList,
  addScene
}
