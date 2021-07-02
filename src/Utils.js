const asyncForEach = async (array, cb) => {
  for (let index = 0; index < array.length; index++) {
    await cb(array[index], index, array)
  }
}

function flattenObject (obj, res, prefix = '') {
  if (obj instanceof Array) {
    obj.forEach(function (item, i) {
      flattenObject(item, res, prefix + '__' + i)
    })
  } else if (obj instanceof Object) {
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        flattenObject(obj[property], res, prefix + '_' + property)
      }
    }
  } else if (['string', 'boolean', 'number'].includes(typeof obj)) {
    res[prefix] = obj
  } else if (obj === null) {
    res[prefix] = null
  } else {
    console.log('flattenObject else condition', typeof obj, obj, prefix)
  }

  return res
}

module.exports = {
  asyncForEach,
  flattenObject
}
