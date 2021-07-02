'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FunctionsClient = require('./lib/FunctionsClient');

var _FunctionsClient2 = _interopRequireDefault(_FunctionsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function byWebhookId(organizationId, webhookId) {
  var result = await _FunctionsClient2.default.execute(process.env.GET_FLOW_CONTEXT_FUNCTION, { organizationId: organizationId, webhookId: webhookId });
  if (!result || !result.id) throw new Error('Cant validate the webhook');
  return result;
}

exports.default = {
  byWebhookId: byWebhookId
};