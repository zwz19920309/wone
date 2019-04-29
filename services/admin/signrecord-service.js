const moment = require('moment')
const DBHelper = require('../../common/db/db-helper')
const continuesignService = require('../../services/admin/continuesign-service')
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
const getUserSignRecord = async (params) => {
  let res = await DBHelper.getUserSignRecord(params)
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
  let result = { prizes: [], continueSign: {} }
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
            result.prizes = result.prizes.concat(p)
          }
          break
        case 2:
          let index = 1
          let yearsToday = moment().subtract(1, 'days').format('YYYY-MM-DD')
          let yearsToadyRecord = await DBHelper.getUserSignRecord({ uid: params.uid, scene_id: params.scene_id, created_at: yearsToday })
          if (yearsToadyRecord) { // 未断签
            // 签到新周期初始日期以及上一周期奖励日期
            let signRecord = await continuesignService.getContinueSignRcord({ scenesign_id: signon.scenesign_id, last_award_date: yearsToday })
            if (signRecord) {
              if (!(moment(signRecord.last_award_date).format('YYYY-MM-DD') === moment().subtract(1, 'days').format('YYYY-MM-DD'))) {
                index = moment().diff(moment(signRecord.first_sign_date), 'days') + 1
              }
            }
          }
          if ((index === 1) || (index === signon.cycle_text.number)) { // 新周期第一次签到日期 以及 上一期介素结束日
            index === 1 ? result.continueSign.first_sign_date = moment().format('YYYY-MM-DD') : result.continueSign.last_award_date = moment().format('YYYY-MM-DD')
            result.continueSign.scenesign_id = signon.scenesign_id
          }
          let ps = signon.prizes_text ? (signon.prizes_text.prizes[0] ? signon.prizes_text.prizes[0][index] ? signon.prizes_text.prizes[0][index] : [] : []) : []
          result.prizes = result.prizes.concat(ps)
          break
        case 3:
          let dates = ToolUtil.getPrizeIndex(signon.cycle_text.type, signon.start_at, signon.cycle_text.number) // 最新签到周期到今日时间段
          let nIndex = await DBHelper.getSumUserSignRcord({ uid: params.uid, scene_id: params.scene_id, start_at: dates.startAt, end_at: dates.endAt })
          nIndex = nIndex + 1
          let lps = signon.prizes_text ? (signon.prizes_text.prizes[0] ? signon.prizes_text.prizes[0][nIndex] ? signon.prizes_text.prizes[0][nIndex] : [] : []) : []
          result.prizes = result.prizes.concat(lps)
      }
    }
  }
  return result
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
        case 1: // 每日签到
          break
        case 2: // 连续签到
          signon.completeCount = 0
          // 非补签条件下的断签判断
          let yearsToday = moment().subtract(1, 'days').format('YYYY-MM-DD')
          let yearsToadyRecord = await DBHelper.getUserSignRecord({ uid: params.uid, scene_id: params.scene_id, created_at: yearsToday })
          if (yearsToadyRecord) { // 未断签
            // 签到新周期初始日期以及上一周期奖励日期
            let signRecord = await continuesignService.getContinueSignRcord({ scenesign_id: signon.scenesign_id, last_award_date: yearsToday })
            if (signRecord) {
              if (!(moment(signRecord.last_award_date).format('YYYY-MM-DD') === moment().subtract(1, 'days').format('YYYY-MM-DD'))) { // 昨天不是上一周期奖励日期
                signon.completeCount = moment().diff(moment(signRecord.first_sign_date), 'days')
              }
            }
          } else {
            let todayRecord = await DBHelper.getUserSignRecord({ uid: params.uid, scene_id: params.scene_id, created_at: moment().format('YYYY-MM-DD') })
            if (todayRecord) {
              signon.completeCount = 1
            }
          }
          // 可补签条件下的断签判断
          if (signon.extra_text && signon.extra_text.resign && signon.extra_text.resign.isResign === 2) { // 支持补签
            let signRecord = await continuesignService.getContinueSignRcord({ scenesign_id: signon.scenesign_id, last_award_date: yearsToday })
            if (signRecord) {
              let betDays = moment().subtract(1, 'days').diff(moment(signRecord.first_sign_date), 'days') + 1 //
              let dates = []
              for (let m = 1;m <= betDays;m++) {
                dates.push(moment().subtract(m, 'days').format('YYYY-MM-DD'))
              }
              let unmatchDates = ToolUtil.removeDuplication(dates, signon.extra_text.resign.resignDates) // 排除可补签日期后的日期
              let signRecordDays = await DBHelper.getSumUserSignRcord({ uid: params.uid, scene_id: params.scene_id, start_at: signRecord.first_sign_date, end_at: yearsToday }) // 新周期统计的签到次数
              // let allowDays = 
              console.log('@signRecordDays: ', signRecordDays)
              if (unmatchDates > signRecordDays) { // 排除可补签日期后， 签到次数少于排除后的日期，判断为断签
                console.log('断签')
              }
            }
          }
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
  getUserSignRecord,
  getSelfSignon
}
