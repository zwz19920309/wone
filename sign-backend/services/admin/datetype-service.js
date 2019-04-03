const Sequelize = require('sequelize')
const dbUtil = require('../../common/db/db-util')
const datetypeModel = require('../../models/admin/datetype')
const Op = Sequelize.Op
/**
  * 获取日期类型列表
  * @method getDateTypeList
  * @param  {object} params - 参数
  * @return {object} attrs - 属性数组
 */
const getDateTypeList = async (params, attrs) => {
  let p = params ? { where: params } : {}
  attrs && attrs.length && (p.attributes = attrs)
  let dateTypeList = await dbUtil.findAll(datetypeModel, p)
  return dateTypeList
}

/**
  * 根据id获取具体类型
  * @method getDateTypeById
  * @param  {string} id - 日期类型id
  * @return {object} 日期类型
 */
const getDateTypeById = async (id, attrs) => {
  let dateType = await dbUtil.findById(datetypeModel, id, attrs)
  return dateType
}

/**
  * 根据dateType获取
  * @method getOneDateTypeByCons
  * @param  {string} params - 查询条件
  * @param {object} attrs - 属性数组
  * @return {object} transaction - 事务对象
 */
const getOneDateTypeByCons = async (params, attrs, transaction) => {
  let dateType = await dbUtil.findOne(datetypeModel, { where: params }, attrs, transaction)
  return dateType
}

/**
  * 增加日期类型
  * @method bulkCreate
  * @param  {object} params -日期类型参数
  * @return {object} 增加结果
 */
const addDateType = async (params, transaction) => {
  let result = await dbUtil.save(datetypeModel, params)
  return result
}

/**
  * 更新日期类型数据
  * @method bulkCreate
  * @param  {object} params -日期类型参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const updateDateType = async (params, cons, transaction) => {
  let result = await dbUtil.updateData(datetypeModel, params, cons)
  return result
}

/**
  * 删除日期类型数据
  * @method bulkCreate
  * @param  {object} params -日期类型参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const deleteDateType = async (params, transaction) => {
  let result = await dbUtil.deleteByCons(datetypeModel, { where: params }, transaction)
  return result
}

/**
  * 根据type获取具体类型
  * @method bulkCreate
  * @param  {string} id - 日期类型id
  * @return {object} 日期类型
 */
const getDateTypeListByType = async (type) => {
  let p = {}
  let types = []
  switch (type) {
    case 1: // 每日签到
      types = [1]
      break
    case 2: // 连续签到
      types = [5]
      break
    case 3: // 累计签到
      types = [2, 3, 4, 5]
      break
  }
  (p.id = { [Op.in]: types })
  let dateTypeList = await dbUtil.findAll(datetypeModel, { where: p })
  return dateTypeList
}

module.exports = {
  getDateTypeList,
  getDateTypeById,
  addDateType,
  updateDateType,
  deleteDateType,
  getDateTypeListByType,
  getOneDateTypeByCons
}
