const config = require('../../config/config')
const removeDuplication = (arr1, arr2) => {
  let c = []
  arr1.forEach((item) => {
    if (arr2.indexOf(item) === -1) c.push(item)
  })
  return c
}

const attributeCount = (obj) => {
  var count = 0
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      count++
    }
  }
  return count
}
//  prefixImgUrl (ele) {

const prefixImgUrl = (imgs) => {
  if (imgs instanceof Array) {
    imgs.forEach(img => {
      img.icon = config.base + '/' + img.icon
    })
  } else {
    imgs.icon = config.base + '/' + imgs.icon
  }
}
module.exports = {
  removeDuplication,
  attributeCount,
  prefixImgUrl
}
