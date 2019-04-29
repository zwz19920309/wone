const DBHelper = require('../../common/db/db-helper')
/**
  * 连续签到记录
  * @method getContinueSignRcord
  * @param  {object} params - 参数
  * @return {object}
 */
const getContinueSignRcord = async (params) => {
  let continueSignRecord = await DBHelper.getContinueSignRcord(params)
  return continueSignRecord
}
// getContinueSignRcordByAward
/**
  * 连续签到记录
  * @method getContinueSignRcord
  * @param  {object} params - 参数
  * @return {object}
 */
const getContinueSignRcordByAward = async (params) => {
  let continueSignRecord = await DBHelper.getContinueSignRcordByAward(params)
  return continueSignRecord
}
module.exports = {
  getContinueSignRcord,
  getContinueSignRcordByAward
}
