const moment = require('moment')
const DBHelper = require('../../common/db/db-helper')
const ToolUtil = require('../../common/utils/tool-util')
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
  let prizes = []
  for (let m = 0;m < signonList.rows.length;m++) {
    let signon = signonList.rows[m]
    let startAt = moment(signon.start_at).valueOf()
    let endAt = moment(signon.end_at).valueOf()
    let nowAt = moment().valueOf()
    if ((nowAt < endAt) && (nowAt > startAt)) { // 签到活动时间内
      switch (signon.checkintype_id) {
        case 1:
          let p = signon.prizes_text ? (signon.prizes_text.prizes[0] ? (signon.prizes_text.prizes[0][1] ? signon.prizes_text.prizes[0][1] : 0) : 0) : 0
          if (p) {
            prizes = prizes.concat(p)
          }
          break
        case 2:
          let deDates = ToolUtil.getPrizeIndex(signon.cycle_text.type, signon.start_at, signon.cycle_text.number) // 最新签到周期到今日时间段
          let index = moment().diff(moment(deDates.startAt), 'days') + 1
          let ps = signon.prizes_text ? (signon.prizes_text.prizes[0] ? signon.prizes_text.prizes[0][index] ? signon.prizes_text.prizes[0][index] : [] : []) : []
          prizes = prizes.concat(ps)
          break
        case 3:
          let dates = ToolUtil.getPrizeIndex(signon.cycle_text.type, signon.start_at, signon.cycle_text.number) // 最新签到周期到今日时间段
          let nIndex = await DBHelper.getSumUserSignRcord({ uid: params.uid, scene_id: params.scene_id, start_at: dates.startAt, end_at: dates.endAt })
          nIndex = nIndex + 1
          let lps = signon.prizes_text ? (signon.prizes_text.prizes[0] ? signon.prizes_text.prizes[0][nIndex] ? signon.prizes_text.prizes[0][nIndex] : [] : []) : []
          prizes = prizes.concat(lps)
      }
    }
  }
  return prizes
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
  let validSignons = []
  for (let m = 0;m < signonList.rows.length;m++) {
    let signon = signonList.rows[m]
    let signonStartAt = moment(signon.start_at).valueOf()
    let signondAt = moment(signon.end_at).valueOf()
    let nowAt = moment().valueOf()
    if ((nowAt < signondAt) && (nowAt > signonStartAt)) { // 签到活动时间内, 有效签到
      switch (signon.checkintype_id) {
        case 1:
          break
        case 2:
          let deDates = ToolUtil.getPrizeIndex(signon.cycle_text.type, signon.start_at, signon.cycle_text.number) // 最新签到周期到今日时间段
          let completeCount = 0
          completeCount = await DBHelper.getSumUserSignRcord({ uid: params.uid, scene_id: params.scene_id, start_at: deDates.startAt, end_at: deDates.endAt })
          signon.completeCount = completeCount
          break
        case 3: // 累计签到
          let dates = ToolUtil.getPrizeIndex(signon.cycle_text.type, signon.start_at, signon.cycle_text.number) // 最新签到周期到今日时间段
          let signSum = await DBHelper.getSumUserSignRcord({ uid: params.uid, scene_id: params.scene_id, start_at: dates.startAt, end_at: dates.endAt })
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
