'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.ZERO_ADDRESS =
  exports.VOTE_PROXY_FACTORY =
  exports.STAGING_MAINNET_URL =
  exports.STAGING_KOVAN_URL =
  exports.POLLING =
  exports.PAUSE =
  exports.MKR =
  exports.MAINNET_URL =
  exports.LOCAL_URL =
  exports.KOVAN_URL =
  exports.IOU =
  exports.ESM =
  exports.END =
  exports.CHIEF =
  exports.BATCH_POLLING =
    void 0;

var _currency = require('@makerdao/currency');

var MKR = (0, _currency.createCurrency)('MKR');
exports.MKR = MKR;
var IOU = (0, _currency.createCurrency)('IOU');
/* Contracts */

exports.IOU = IOU;
var VOTE_PROXY_FACTORY = 'VOTE_PROXY_FACTORY';
exports.VOTE_PROXY_FACTORY = VOTE_PROXY_FACTORY;
var POLLING = 'POLLING';
exports.POLLING = POLLING;
var BATCH_POLLING = 'BATCH_POLLING';
exports.BATCH_POLLING = BATCH_POLLING;
var CHIEF = 'CHIEF';
exports.CHIEF = CHIEF;
var ESM = 'ESM';
exports.ESM = ESM;
var END = 'END';
exports.END = END;
var PAUSE = 'PAUSE';
/* Addresses */

exports.PAUSE = PAUSE;
var ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
/* Spock URLs */

exports.ZERO_ADDRESS = ZERO_ADDRESS;
var LOCAL_URL = 'http://localhost:3001/v1';
exports.LOCAL_URL = LOCAL_URL;
var KOVAN_URL = 'https://vote-stablecoin.curioinvest.com/api/v1';
exports.KOVAN_URL = KOVAN_URL;
var MAINNET_URL = 'https://vote-stablecoin.curioinvest.com/api/v1';
exports.MAINNET_URL = MAINNET_URL;
var STAGING_KOVAN_URL = 'https://beta.vote-stablecoin.curioinvest.com/api/v1';
exports.STAGING_KOVAN_URL = STAGING_KOVAN_URL;
var STAGING_MAINNET_URL = 'https://beta.vote-stablecoin.curioinvest.com/api/v1';
exports.STAGING_MAINNET_URL = STAGING_MAINNET_URL;
