const DBHelper = require('../../common/db/db-helper')
/**
  * 获取日期类型列表
  * @method getDateTypeList
  * @param  {object} params - 参数
  * @return {object}
 */
const getDateTypeList = async (params, attrs) => {
  let p = params ? { where: params } : {}
  attrs && attrs.length && (p.attributes = attrs)
  let dateTypeList = await DBHelper.getDateTypeList()
  return dateTypeList
}

/**
  * 根据dateType获取
  * @method getOneDateTypeByCons
  * @param  {string} params - 查询条件
  * @return {object}
 */
const getOneDateTypeByCons = async (params) => {
  let dateType = await DBHelper.getDateTypeByType(params)
  return dateType
}

/**
  * 根据type获取具体类型
  * @method getDateTypeListByType
  * @param  {string} type
  * @return {object}
 */
const getDateTypeListByType = async (type) => {
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
  let dateTypeList = await DBHelper.getDateTypeListByTypes(types)
  return dateTypeList
}

module.exports = {
  getDateTypeList,
  getDateTypeListByType,
  getOneDateTypeByCons
}
