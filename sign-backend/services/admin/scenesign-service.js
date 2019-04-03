const dbUtil = require('../../common/db/db-util')
const scenesignModel = require('../../models/admin/scenesign')
const sceneModel = require('../../models/admin/scene')
const signonModel = require('../../models/client/signon')
/**
  * 获取签到类型列表
  * @method bulkCreate
  * @param  {object} params - 参数
  * @return {object} 签到类型列表
 */
const getScenesignList = async (params, attrs) => {
  let p = params ? { where: params } : {}
  attrs && (p.attributes = attrs)
  p.include = [ { model: sceneModel }, { model: signonModel } ]
  let scenesignList = await dbUtil.findAll(scenesignModel, p)
  return scenesignList
}

/**
  * 根据id获取具体类型
  * @method bulkCreate
  * @param  {string} id - 签到类型id
  * @return {object} 签到类型
 */
const getScenesignById = async (id, attrs) => {
  let scenesign = await dbUtil.findById(scenesignModel, id, attrs)
  return scenesign
}

/**
  * 增加签到类型
  * @method bulkCreate
  * @param  {object} params -签到类型参数
  * @return {object} 增加结果
 */
const addScenesign = async (params, transaction) => {
  let result = await dbUtil.save(scenesignModel, params)
  return result
}

/**
  * 更新签到类型数据
  * @method bulkCreate
  * @param  {object} params -签到类型参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const updateScenesign = async (params, cons, transaction) => {
  let result = await dbUtil.updateData(scenesignModel, params, cons)
  return result
}

/**
  * 删除签到类型数据
  * @method bulkCreate
  * @param  {object} params -签到类型参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const deleteScenesign = async (params, transaction) => {
  let result = await dbUtil.deleteByCons(scenesignModel, { where: params }, transaction)
  return result
}

module.exports = {
  getScenesignList,
  getScenesignById,
  addScenesign,
  updateScenesign,
  deleteScenesign
}
