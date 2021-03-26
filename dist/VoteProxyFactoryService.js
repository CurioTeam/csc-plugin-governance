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

var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits')
);

var _possibleConstructorReturn2 = _interopRequireDefault(
  require('@babel/runtime/helpers/possibleConstructorReturn')
);

var _getPrototypeOf2 = _interopRequireDefault(
  require('@babel/runtime/helpers/getPrototypeOf')
);

var _servicesCore = require('@makerdao/services-core');

var _constants = require('./utils/constants');

var _ApproveLinkTransaction = _interopRequireDefault(
  require('./ApproveLinkTransaction')
);

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2['default'])(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2['default'])(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return (0, _possibleConstructorReturn2['default'])(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return true;
  } catch (e) {
    return false;
  }
}

var VoteProxyFactoryService = /*#__PURE__*/ (function (_LocalService) {
  (0, _inherits2['default'])(VoteProxyFactoryService, _LocalService);

  var _super = _createSuper(VoteProxyFactoryService);

  function VoteProxyFactoryService() {
    var name =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : 'voteProxyFactory';
    (0, _classCallCheck2['default'])(this, VoteProxyFactoryService);
    return _super.call(this, name, [
      'smartContract',
      'voteProxy',
      'transactionManager',
    ]);
  }

  (0, _createClass2['default'])(VoteProxyFactoryService, [
    {
      key: 'initiateLink',
      value: function initiateLink(hotAddress) {
        return this._proxyFactoryContract().initiateLink(hotAddress);
      },
    },
    {
      key: 'approveLink',
      value: function approveLink(coldAddress) {
        var tx = new _ApproveLinkTransaction['default'](
          this._proxyFactoryContract(),
          this.get('transactionManager')
        );
        return tx.build('approveLink', [coldAddress]);
      },
    },
    {
      key: 'breakLink',
      value: function breakLink() {
        return this._proxyFactoryContract().breakLink();
      },
    },
    {
      key: 'getVoteProxy',
      value: function getVoteProxy(address) {
        return this.get('voteProxy').getVoteProxy(address);
      },
    },
    {
      key: '_proxyFactoryContract',
      value: function _proxyFactoryContract() {
        return this.get('smartContract').getContractByName(
          _constants.VOTE_PROXY_FACTORY
        );
      },
    },
  ]);
  return VoteProxyFactoryService;
})(_servicesCore.LocalService);

exports['default'] = VoteProxyFactoryService;
