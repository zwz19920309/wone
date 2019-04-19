const DBHelper = require('../../common/db/db-helper')
/**
  * 获取补签方式列表
  * @method getResignFromList
  * @param  {object} params - 参数
  * @return {object}
 */
const getResignFromList = async (params) => {
  let resignformList = await DBHelper.getResignFromList()
  return resignformList
}

module.exports = {
  getResignFromList
}
