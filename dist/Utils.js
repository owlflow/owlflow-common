'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var asyncForEach = async function asyncForEach(array, cb) {
  for (var index = 0; index < array.length; index++) {
    await cb(array[index], index, array);
  }
};

function flattenObject(obj, res) {
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (obj instanceof Array) {
    obj.forEach(function (item, i) {
      flattenObject(item, res, prefix + '__' + i);
    });
  } else if (obj instanceof Object) {
    for (var property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        flattenObject(obj[property], res, prefix + '_' + property);
      }
    }
  } else if (['string', 'boolean', 'number'].includes(typeof obj === 'undefined' ? 'undefined' : _typeof(obj))) {
    res[prefix] = obj;
  } else if (obj === null) {
    res[prefix] = null;
  } else {
    console.log('flattenObject else condition', typeof obj === 'undefined' ? 'undefined' : _typeof(obj), obj, prefix);
  }

  return res;
}

module.exports = {
  asyncForEach: asyncForEach,
  flattenObject: flattenObject
};