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
  * 获取场景列表
  * @method getSceneList
  * @param  {object} params - 参数
  * @return {object} 场景列表
 */
const findOneScene = async (params) => {
  let sceneList = await DBHelper.findOneScene(params)
  return sceneList
}

// findOneSceneByAppId

/**
  * 获取场景列表
  * @method getSceneList
  * @param  {object} params - 参数
  * @return {object} 场景列表
 */
const findOneSceneByAppId = async (params) => {
  let sceneList = await DBHelper.findOneSceneByAppId(params)
  return sceneList
}

/**
  * 增加场景
  * @method addScene
  * @param  {object} params -场景参数
  * @return {object} 增加结果
 */
const addScene = async (params) => {
  let result = await DBHelper.saveScene(params)
  return result
}

/**
  * 修改场景
  * @method addScene
  * @param  {object} params -场景参数
  * @return {object} 修改结果
 */
const updateScene = async (params) => {
  let result = await DBHelper.updateScene(params)
  return result
}

/**
  * 删除场景
  * @method addScene
  * @param  {object} params -场景参数
  * @return {object} 删除结果
 */
const bulkDeleteScene = async (params) => {
  let result = await DBHelper.bulkDeleteScene(params)
  return result
}

module.exports = {
  getSceneList,
  addScene,
  bulkDeleteScene,
  updateScene,
  findOneScene,
  findOneSceneByAppId
}
