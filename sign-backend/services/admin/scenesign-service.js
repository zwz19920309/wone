const dbUtil = require('../../common/db/db-util')
const scenesignModel = require('../../models/admin/scenesign')
const sceneModel = require('../../models/admin/scene')
const signonModel = require('../../models/client/signon')
/**
  * 获取场景签到列表
  * @method getScenesignList
  * @param  {object} params - 参数
  * @param  {object} attrs - 属性数组
  * @return {object} 场景签到列表
 */
const getScenesignList = async (params, attrs, transaction) => {
  let p = params ? { where: params } : {}
  attrs && attrs.length && (p.attributes = attrs)
  let scenesignList = await dbUtil.findAll(scenesignModel, p, transaction)
  return scenesignList
}

/**
  * 获取场景签到列表
  * @method getScenesignList
  * @param  {object} params - 参数
  * @param  {object} attrs - 属性数组
  * @return {object} 场景签到列表
 */
const getScenesignListInclude = async (params, attrs, transaction) => {
  let p = params ? { where: params } : {}
  attrs && attrs.length && (p.attributes = attrs)
  p.include = [ { model: sceneModel }, { model: signonModel } ]
  let scenesignList = await dbUtil.findAll(scenesignModel, p, transaction)
  return scenesignList
}

/**
  * 根据id获取具体类型
  * @method getScenesignById
  * @param  {string} id - 场景签到id
  * @return {object} 场景签到
 */
const getScenesignById = async (id, attrs) => {
  let scenesign = await dbUtil.findById(scenesignModel, id, attrs)
  return scenesign
}

/**
  * 增加场景签到
  * @method addScenesign
  * @param  {object} params -场景签到参数
  * @param  {object} transaction -事务对象
  * @return {object} 增加结果
 */
const addScenesign = async (params, transaction) => {
  let result = await dbUtil.save(scenesignModel, params, transaction)
  return result
}

/**
  * 更新场景签到数据
  * @method updateScenesign
  * @param  {object} params -场景签到参数
  * @cons   {object} cons -更新条件
  * @return {object} 更新结果
 */
const updateScenesign = async (params, cons, transaction) => {
  let result = await dbUtil.updateData(scenesignModel, params, cons, transaction)
  return result
}

/**
  * 删除场景签到数据
  * @method deleteScenesign
  * @param  {object} params -场景签到参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const deleteScenesign = async (params, transaction) => {
  let result = await dbUtil.deleteByCons(scenesignModel, { where: params }, transaction)
  return result
}

/**
  * 批量增加签到数据
  * @method deleteScenesign
  * @param  {Array} params -场景签到参数数组
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const bulkCreateScenesign = async (params, transaction) => {
  let result = await dbUtil.bulkCreate(scenesignModel, params, transaction)
  return result
}

module.exports = {
  getScenesignList,
  getScenesignById,
  addScenesign,
  bulkCreateScenesign,
  updateScenesign,
  deleteScenesign,
  getScenesignListInclude
}
