const DBHelper = require('../../common/db/db-helper')
/**
  * 获取签到类型列表
  * @method  getCheckInTypeList
  * @param  {object} params - 参数
  * @return {object} 签到类型列表
 */
const addAwardRecord = async (params) => {
  let res = await DBHelper.bulkSaveAwardRecord(params)
  return res
}

module.exports = {
  addAwardRecord
}
