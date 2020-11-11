'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.fromBuffer = exports.toBuffer = exports.paddedArray = exports.getCurrency = exports.netIdtoSpockUrlStaging = exports.netIdtoSpockUrl = exports.netIdToName = void 0;

var _toConsumableArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toConsumableArray')
);

var _currency = require('@makerdao/currency');

var _bignumber = _interopRequireDefault(require('bignumber.js'));

var _constants = require('./constants');

/**
 * @desc get network name
 * @param  {Number|String} id
 * @return {String}
 */
var netIdToName = function netIdToName(id) {
  switch (parseInt(id, 10)) {
    case 1:
      return 'mainnet';

    case 42:
      return 'kovan';

    case 999:
      return 'ganache';

    default:
      return '';
  }
};

exports.netIdToName = netIdToName;

var netIdtoSpockUrl = function netIdtoSpockUrl(id) {
  switch (parseInt(id, 10)) {
    case 1:
      return _constants.MAINNET_URL;

    case 42:
      return _constants.KOVAN_URL;

    default:
      return _constants.STAGING_MAINNET_URL;
  }
};

exports.netIdtoSpockUrl = netIdtoSpockUrl;

var netIdtoSpockUrlStaging = function netIdtoSpockUrlStaging(id) {
  switch (parseInt(id, 10)) {
    case 1:
      return _constants.STAGING_MAINNET_URL;

    case 42:
      return _constants.STAGING_KOVAN_URL;

    default:
      return _constants.STAGING_MAINNET_URL;
  }
};

exports.netIdtoSpockUrlStaging = netIdtoSpockUrlStaging;
var getCurrency = (0, _currency.createGetCurrency)({
  MKR: _constants.MKR,
});
exports.getCurrency = getCurrency;

var paddedArray = function paddedArray(k, value) {
  var _Array$from$map;

  return (_Array$from$map = Array.from({
    length: k,
  }).map(function () {
    return 0;
  })).concat.apply(_Array$from$map, (0, _toConsumableArray2['default'])(value));
};

exports.paddedArray = paddedArray;

var toBuffer = function toBuffer(number, opts) {
  var buf;
  var len;
  var endian;
  var hex = new _bignumber['default'](number).toString(16);
  var size;
  var hx;

  if (!opts) {
    opts = {};
  }

  endian =
    {
      1: 'big',
      '-1': 'little',
    }[opts.endian] ||
    opts.endian ||
    'big';

  if (hex.charAt(0) === '-') {
    throw new Error('Converting negative numbers to Buffers not supported yet');
  }

  size = opts.size === 'auto' ? Math.ceil(hex.length / 2) : opts.size || 1;
  len = Math.ceil(hex.length / (2 * size)) * size;
  buf = Buffer.alloc(len); // Zero-pad the hex string so the chunks are all `size` long

  while (hex.length < 2 * len) {
    hex = '0'.concat(hex);
  }

  hx = hex.split(new RegExp('(.{'.concat(2 * size, '})'))).filter(function (s) {
    return s.length > 0;
  });
  hx.forEach(function (chunk, i) {
    for (var j = 0; j < size; j++) {
      var ix = i * size + (endian === 'big' ? j : size - j - 1);
      buf[ix] = parseInt(chunk.slice(j * 2, j * 2 + 2), 16);
    }
  });
  return buf;
};

exports.toBuffer = toBuffer;

var fromBuffer = function fromBuffer(buf, opts) {
  if (!opts) {
    opts = {};
  }

  var endian =
    {
      1: 'big',
      '-1': 'little',
    }[opts.endian] ||
    opts.endian ||
    'big';
  var size = opts.size === 'auto' ? Math.ceil(buf.length) : opts.size || 1;

  if (buf.length % size !== 0) {
    throw new RangeError(
      'Buffer length ('
        .concat(buf.length, ') must be a multiple of size (')
        .concat(size, ')')
    );
  }

  var hex = [];

  for (var i = 0; i < buf.length; i += size) {
    var chunk = [];

    for (var j = 0; j < size; j++) {
      chunk.push(buf[i + (endian === 'big' ? j : size - j - 1)]);
    }

    hex.push(
      chunk
        .map(function (c) {
          return (c < 16 ? '0' : '') + c.toString(16);
        })
        .join('')
    );
  }

  return new _bignumber['default'](hex.join(''), 16);
};

exports.fromBuffer = fromBuffer;
