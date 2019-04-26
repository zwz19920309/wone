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
  let prizes = []
  for (let m = 0; m < signonList.rows.length; m++) {
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
          let startDate = new Date(Date.parse(signon.start_at.replace(/-/g, '/'))).getDate()
          let index = new Date().getDate() - startDate + 1
          let ps = signon.prizes_text ? (signon.prizes_text.prizes[0] ? signon.prizes_text.prizes[0][index] ? signon.prizes_text.prizes[0][index] : [] : []) : []
          prizes = prizes.concat(ps)
          break
        case 3:
          let signSum = await DBHelper.getSumUserSignRcord({ uid: params.uid, scene_id: params.scene_id, start_at: signon.start_at, end_at: signon.end_at })
          let nIndex = signSum + 1
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
  for (let m = 0; m < signonList.rows.length; m++) {
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
        case 3: // 累计签到
          let startAt
          let endAt
          switch (signon.cycle_text.type) {
            case 2: // 周
              startAt = moment().startOf('week')
              endAt = moment(startAt).add(1, 'days')
              startAt = moment().endOf('week')
              endAt = moment(endAt).add(1, 'days')
              break
            case 3: // 月
              startAt = moment().startOf('month')
              endAt = moment().endOf('month')
              break
            case 4: // 年
              startAt = moment().startOf('year')
              endAt = moment().endOf('year')
              break
            case 5: // 自定义
              let days = moment().diff(signon.start_at, 'days')
              let less = days % signon.cycle_text.number
              startAt = moment().subtract(less, 'day').format('YYYY-MM-DD')
              endAt = moment().format('YYYY-MM-DD')
              break
          }
          // let days = moment().diff(signon.start_at, 'days')
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
