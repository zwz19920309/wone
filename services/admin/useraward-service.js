const DBHelper = require('../../common/db/db-helper')

/**
  * 获取奖励记录
  * @method  getAwardRecordList
  * @param  {object} params - 参数
  * @return {object} 奖励记录
 */
const getUserAwardListBySceneId = async (params) => {
  let res = await DBHelper.getUserAwardListBySceneId(params)
  return res
}
/**
  * 消费用户奖励
  * @method  getAwardRecordList
  * @param  {object} params - 参数
  * @return {object} 消费结果
 */
const consumeUserAward = async (params) => {
  let res = await DBHelper.consumeUserAward(params)
  return res
}

module.exports = {
  getUserAwardListBySceneId,
  consumeUserAward
}
