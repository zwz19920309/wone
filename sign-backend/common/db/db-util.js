
/**
  * 条件查询数据列表
  * @method findAll
  * @param  {object} model - model对象
  * @param  {object} params - 查询参数
  * @param  {object} transaction - 事务
  * @param  {boolean} isLock - 锁
  * @return {object} sequelize执行结果
 */
let findAll = async (Model, params, transaction, isLock) => {
  transaction && (params.transaction = transaction)
  isLock && (params.lock = transaction.UPDATE.LOCK)
  let result = await Model.findAll(params)
  return result
}

/**
  * 根据id查找数据
  * @param  {object} model - model对象
  * @param  {string} id - 查询id
  * @return {object} sequelize执行结果
 */
let findById = async (Model, id) => {
  let result = await Model.findByPk(id)
  return result
}

/**
  * 条件查询数据列表
  * @method findAll
  * @param  {object} model - model对象
  * @param  {object} params - 查询参数
  * @param  {object} transaction - 事务
  * @param  {boolean} isLock - 锁
  * @return {object} sequelize执行结果
 */
let findOne = async (Model, params, transaction, isLock) => {
  transaction && (params.transaction = transaction)
  let result = await Model.findOne(params)
  return result
}

/**
  * 根据条件-删除
  * @param  {object} model - model对象
  * @param  {object} params
  * @param  {object} transaction - 事务
  * @return {object} sequelize执行结果
 */
let deleteByCons = async (Model, params, transaction) => {
  transaction && (params.transaction = transaction)
  let result = await Model.destroy(params).catch(err => {
    throw (err)
  })
  return result
}

/**
  * 条件查询数据列表以及统计数字
  * @method findAndCount
  * @param  {object} model - model对象
  * @param  {object} params - 查询参数
  * @param  {object} transaction - 事务
  * @param  {boolean} isLock - 锁
  * @return {object} sequelize执行结果
 */
const findAndCount = async (Model, params, attrs, transaction, isLock) => {
  transaction && (params.transaction = transaction)
  isLock && (params.lock = true)
  let result = await Model.findAndCount(params).catch(err => {
    throw (err)
  })
  return result
}

/**
  * 条件查询数据列表以及统计数字
  * @method findAndCount
  * @param  {object} model - model对象
  * @param  {object} params - 查询参数
  * @param  {object} transaction - 事务
  * @param  {boolean} isLock - 锁
  * @return {object} sequelize执行结果
 */
const findOrCreate = async (Model, params) => {
  let result = await Model.findOrCreate(params).catch(err => {
    throw (err)
  })
  return result
}

/**
  * 保存
  * @param  {object} model - model对象
  * @param  {object} params - 参数
  * @param  {object} transaction - 事务
  * @return {object} sequelize执行结果
 */
let save = async (Model, params, transaction) => {
  let result = await Model.create(params, { transaction: transaction })
  return result
}

/**
  * 查询所有-统计
  * @param  {object} params
  * @example {where: {name:'1'}}
  * @return {object} sequelize执行结果
 */
let count = async (Model, params) => {
  let result = await Model.count(params).catch(err => {
    throw (err);
  });
  return result;
};

let sum = async (Model, params, cons) => {
  let result = await Model.sum(params, cons).catch(err => {
    throw (err);
  });
  return result;
};





/**
  * 更新保存
  * @param  {object} params
  * @return {object} sequelize执行结果
 */
let change = async (Object, transaction) => {
  let result = await Object.save({transaction: transaction}).catch(err => {
    throw (err);
  });
  return result;
};




/**
  * 根据条件-更新
  * @param  {object} Model
  * @params {object} data // 更新数据
  * @params {object} cons // 更新条件
  * @return {object} sequelize执行结果
 */
let updateData = async (Model, data, cons, transaction) => {
  transaction ? cons.transaction = transaction : '';
  // transaction && (cons.lock = transaction.LOCK.UPDATE);
  let result = await Model.update(data, cons).catch(err => {
    throw (err);
  });
  return result;
};
/**
  * 统计
  * @param  {object} Model
  * @params {object} countCol // 统计的字段
  * @params {object} params // 返回的字段
  * @params {object} params // 统计的聚合
  * @return {object} sequelize执行结果
 */
let sumCons = async (Model, col, attrs, cons) => {
  let result = Model.sum(col,  {attributes: attrs, where: cons}).catch(err => {
    throw (err);
  });
  return result;
}

/**
  * 批量增加
  * @method bulkCreate
  * @param  {object} Model - model
  * @param  {object} params - 参数
  * @param  {object} transaction - 事务
  * @return {object} sequelize执行结果
 */
let bulkCreate = async (Model, params, transaction) => {
  let result = Model.bulkCreate(params, { transaction: transaction }).catch(err => {
    throw (err)
  })
  return result
}

/**
  * 实例自增
  * @method decrement
  * @param  {object} instance - model实例
  * @param  {object} paramsArr - 自增字段参数数组
  * @param  {number} number - 自增数值
  * @param  {object} transaction - 事务
  * @return {object} sequelize执行结果
 */
let increment = async (instance, paramsArr, number, transaction) => {
  let result = instance.increment(paramsArr, { by: number, transaction: transaction }).catch(err => {
    throw (err)
  })
  return result
}

/**
  * 实例自减
  * @method decrement
  * @param  {object} instance - model实例
  * @param  {object} paramsArr - 自减字段参数数组
  * @param  {number} number - 自减数值
  * @param  {object} transaction - 事务
  * @return {object} sequelize执行结果
 */
let decrement = async (instance, paramsArr, number, transaction) => {
  let result = instance.decrement(paramsArr, { by: number, transaction: transaction }).catch(err => {
    throw (err)
  })
  return result
}

module.exports = {
  findAll,
  findAndCount,
  findById,
  findOne,
  findOrCreate,
  count,
  deleteByCons,
  updateData,
  sumCons,
  save,
  sum,
  change,
  bulkCreate,
  increment,
  decrement
}
