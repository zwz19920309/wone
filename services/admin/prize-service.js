const DBHelper = require('../../common/db/db-helper')
/**
  * 获取奖品列表
  * @method getprizeList
  * @param  {object} params - 参数
  * @param {object} type - 奖品条件
  * @return {object} 奖品列表
 */
const getPrizeList = async (params, type) => {
  let prizeList = []
  if (type) {
    if (type === 1) {
      prizeList = await DBHelper.getPrizeListNotInId(params)
    } else {
      prizeList = await DBHelper.getPrizeListInId(params)
    }
  } else {
    prizeList = await DBHelper.getPrizeList(params)
  }
  return prizeList
}

/**
  * 增加奖品
  * @method addPrize
  * @param  {object} params -奖品参数
  * @return {object} 增加结果
 */
const addPrize = async (params) => {
  let result = await DBHelper.savePrize(params)
  return result
}

/**
  * 更新奖品数据
  * @method updatePrize
  * @param  {object} params -奖品参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const updatePrize = async (params, cons) => {
  let result = await DBHelper.updatePrize(params, cons)
  return result
}

/**
  * 删除奖品数据
  * @method deletePrize
  * @param  {object} params -奖品参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const deletePrize = async (params) => {
  let result = await DBHelper.detelePrize(params)
  return result
}

module.exports = {
  getPrizeList,
  addPrize,
  updatePrize,
  deletePrize
}
