const userList = async (ctx) => {
  console.log('@userList:--------- ')
  ctx.body = 'this is a users/userList response'
}

module.exports = {
  userList
}
