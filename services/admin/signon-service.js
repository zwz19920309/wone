const DBHelper = require('../../common/db/db-helper')
/**
  * 获取签到模板列表
  * @method getSignonList
  * @param  {object} params - 参数
  * @return {object} 签到模板列表
 */
const getSignonList = async (params) => {
  let signonList = await DBHelper.getSignonList(params)
  return signonList
}

/**
  * 获取签到模板列表
  * @method getSignonInList
  * @param  {object} params - 参数
  * @return {object} 签到模板列表
 */
const getSignonInList = async (params) => {
  let signonList = await DBHelper.getSignonListInId(params)
  return signonList
}

const getSignonNotInList = async (params) => {
  let signonList = await DBHelper.getSignonListNotInId(params)
  return signonList
}

/**
  * 根据id获取具体类型
  * @method bulkCreate
  * @param  {string} params - 签到模板params
  * @return {object} 签到模板
 */
const getSignonById = async (params) => {
  let signon = await DBHelper.getSignonById(params)
  return signon
}

/**
  * 增加签到模板
  * @method bulkCreate
  * @param  {object} params -签到模板参数
  * @return {object} 增加结果
 */
const addSignon = async (params) => {
  let result = await DBHelper.addSignon(params)
  return result
}

/**
  * 更新签到模板数据
  * @method bulkCreate
  * @param  {object} params -签到模板参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const upDateSignon = async (params, cons) => {
  let result = await DBHelper.updateSignonPrizes(params, cons)
  return result
}

/**
  * 删除签到模板数据
  * @method bulkCreate
  * @param  {object} params -签到模板参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const deleteSignon = async (params) => {
  let result = await DBHelper.deleteSignon(params)
  return result
}

module.exports = {
  getSignonList,
  getSignonById,
  addSignon,
  upDateSignon,
  deleteSignon,
  getSignonInList,
  getSignonNotInList
}
