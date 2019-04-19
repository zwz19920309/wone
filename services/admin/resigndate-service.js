const DBHelper = require('../../common/db/db-helper')
/**
  * 获取签到类型列表
  * @method  getResignDateList
  * @param  {object} params - 参数
  * @return {object} 签到类型列表
 */
const getResignDateList = async () => {
  let resignDateList = await DBHelper.getResignDateList()
  return resignDateList
}

const addResignDate = async (params) => {
  let resignDateList = await DBHelper.addResignDate(params)
  return resignDateList
}

module.exports = {
  getResignDateList,
  addResignDate
}
