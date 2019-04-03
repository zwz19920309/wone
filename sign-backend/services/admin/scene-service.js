const dbUtil = require('../../common/db/db-util')
const sceneModel = require('../../models/admin/scene')

/**
  * 获取场景列表
  * @method bulkCreate
  * @param  {object} params - 参数
  * @return {object} 场景列表
 */
const getSceneList = async (params, attrs) => {
  let p = params ? { where: params } : {}
  attrs && (p.attributes = attrs)
  let sceneList = await dbUtil.findAll(sceneModel, p)
  return sceneList
}

/**
  * 根据id获取具体类型
  * @method bulkCreate
  * @param  {string} id - 场景id
  * @return {object} 场景
 */
const getSceneById = async (id, attrs) => {
  let scene = await dbUtil.findById(sceneModel, id, attrs)
  return scene
}

/**
  * 增加场景
  * @method bulkCreate
  * @param  {object} params -场景参数
  * @return {object} 增加结果
 */
const addScene = async (params, transaction) => {
  let result = await dbUtil.save(sceneModel, params, transaction)
  return result
}

/**
  * 更新场景数据
  * @method bulkCreate
  * @param  {object} params -场景参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const updateScene = async (params, cons, transaction) => {
  let result = await dbUtil.updateData(sceneModel, params, cons, transaction)
  return result
}

/**
  * 删除场景数据
  * @method bulkCreate
  * @param  {object} params -场景参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const deleteScene = async (params, transaction) => {
  let result = await dbUtil.deleteByCons(sceneModel, { where: params }, transaction)
  return result
}

module.exports = {
  getSceneList,
  getSceneById,
  addScene,
  updateScene,
  deleteScene
}
