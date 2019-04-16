const mysql = require('mysql2/promise')
require('./env')
const DataDb = mysql.createPool({
  host: process.env['SIGN_IP'],
  user: process.env['SIGN_USER'],
  password: process.env['SIGN_PASS'],
  database: process.env['SIGN_DATABASE'],
  dateStrings: true
})
class DBHelper {
  static async getCheckInTypeList () {
    let [rows] = await DataDb.query('SELECT id, type, name FROM checkin_type')
    return rows
  }
  static async findOneCheckInType (id) {
    let [rows] = await DataDb.query('SELECT id, type, name FROM checkin_type WHERE id = ?', [id])
    return rows
  }

  static async getDateTypeList () {
    let [rows] = await DataDb.query('SELECT id, type, name FROM date_type')
    return rows
  }

  static async getDateTypeByType (params) {
    let [rows] = await DataDb.query('SELECT id, type, name FROM date_type where type = ? limit 1', [ params.type ])
    return rows
  }

  static async getDateTypeListByTypes (typeIds) {
    let sql = 'SELECT id, type, name FROM date_type where type in (?)'
    let [rows] = await DataDb.query(sql, [typeIds])
    return rows
  }

  static async findOneDateType (id) {
    let [rows] = await DataDb.query('SELECT id, type, name FROM date_type WHERE id = ?', [id])
    return rows
  }
  static async saveDateType (type, name) {
    let [rows] = await DataDb.query('insert into date_type(type, name) values (?,?)', [type, name])
    return rows
  }

  static async deleteDateType (params) {
    let [rows] = await DataDb.query('delete from datetype where id = ?', [params.id])
    return rows
  }

  static async getSceneList (params) {
    let [rows] = await DataDb.query('SELECT id, name, note, createdAt FROM scene limit ?, ?', [(params.page - 1) * params.pageSize, params.pageSize])
    let total = await DataDb.query('SELECT count(*) as total FROM scene')
    return { total: total[0][0].total, rows: rows }
  }

  static async findOneScene (id) {
    let [rows] = await DataDb.query('SELECT id, type, name FROM scene WHERE id = ?', [id])
    return rows
  }
  static async saveScene (params) {
    let [rows] = await DataDb.query('insert into scene(name, note) values (?,?)', [params.name, params.note])
    return rows
  }

  static async deleteScene (params) {
    let [rows] = await DataDb.query('delete from scene where id = ?', [params.id])
    return rows
  }

  static async getSignonList (params) {
    let [rows] = await DataDb.query('SELECT a.id as id, a.name as name, cycle_text, prizes_text, b.name as checktypename, b.type as checktypetype, rule_desc, start_at, end_at, checkintype_id  FROM signon a left join checkin_type b on a.checkintype_id = b.id  limit ?, ?', [(params.page - 1) * params.pageSize, params.pageSize])
    let total = await DataDb.query('SELECT count(*) as total FROM signon')
    return { total: total[0][0].total, rows: rows }
  }

  static async getSignonListInId (params) {
    let sql = 'SELECT a.id as id, a.name as name, cycle_text, prizes_text, b.name as checktypename, b.type as checktypetype, rule_desc, start_at, end_at, checkintype_id  FROM signon a left join checkin_type b on a.checkintype_id = b.id  where a.id in (select signon_id from scene_sign where scene_id = ?)'
    let [rows] = await DataDb.query(sql, params.sceneId)
    return { rows: rows }
  }

  static async getSignonListNotInId (params) {
    let sql = 'SELECT a.id as id, a.name as name, cycle_text, prizes_text, b.name as checktypename, b.type as checktypetype, rule_desc, start_at, end_at, checkintype_id  FROM signon a left join checkin_type b on a.checkintype_id = b.id  where a.id not in (select signon_id from scene_sign where scene_id = ?)'
    let [rows] = await DataDb.query(sql, params.sceneId)
    return { rows: rows }
  }

  static async addSignon (params) {
    let [rows] = await DataDb.query('insert into signon (name, rule_desc, start_at, end_at, checkintype_id, cycle_text) values (?, ?, ?, ?, ?, ?)', [params.name, params.rule_desc, params.start_at, params.end_at, params.checkintype_id, params.cycle_text])
    return rows
  }

  static async updateSignonPrizes (params, cons) {
    let [rows] = await DataDb.query('update signon set prizes_text = ? where id = ?', [params.prizes_text, cons.id])
    return rows
  }

  static async deleteSignon (params) {
    let sql = 'delete FROM signon where id in (?)'
    let [rows] = await DataDb.query(sql, [params.ids])
    return rows
  }

  static async getSignonById (params) {
    let [rows] = await DataDb.query('SELECT a.id as id, a.name as name, cycle_text, prizes_text, b.name as checktypename, b.type as checktypetype, rule_desc, start_at, end_at, checkintype_id  FROM signon a left join checkin_type b on a.checkintype_id = b.id where a.id = ? limit 1', [params.id])
    return rows[0]
  }

  static async getPrizeList (params) {
    let [rows] = await DataDb.query('SELECT id, name, note from prize  limit ?, ?', [(params.page - 1) * params.pageSize, params.pageSize])
    let total = await DataDb.query('SELECT count(*) as total FROM prize')
    return { total: total[0][0].total, rows: rows }
  }

  static async getPrizeListNotInId (prizesId) {
    let sql = 'select id, name, note FROM prize where id not in (?)'
    let [rows] = await DataDb.query(sql, [prizesId])
    return { rows: rows }
  }

  static async getPrizeListInId (prizesId) {
    let sql = 'select id, name, note FROM prize where id in (?)'
    let [rows] = await DataDb.query(sql, [prizesId])
    return { rows: rows }
  }

  static async savePrize (params) {
    let [rows] = await DataDb.query('insert into prize (name, note) values (?,?)', [params.name, params.note])
    return rows
  }

  static async detelePrize (params) {
    let [rows] = await DataDb.query('delete from prize where id = ?', [params.id])
    return rows
  }

  static async updatePrize (params, cons) {
    let [rows] = await DataDb.query('update prize set name = ?, note = ? where id = ?', [params.name, params.note, cons.id])
    return rows
  }

  static async bulkSaveSceneSign (params) {
    let [rows] = await DataDb.query('INSERT INTO scene_sign(`scene_id`,`signon_id`) VALUES ?', [params])
    return rows
  }

  static async bulkDekleteSceneSign (params) {
    let sql = 'DELETE FROM scene_sign where signon_id in (?) and scene_id = ?'
    let [rows] = await DataDb.query(sql, [params.signonIds, params.sceneId])
    return rows
  }
}

module.exports = DBHelper
