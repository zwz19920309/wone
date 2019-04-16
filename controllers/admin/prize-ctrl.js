const Sequelize = require('sequelize')
const HttpResult = require('../../common/http/http-result')
const prizeService = require('../../services/admin/prize-service')
const Op = Sequelize.Op

// 获取奖品类表
const getPrizeList = async (ctx) => {
  let { page, pageSize } = ctx.request.body
  let pageInfo = { page: page || 1, pageSize: pageSize || 10 }
  let { count, rows } = await prizeService.getPrizeList(pageInfo)
  console.log('@getprizeList:--------- ')
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: rows, total: count }, 'SUCCESS')
}

// 增加奖品
const addPrize = async (ctx) => {
  let { desc, name } = ctx.request.body
  let prize = await prizeService.addPrize({ name: name, desc: desc })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, prize, 'SUCCESS')
}

// 删除奖品
const deletePrize = async (ctx) => {
  let { id } = ctx.request.body
  let result = await prizeService.deletePrize({ id: id })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { res: result }, 'SUCCESS')
}

// 批量删除奖品
const bulkDeletePrize = async (ctx) => {
  let { ids } = ctx.request.body
  let result = await prizeService.deletePrize({ id: { [Op.in]: ids } })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { res: result }, 'SUCCESS')
}

module.exports = {
  getPrizeList,
  addPrize,
  deletePrize,
  bulkDeletePrize
}
