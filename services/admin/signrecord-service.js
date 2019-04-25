const DBHelper = require('../../common/db/db-helper')
const moment = require('moment')
/**
  * 获取签到类型列表
  * @method  getCheckInTypeList
  * @param  {object} params - 参数
  * @return {object} 签到类型列表
 */
const addSignRecord = async (params) => {
  let res = await DBHelper.bulkSaveSignRcord(params)
  return res
}

/**
  * 获取签到类型列表
  * @method  getCheckInTypeList
  * @param  {object} params - 参数
  * @return {object} 签到类型列表
 */
const getUserSignRcord = async (params) => {
  let res = await DBHelper.getUserSignRcord(params)
  return res
}

/**
  * 获取签到类型列表
  * @method  getCheckInTypeList
  * @param  {object} params - 参数
  * @return {object} 签到类型列表
 */
const getSumUserSignRcord = async (params) => {
  let res = await DBHelper.getSumUserSignRcord(params)
  return res
}
/**
  * 今天签到得到奖励
  * @method getTodaySignonPrizes
  * @param  {object} params -参数
  * @return {object} 更新结果
 */
const getTodaySignonPrizes = async (params) => {
  let signonList = await DBHelper.getSignonListInId({ sceneId: params.scene_id })
  let prizeIds = []
  for (let m = 0;m < signonList.rows.length;m++) {
    let signon = signonList.rows[m]
    let startAt = moment(signon.start_at).valueOf()
    let endAt = moment(signon.end_at).valueOf()
    let nowAt = moment().valueOf()
    if ((nowAt < endAt) && (nowAt > startAt)) { // 签到活动时间内
      switch (signon.checkintype_id) {
        case 1:
          let prizeId = signon.prizes_text ? (signon.prizes_text.prizes[0] ? (signon.prizes_text.prizes[0][1] ? signon.prizes_text.prizes[0][1] : 0) : 0) : 0
          if (prizeId) {
            prizeIds = prizeIds.concat(prizeId)
          }
          break
        case 2:
          let startDate = new Date(Date.parse(signon.start_at.replace(/-/g, '/'))).getDate()
          let index = new Date().getDate() - startDate + 1
          let ids = signon.prizes_text ? (signon.prizes_text.prizes[0] ? signon.prizes_text.prizes[0][index] ? signon.prizes_text.prizes[0][index] : [] : []) : []
          prizeIds = prizeIds.concat(ids)
          break
        case 3:
          let signSum = await DBHelper.getSumUserSignRcord({ uid: params.uid, scene_id: params.scene_id, start_at: signon.start_at, end_at: signon.end_at })
          let nIndex = signSum + 1
          let pIds = signon.prizes_text ? (signon.prizes_text.prizes[0] ? signon.prizes_text.prizes[0][nIndex] ? signon.prizes_text.prizes[0][nIndex] : [] : []) : []
          prizeIds = prizeIds.concat(pIds)
      }
    }
  }
  return prizeIds
}
/**
  * 获取签到类型列表
  * @method  getCheckInTypeList
  * @param  {object} params - 参数
  * @return {object} 签到类型列表
 */
const userSignonAward = async (params) => {
  let res = await DBHelper.userSignonAward(params)
  return res
}

/**
  * 签到情况
  * @method getTodaySignonPrizes
  * @param  {object} params -参数
  * @return {object} 更新结果
 */
const getSelfSignon = async (params) => {
  let signonList = await DBHelper.getSignonListInId({ sceneId: params.scene_id })
  let prizeIds = []
  let validSignons = []
  for (let m = 0;m < signonList.rows.length;m++) {
    let signon = signonList.rows[m]
    let startAt = moment(signon.start_at).valueOf()
    let endAt = moment(signon.end_at).valueOf()
    let nowAt = moment().valueOf()
    if ((nowAt < endAt) && (nowAt > startAt)) { // 签到活动时间内, 有效签到
      switch (signon.checkintype_id) {
        case 1:
          break
        case 2:
          let completeCount = 0
          let yearsToday = moment().subtract(1, 'days').format('YYYY-MM-DD')
          let yearstodayRecord = await DBHelper.getYearsTodayRcord({ uid: params.uid, created_at: yearsToday })
          if (yearstodayRecord) {
            completeCount = await DBHelper.getSumUserSignRcord({ uid: params.uid, scene_id: params.scene_id, start_at: signon.start_at, end_at: signon.end_at })
          }
          signon.completeCount = yearstodayRecord ? completeCount : 0
          break
        case 3:
          let signSum = await DBHelper.getSumUserSignRcord({ uid: params.uid, scene_id: params.scene_id, start_at: signon.start_at, end_at: signon.end_at })
          signon.completeCount = signSum
      }
      validSignons.push(signon)
    }
  }
  return validSignons
}

module.exports = {
  addSignRecord,
  getSumUserSignRcord,
  getTodaySignonPrizes,
  userSignonAward,
  getUserSignRcord,
  getSelfSignon
}
