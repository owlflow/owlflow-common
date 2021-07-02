'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _awsSdk = require('aws-sdk');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lambdaClient = new _awsSdk.Lambda({ region: process.env.SERVERLESS_REGION });

var FunctionsClient = function () {
  function FunctionsClient() {
    _classCallCheck(this, FunctionsClient);
  }

  _createClass(FunctionsClient, null, [{
    key: 'execute',
    value: function execute(functionName) {
      var _this = this;

      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var inovkationType = options.async ? 'Event' : 'RequestResponse';
      var params = {
        Payload: JSON.stringify(payload),
        FunctionName: functionName,
        InvocationType: inovkationType
      };
      return this.client().invoke(params).promise().then(function (result) {
        return _this._handleResponse(result);
      });
    }
  }, {
    key: '_handleResponse',
    value: function _handleResponse(lambdaResult) {
      return this._successfulAWSCall(lambdaResult) ? this._parseResults(lambdaResult) : Promise.reject(lambdaResult);
    }
  }, {
    key: '_parseResults',
    value: function _parseResults(lambdaResult) {
      if (this._successfulFunctionResult(lambdaResult)) {
        return Promise.resolve(JSON.parse(lambdaResult.Payload || '{}'));
      }
      var err = this._parseFunctionError(lambdaResult.Payload);
      return Promise.reject(err);
    }
  }, {
    key: '_parseFunctionError',
    value: function _parseFunctionError(payload) {
      var parsedPayload = JSON.parse(payload);
      try {
        return JSON.parse(parsedPayload.errorMessage);
      } catch (e) {
        return parsedPayload;
      }
    }
  }, {
    key: '_successfulFunctionResult',
    value: function _successfulFunctionResult(lambdaResult) {
      return !lambdaResult.FunctionError;
    }
  }, {
    key: '_successfulAWSCall',
    value: function _successfulAWSCall(lambdaResult) {
      var validStatusCodes = [200, 202];
      return validStatusCodes.includes(lambdaResult.StatusCode);
    }
  }, {
    key: 'client',
    value: function client() {
      return lambdaClient;
    }
  }]);

  return FunctionsClient;
}();

exports.default = FunctionsClient;