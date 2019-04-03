const dbUtil = require('../../common/db/db-util')
const checkinrecordModel = require('../../models/admin/checkinrecord')

/**
  * 获取签到记录列表
  * @method bulkCreate
  * @param  {object} params - 参数
  * @return {object} 签到记录列表
 */
const getCheckinrecordList = async (params, attrs) => {
  let p = params ? { where: params } : {}
  attrs && attrs.length && (p.attributes = attrs)
  let checkinrecordList = await dbUtil.findAll(checkinrecordModel, p)
  return checkinrecordList
}

/**
  * 根据id获取具体类型
  * @method bulkCreate
  * @param  {string} id - 签到记录id
  * @return {object} 签到记录
 */
const getCheckinrecordById = async (id, attrs) => {
  let checkinrecord = await dbUtil.findById(checkinrecordModel, id, attrs)
  return checkinrecord
}

/**
  * 增加签到记录
  * @method bulkCreate
  * @param  {object} params -签到记录参数
  * @return {object} 增加结果
 */
const addCheckinrecord = async (params, transaction) => {
  let result = await dbUtil.save(checkinrecordModel, params)
  return result
}

/**
  * 更新签到记录数据
  * @method bulkCreate
  * @param  {object} params -签到记录参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const updateCheckinrecord = async (params, cons, transaction) => {
  let result = await dbUtil.updateData(checkinrecordModel, params, cons)
  return result
}

/**
  * 删除签到记录数据
  * @method bulkCreate
  * @param  {object} params -签到记录参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const deleteCheckinrecord = async (params, transaction) => {
  let result = await dbUtil.deleteByCons(checkinrecordModel, { where: params }, transaction)
  return result
}

module.exports = {
  getCheckinrecordList,
  getCheckinrecordById,
  addCheckinrecord,
  updateCheckinrecord,
  deleteCheckinrecord
}
