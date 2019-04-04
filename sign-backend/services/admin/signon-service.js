const dbUtil = require('../../common/db/db-util')
const signonModel = require('../../models/client/signon')
const checkintypeModel = require('../../models/admin/checkintype')
/**
  * 获取签到模板列表
  * @method getSignonList
  * @param  {object} params - 参数
  * @return {object} 签到模板列表
 */
const getSignonList = async (params, attrs, transaction) => {
  let p = params ? { where: params, include: [ { model: checkintypeModel, attributes: ['name', 'type'] } ] } : {}
  attrs && attrs.length && (p.attributes = attrs)
  let signonList = await dbUtil.findAll(signonModel, p, transaction)
  return signonList
}

/**
  * 获取签到模板列表与统计
  * @method getSignonListAndCountInclude
  * @param  {object} params - 参数
  * @return {object} 签到模板列表
 */
const getSignonListAndCountInclude = async (params, attrs, transaction) => {
  let p = params ? { where: params, include: [ { model: checkintypeModel, attributes: ['name', 'type'] } ] } : {}
  attrs && attrs.length && (p.attributes = attrs)
  let signonList = await dbUtil.findAndCountAll(signonModel, p, transaction)
  return signonList
}

/**
  * 获取签到模板列表与统计
  * @method getSignonListAndCountIncludeByPage
  * @param  {object} params - 参数
  * @return {object} 签到模板列表
 */
const getSignonListAndCountIncludeByPage = async (params, attrs, pageMsg) => {
  let pageInfo = pageMsg || { pageSize: 10, page: 1 }
  let p = params ? { where: params, offset: parseInt((pageInfo.page - 1) * pageInfo.pageSize), limit: parseInt(pageInfo.pageSize), include: [ { model: checkintypeModel, attributes: ['name', 'type'] } ] } : {}
  attrs && attrs.length && (p.attributes = attrs)
  let signonList = await dbUtil.findAndCountAll(signonModel, p)
  return signonList
}

/**
  * 根据id获取具体类型
  * @method bulkCreate
  * @param  {string} id - 签到模板id
  * @return {object} 签到模板
 */
const getSignonById = async (id, attrs) => {
  let signon = await dbUtil.findById(signonModel, id, attrs)
  return signon
}

/**
  * 增加签到模板
  * @method bulkCreate
  * @param  {object} params -签到模板参数
  * @return {object} 增加结果
 */
const addSignon = async (params, transaction) => {
  let result = await dbUtil.save(signonModel, params, transaction)
  return result
}

/**
  * 更新签到模板数据
  * @method bulkCreate
  * @param  {object} params -签到模板参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const upDateSignon = async (params, cons, transaction) => {
  let result = await dbUtil.upsignonData(signonModel, params, cons)
  return result
}

/**
  * 删除签到模板数据
  * @method bulkCreate
  * @param  {object} params -签到模板参数
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
  deleteSignon,
  getSignonListAndCountInclude,
  getSignonListAndCountIncludeByPage
}
