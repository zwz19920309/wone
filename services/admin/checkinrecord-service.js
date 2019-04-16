
/**
  * 获取签到记录列表
  * @method bulkCreate
  * @param  {object} params - 参数
  * @return {object} 签到记录列表
 */
const getCheckinrecordList = async (params, attrs) => {
}

/**
  * 根据id获取具体类型
  * @method bulkCreate
  * @param  {string} id - 签到记录id
  * @return {object} 签到记录
 */
const getCheckinrecordById = async (id, attrs) => {
}

/**
  * 增加签到记录
  * @method bulkCreate
  * @param  {object} params -签到记录参数
  * @return {object} 增加结果
 */
const addCheckinrecord = async (params, transaction) => {
}

/**
  * 更新签到记录数据
  * @method bulkCreate
  * @param  {object} params -签到记录参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const updateCheckinrecord = async (params, cons, transaction) => {
}

/**
  * 删除签到记录数据
  * @method bulkCreate
  * @param  {object} params -签到记录参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const deleteCheckinrecord = async (params, transaction) => {
}

module.exports = {
  getCheckinrecordList,
  getCheckinrecordById,
  addCheckinrecord,
  updateCheckinrecord,
  deleteCheckinrecord
}
