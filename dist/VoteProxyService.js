'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
);

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
);

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
);

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
);

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

var _VoteProxy2 = _interopRequireDefault(require('./VoteProxy'));

var _constants = require('./utils/constants');

var _helpers = require('./utils/helpers');

var _VoteProxy3 = _interopRequireDefault(
  require('../contracts/abis/VoteProxy.json')
);

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function () {
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
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

var VoteProxyService = /*#__PURE__*/ (function (_LocalService) {
  (0, _inherits2['default'])(VoteProxyService, _LocalService);

  var _super = _createSuper(VoteProxyService);

  function VoteProxyService() {
    var name =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : 'voteProxy';
    (0, _classCallCheck2['default'])(this, VoteProxyService);
    return _super.call(this, name, ['smartContract', 'chief']);
  } // Writes -----------------------------------------------

  (0, _createClass2['default'])(VoteProxyService, [
    {
      key: 'lock',
      value: function lock(proxyAddress, amt) {
        var unit =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : _constants.MKR;
        var mkrAmt = (0, _helpers.getCurrency)(amt, unit).toFixed('wei');
        return this._proxyContract(proxyAddress).lock(mkrAmt);
      },
    },
    {
      key: 'free',
      value: function free(proxyAddress, amt) {
        var unit =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : _constants.MKR;
        var mkrAmt = (0, _helpers.getCurrency)(amt, unit).toFixed('wei');
        return this._proxyContract(proxyAddress).free(mkrAmt);
      },
    },
    {
      key: 'freeAll',
      value: function freeAll(proxyAddress) {
        return this._proxyContract(proxyAddress).freeAll();
      },
    },
    {
      key: 'voteExec',
      value: function voteExec(proxyAddress, picks) {
        if (Array.isArray(picks))
          return this._proxyContract(proxyAddress)['vote(address[])'](picks);
        return this._proxyContract(proxyAddress)['vote(bytes32)'](picks);
      }, // Reads ------------------------------------------------
    },
    {
      key: 'getVotedProposalAddresses',
      value: (function () {
        var _getVotedProposalAddresses = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee(
            proxyAddress
          ) {
            var _slate;

            return _regenerator['default'].wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      _context.next = 2;
                      return this.get('chief').getVotedSlate(proxyAddress);

                    case 2:
                      _slate = _context.sent;
                      return _context.abrupt(
                        'return',
                        this.get('chief').getSlateAddresses(_slate)
                      );

                    case 4:
                    case 'end':
                      return _context.stop();
                  }
                }
              },
              _callee,
              this
            );
          })
        );

        function getVotedProposalAddresses(_x) {
          return _getVotedProposalAddresses.apply(this, arguments);
        }

        return getVotedProposalAddresses;
      })(),
    },
    {
      key: 'getVoteProxy',
      value: (function () {
        var _getVoteProxy = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee2(
            addressToCheck
          ) {
            var _VoteProxy;

            var _yield$this$_getProxy,
              hasProxy,
              role,
              proxyAddress,
              otherRole,
              otherAddress;

            return _regenerator['default'].wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      _context2.next = 2;
                      return this._getProxyStatus(addressToCheck);

                    case 2:
                      _yield$this$_getProxy = _context2.sent;
                      hasProxy = _yield$this$_getProxy.hasProxy;
                      role = _yield$this$_getProxy.role;
                      proxyAddress = _yield$this$_getProxy.address;

                      if (hasProxy) {
                        _context2.next = 8;
                        break;
                      }

                      return _context2.abrupt('return', {
                        hasProxy: hasProxy,
                        voteProxy: null,
                      });

                    case 8:
                      otherRole = role === 'hot' ? 'cold' : 'hot';
                      _context2.next = 11;
                      return this._getAddressOfRole(proxyAddress, otherRole);

                    case 11:
                      otherAddress = _context2.sent;
                      return _context2.abrupt('return', {
                        hasProxy: hasProxy,
                        voteProxy: new _VoteProxy2['default'](
                          ((_VoteProxy = {
                            voteProxyService: this,
                            proxyAddress: proxyAddress,
                          }),
                          (0, _defineProperty2['default'])(
                            _VoteProxy,
                            ''.concat(role, 'Address'),
                            addressToCheck
                          ),
                          (0, _defineProperty2['default'])(
                            _VoteProxy,
                            ''.concat(otherRole, 'Address'),
                            otherAddress
                          ),
                          _VoteProxy)
                        ),
                      });

                    case 13:
                    case 'end':
                      return _context2.stop();
                  }
                }
              },
              _callee2,
              this
            );
          })
        );

        function getVoteProxy(_x2) {
          return _getVoteProxy.apply(this, arguments);
        }

        return getVoteProxy;
      })(), // Internal --------------------------------------------
    },
    {
      key: '_proxyContract',
      value: function _proxyContract(address) {
        return this.get('smartContract').getContractByAddressAndAbi(
          address,
          _VoteProxy3['default']
        );
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
    {
      key: '_getProxyStatus',
      value: (function () {
        var _getProxyStatus2 = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee3(
            address
          ) {
            var _yield$Promise$all,
              _yield$Promise$all2,
              proxyAddressCold,
              proxyAddressHot;

            return _regenerator['default'].wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      _context3.next = 2;
                      return Promise.all([
                        this._proxyFactoryContract().coldMap(address),
                        this._proxyFactoryContract().hotMap(address),
                      ]);

                    case 2:
                      _yield$Promise$all = _context3.sent;
                      _yield$Promise$all2 = (0, _slicedToArray2['default'])(
                        _yield$Promise$all,
                        2
                      );
                      proxyAddressCold = _yield$Promise$all2[0];
                      proxyAddressHot = _yield$Promise$all2[1];

                      if (!(proxyAddressCold !== _constants.ZERO_ADDRESS)) {
                        _context3.next = 8;
                        break;
                      }

                      return _context3.abrupt('return', {
                        role: 'cold',
                        address: proxyAddressCold,
                        hasProxy: true,
                      });

                    case 8:
                      if (!(proxyAddressHot !== _constants.ZERO_ADDRESS)) {
                        _context3.next = 10;
                        break;
                      }

                      return _context3.abrupt('return', {
                        role: 'hot',
                        address: proxyAddressHot,
                        hasProxy: true,
                      });

                    case 10:
                      return _context3.abrupt('return', {
                        role: null,
                        address: '',
                        hasProxy: false,
                      });

                    case 11:
                    case 'end':
                      return _context3.stop();
                  }
                }
              },
              _callee3,
              this
            );
          })
        );

        function _getProxyStatus(_x3) {
          return _getProxyStatus2.apply(this, arguments);
        }

        return _getProxyStatus;
      })(),
    },
    {
      key: '_getAddressOfRole',
      value: function _getAddressOfRole(proxyAddress, role) {
        if (role === 'hot') return this._proxyContract(proxyAddress).hot();
        else if (role === 'cold')
          return this._proxyContract(proxyAddress).cold();
        return null;
      },
    },
  ]);
  return VoteProxyService;
})(_servicesCore.LocalService); // add a few Chief Service methods to the Vote Proxy Service

exports['default'] = VoteProxyService;
Object.assign(
  VoteProxyService.prototype,
  ['getVotedSlate', 'getNumDeposits'].reduce(function (acc, name) {
    acc[name] = function () {
      var _this$get;

      return (_this$get = this.get('chief'))[name].apply(_this$get, arguments);
    };

    return acc;
  }, {})
);
