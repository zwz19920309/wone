const dbUtil = require('../../common/db/db-util')
const checkintypeModel = require('../../models/admin/checkintype')

/**
  * 获取签到类型列表
  * @method bulkCreate
  * @param  {object} params - 参数
  * @return {object} 签到类型列表
 */
const getCheckInTypeList = async (params, attrs) => {
  let p = params ? { where: params } : {}
  attrs && attrs.length && (p.attributes = attrs)
  let checkInTypeList = await dbUtil.findAll(checkintypeModel, p)
  return checkInTypeList
}

/**
  * 根据id获取具体类型
  * @method bulkCreate
  * @param  {string} id - 签到类型id
  * @return {object} 签到类型
 */
const getCheckInTypeById = async (id, attrs) => {
  let checkInType = await dbUtil.findById(checkintypeModel, id, attrs)
  return checkInType
}

/**
  * 增加签到类型
  * @method bulkCreate
  * @param  {object} params -签到类型参数
  * @return {object} 增加结果
 */
const addCheckInType = async (params, transaction) => {
  let result = await dbUtil.save(checkintypeModel, params)
  return result
}

/**
  * 更新签到类型数据
  * @method bulkCreate
  * @param  {object} params -签到类型参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const updateCheckInType = async (params, cons, transaction) => {
  let result = await dbUtil.updateData(checkintypeModel, params, cons)
  return result
}

/**
  * 删除签到类型数据
  * @method bulkCreate
  * @param  {object} params -签到类型参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const deleteCheckInType = async (params, transaction) => {
  let result = await dbUtil.deleteByCons(checkintypeModel, { where: params }, transaction)
  return result
}

module.exports = {
  getCheckInTypeList,
  getCheckInTypeById,
  addCheckInType,
  updateCheckInType,
  deleteCheckInType
}
