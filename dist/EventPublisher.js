'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _awsSdk = require('aws-sdk');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eventBridge = new _awsSdk.EventBridge({ region: process.env.SERVERLESS_REGION });

var EventPublisher = function () {
  function EventPublisher() {
    _classCallCheck(this, EventPublisher);
  }

  _createClass(EventPublisher, null, [{
    key: 'execute',
    value: function execute() {
      var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return eventBridge.putEvents(payload).promise();
    }
  }]);

  return EventPublisher;
}();

exports.default = EventPublisher;