'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logConfig = { logLevel: 'error' };
var loggerInstance = null;

var configureLogger = function configureLogger(event, context) {
  logConfig.functionName = context.functionName;
  logConfig.functionVersion = context.functionVersion;
  logConfig.awsRequestId = context.awsRequestId;
  logConfig.logLevel = event.logLevel || process.env.LOG_LEVEL || 'error';
};

var logger = function logger() {
  return loggerInstance || buildLogger();
};

var buildLogger = function buildLogger(options) {
  var opts = Object.assign({}, logConfig, options);
  if (process.env.NODE_ENV === 'test') {
    loggerInstance = new _winston2.default.createLogger();
  } else {
    loggerInstance = new _winston2.default.createLogger({
      level: opts.logLevel,
      format: _winston.format.combine(_winston.format.timestamp({
        format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
      }), _winston.format.printf(function (info) {
        return info.timestamp + ' ' + opts.awsRequestId + ' ' + info.level.toUpperCase() + ': ' + (info.message ? info.message : '') + ' ' + (info.meta && Object.keys(info.meta).length ? ':' + JSON.stringify(info.meta) : '');
      })),
      transports: [new _winston2.default.transports.Console({
        handleExceptions: true,
        humanReadableUnhandledException: true,
        prettyPrint: true,
        json: false
      })],
      exitOnError: false
    });
  }
  return loggerInstance;
};

exports.default = {
  configureLogger: configureLogger,
  logger: logger
};