const dbUtil = require('../../common/db/db-util')
const signonModel = require('../../models/client/signon')
const checkintypeModel = require('../../models/admin/checkintype')
/**
  * 获取日期类型列表
  * @method bulkCreate
  * @param  {object} params - 参数
  * @return {object} 日期类型列表
 */
const getSignonList = async (params, attrs) => {
  let p = params ? { where: params, include: [ { model: checkintypeModel, attributes: ['name', 'type'] } ] } : {}
  attrs && attrs.length && (p.attributes = attrs)
  let signonList = await dbUtil.findAll(signonModel, p)
  return signonList
}

/**
  * 根据id获取具体类型
  * @method bulkCreate
  * @param  {string} id - 日期类型id
  * @return {object} 日期类型
 */
const getSignonById = async (id, attrs) => {
  let signon = await dbUtil.findById(signonModel, id, attrs)
  return signon
}

/**
  * 增加日期类型
  * @method bulkCreate
  * @param  {object} params -日期类型参数
  * @return {object} 增加结果
 */
const addSignon = async (params, transaction) => {
  let result = await dbUtil.save(signonModel, params, transaction)
  return result
}

/**
  * 更新日期类型数据
  * @method bulkCreate
  * @param  {object} params -日期类型参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const upDateSignon = async (params, cons, transaction) => {
  let result = await dbUtil.upsignonData(signonModel, params, cons)
  return result
}

/**
  * 删除日期类型数据
  * @method bulkCreate
  * @param  {object} params -日期类型参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const deleteSignon = async (params, transaction) => {
  let result = await dbUtil.deleteByCons(signonModel, { where: params }, transaction)
  return result
}

module.exports = {
  getSignonList,
  getSignonById,
  addSignon,
  upDateSignon,
  deleteSignon
}
