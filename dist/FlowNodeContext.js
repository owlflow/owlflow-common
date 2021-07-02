'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FunctionsClient = require('./lib/FunctionsClient');

var _FunctionsClient2 = _interopRequireDefault(_FunctionsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function byNodeId(flowId, id) {
  var result = await _FunctionsClient2.default.execute(process.env.GET_FLOW_NODE_CONTEXT_FUNCTION, { flowId: flowId, id: id });
  if (!result || !result.id) throw new Error('Cant validate the flow node');
  return result;
}

exports.default = {
  byNodeId: byNodeId
};