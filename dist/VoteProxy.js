'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
);

var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
);

var VoteProxy = /*#__PURE__*/ (function () {
  function VoteProxy(_ref) {
    var voteProxyService = _ref.voteProxyService,
      proxyAddress = _ref.proxyAddress,
      coldAddress = _ref.coldAddress,
      hotAddress = _ref.hotAddress;
    (0, _classCallCheck2['default'])(this, VoteProxy);
    this._voteProxyService = voteProxyService;
    this._proxyAddress = proxyAddress;
    this._coldAddress = coldAddress;
    this._hotAddress = hotAddress;
  }

  (0, _createClass2['default'])(VoteProxy, [
    {
      key: 'getProxyAddress',
      value: function getProxyAddress() {
        return this._proxyAddress;
      },
    },
    {
      key: 'getColdAddress',
      value: function getColdAddress() {
        return this._coldAddress;
      },
    },
    {
      key: 'getHotAddress',
      value: function getHotAddress() {
        return this._hotAddress;
      },
    },
  ]);
  return VoteProxy;
})();

exports['default'] = VoteProxy;
var passthroughMethods = [
  'lock',
  'free',
  'voteExec',
  'getNumDeposits',
  'getVotedProposalAddresses',
];
Object.assign(
  VoteProxy.prototype,
  passthroughMethods.reduce(function (acc, name) {
    acc[name] = function () {
      var _this$_voteProxyServi;

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      return (_this$_voteProxyServi = this._voteProxyService)[name].apply(
        _this$_voteProxyServi,
        [this._proxyAddress].concat(args)
      );
    };

    return acc;
  }, {})
);
