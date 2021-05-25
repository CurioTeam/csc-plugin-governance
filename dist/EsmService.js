'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

var _typeof = require('@babel/runtime/helpers/typeof');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
);

var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
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

var _applyDecoratedDescriptor2 = _interopRequireDefault(
  require('@babel/runtime/helpers/applyDecoratedDescriptor')
);

var _servicesCore = require('@makerdao/services-core');

var _constants = require('./utils/constants');

var _helpers = require('./utils/helpers');

var _tracksTransactions = _interopRequireWildcard(
  require('./utils/tracksTransactions')
);

var _dec, _dec2, _class;

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj['default'] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

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

var EsmService =
  ((_dec = (0, _tracksTransactions.tracksTransactionsWithOptions)({
    numArguments: 3,
  })),
  (_dec2 = (0, _tracksTransactions.tracksTransactionsWithOptions)({
    numArguments: 2,
  })),
  ((_class = /*#__PURE__*/ (function (_PrivateService) {
    (0, _inherits2['default'])(EsmService, _PrivateService);

    var _super = _createSuper(EsmService);

    function EsmService() {
      var name =
        arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : 'esm';
      (0, _classCallCheck2['default'])(this, EsmService);
      return _super.call(this, name, [
        'smartContract',
        'web3',
        'token',
        'allowance',
        'govQueryApi',
      ]);
    }

    (0, _createClass2['default'])(EsmService, [
      {
        key: 'thresholdAmount',
        value: (function () {
          var _thresholdAmount = (0, _asyncToGenerator2['default'])(
            /*#__PURE__*/ _regenerator['default'].mark(function _callee() {
              var min;
              return _regenerator['default'].wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        _context.next = 2;
                        return this._esmContract().min();

                      case 2:
                        min = _context.sent;
                        return _context.abrupt(
                          'return',
                          (0, _helpers.getCurrency)(
                            min,
                            _constants.MKR
                          ).shiftedBy(-18)
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

          function thresholdAmount() {
            return _thresholdAmount.apply(this, arguments);
          }

          return thresholdAmount;
        })(),
      },
      {
        key: 'fired',
        value: (function () {
          var _fired2 = (0, _asyncToGenerator2['default'])(
            /*#__PURE__*/ _regenerator['default'].mark(function _callee2() {
              var _fired;

              return _regenerator['default'].wrap(
                function _callee2$(_context2) {
                  while (1) {
                    switch ((_context2.prev = _context2.next)) {
                      case 0:
                        _context2.next = 2;
                        return this._esmContract().fired();

                      case 2:
                        _fired = _context2.sent;
                        return _context2.abrupt('return', _fired.eq(1));

                      case 4:
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

          function fired() {
            return _fired2.apply(this, arguments);
          }

          return fired;
        })(),
      },
      {
        key: 'emergencyShutdownActive',
        value: (function () {
          var _emergencyShutdownActive = (0, _asyncToGenerator2['default'])(
            /*#__PURE__*/ _regenerator['default'].mark(function _callee3() {
              var active;
              return _regenerator['default'].wrap(
                function _callee3$(_context3) {
                  while (1) {
                    switch ((_context3.prev = _context3.next)) {
                      case 0:
                        _context3.next = 2;
                        return this._endContract().live();

                      case 2:
                        active = _context3.sent;
                        return _context3.abrupt('return', active.eq(0));

                      case 4:
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

          function emergencyShutdownActive() {
            return _emergencyShutdownActive.apply(this, arguments);
          }

          return emergencyShutdownActive;
        })(),
      },
      {
        key: 'canFire',
        value: (function () {
          var _canFire = (0, _asyncToGenerator2['default'])(
            /*#__PURE__*/ _regenerator['default'].mark(function _callee4() {
              var _yield$Promise$all, _yield$Promise$all2, fired, live;

              return _regenerator['default'].wrap(
                function _callee4$(_context4) {
                  while (1) {
                    switch ((_context4.prev = _context4.next)) {
                      case 0:
                        _context4.next = 2;
                        return Promise.all([
                          this.fired(),
                          this.emergencyShutdownActive(),
                        ]);

                      case 2:
                        _yield$Promise$all = _context4.sent;
                        _yield$Promise$all2 = (0, _slicedToArray2['default'])(
                          _yield$Promise$all,
                          2
                        );
                        fired = _yield$Promise$all2[0];
                        live = _yield$Promise$all2[1];
                        return _context4.abrupt('return', !fired && !live);

                      case 7:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                },
                _callee4,
                this
              );
            })
          );

          function canFire() {
            return _canFire.apply(this, arguments);
          }

          return canFire;
        })(),
      },
      {
        key: 'getTotalStaked',
        value: (function () {
          var _getTotalStaked = (0, _asyncToGenerator2['default'])(
            /*#__PURE__*/ _regenerator['default'].mark(function _callee5() {
              var total;
              return _regenerator['default'].wrap(
                function _callee5$(_context5) {
                  while (1) {
                    switch ((_context5.prev = _context5.next)) {
                      case 0:
                        _context5.next = 2;
                        return this._esmContract().Sum();

                      case 2:
                        total = _context5.sent;
                        return _context5.abrupt(
                          'return',
                          (0, _helpers.getCurrency)(
                            total,
                            _constants.MKR
                          ).shiftedBy(-18)
                        );

                      case 4:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                },
                _callee5,
                this
              );
            })
          );

          function getTotalStaked() {
            return _getTotalStaked.apply(this, arguments);
          }

          return getTotalStaked;
        })(),
      },
      {
        key: 'getTotalStakedByAddress',
        value: (function () {
          var _getTotalStakedByAddress = (0, _asyncToGenerator2['default'])(
            /*#__PURE__*/ _regenerator['default'].mark(function _callee6() {
              var address,
                total,
                _args6 = arguments;
              return _regenerator['default'].wrap(
                function _callee6$(_context6) {
                  while (1) {
                    switch ((_context6.prev = _context6.next)) {
                      case 0:
                        address =
                          _args6.length > 0 && _args6[0] !== undefined
                            ? _args6[0]
                            : false;

                        if (!address) {
                          address = this.get('web3').currentAddress();
                        }

                        _context6.next = 4;
                        return this._esmContract().sum(address);

                      case 4:
                        total = _context6.sent;
                        return _context6.abrupt(
                          'return',
                          (0, _helpers.getCurrency)(
                            total,
                            _constants.MKR
                          ).shiftedBy(-18)
                        );

                      case 6:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                },
                _callee6,
                this
              );
            })
          );

          function getTotalStakedByAddress() {
            return _getTotalStakedByAddress.apply(this, arguments);
          }

          return getTotalStakedByAddress;
        })(),
      },
      {
        key: 'stake',
        value: (function () {
          var _stake = (0, _asyncToGenerator2['default'])(
            /*#__PURE__*/ _regenerator['default'].mark(function _callee7(
              amount
            ) {
              var skipChecks,
                _ref,
                promise,
                mkrAmount,
                _yield$Promise$all3,
                _yield$Promise$all4,
                fired,
                mkrBalance,
                _args7 = arguments;

              return _regenerator['default'].wrap(
                function _callee7$(_context7) {
                  while (1) {
                    switch ((_context7.prev = _context7.next)) {
                      case 0:
                        skipChecks =
                          _args7.length > 1 && _args7[1] !== undefined
                            ? _args7[1]
                            : false;
                        (_ref = _args7.length > 2 ? _args7[2] : undefined),
                          (promise = _ref.promise);
                        mkrAmount = (0, _helpers.getCurrency)(
                          amount,
                          _constants.MKR
                        );

                        if (skipChecks) {
                          _context7.next = 14;
                          break;
                        }

                        _context7.next = 6;
                        return Promise.all([
                          this.fired(),
                          this.get('token').getToken(_constants.MKR).balance(),
                        ]);

                      case 6:
                        _yield$Promise$all3 = _context7.sent;
                        _yield$Promise$all4 = (0, _slicedToArray2['default'])(
                          _yield$Promise$all3,
                          2
                        );
                        fired = _yield$Promise$all4[0];
                        mkrBalance = _yield$Promise$all4[1];

                        if (!fired) {
                          _context7.next = 12;
                          break;
                        }

                        throw new Error(
                          'cannot join when emergency shutdown has been fired'
                        );

                      case 12:
                        if (!mkrBalance.lt(mkrAmount)) {
                          _context7.next = 14;
                          break;
                        }

                        throw new Error(
                          'amount to join is greater than the user balance'
                        );

                      case 14:
                        return _context7.abrupt(
                          'return',
                          this._esmContract().join(mkrAmount.toFixed('wei'), {
                            promise: promise,
                          })
                        );

                      case 15:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                },
                _callee7,
                this
              );
            })
          );

          function stake(_x) {
            return _stake.apply(this, arguments);
          }

          return stake;
        })(),
      },
      {
        key: 'triggerEmergencyShutdown',
        value: (function () {
          var _triggerEmergencyShutdown = (0, _asyncToGenerator2['default'])(
            /*#__PURE__*/ _regenerator['default'].mark(function _callee8() {
              var skipChecks,
                _ref2,
                promise,
                _yield$Promise$all5,
                _yield$Promise$all6,
                thresholdAmount,
                totalStaked,
                canFire,
                _args8 = arguments;

              return _regenerator['default'].wrap(
                function _callee8$(_context8) {
                  while (1) {
                    switch ((_context8.prev = _context8.next)) {
                      case 0:
                        skipChecks =
                          _args8.length > 0 && _args8[0] !== undefined
                            ? _args8[0]
                            : false;
                        (_ref2 = _args8.length > 1 ? _args8[1] : undefined),
                          (promise = _ref2.promise);

                        if (skipChecks) {
                          _context8.next = 14;
                          break;
                        }

                        _context8.next = 5;
                        return Promise.all([
                          this.thresholdAmount(),
                          this.getTotalStaked(),
                          this.canFire(),
                        ]);

                      case 5:
                        _yield$Promise$all5 = _context8.sent;
                        _yield$Promise$all6 = (0, _slicedToArray2['default'])(
                          _yield$Promise$all5,
                          3
                        );
                        thresholdAmount = _yield$Promise$all6[0];
                        totalStaked = _yield$Promise$all6[1];
                        canFire = _yield$Promise$all6[2];

                        if (!totalStaked.lt(thresholdAmount)) {
                          _context8.next = 12;
                          break;
                        }

                        throw new Error(
                          'total amount of staked MKR has not reached the required threshold'
                        );

                      case 12:
                        if (canFire) {
                          _context8.next = 14;
                          break;
                        }

                        throw new Error(
                          'emergency shutdown has already been initiated'
                        );

                      case 14:
                        return _context8.abrupt(
                          'return',
                          this._esmContract().fire()
                        );

                      case 15:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                },
                _callee8,
                this
              );
            })
          );

          function triggerEmergencyShutdown() {
            return _triggerEmergencyShutdown.apply(this, arguments);
          }

          return triggerEmergencyShutdown;
        })(),
      },
      {
        key: 'getStakingHistory',
        value: (function () {
          var _getStakingHistory = (0, _asyncToGenerator2['default'])(
            /*#__PURE__*/ _regenerator['default'].mark(function _callee9() {
              var stakes, parsedStakes, sortedParsedStakes;
              return _regenerator['default'].wrap(
                function _callee9$(_context9) {
                  while (1) {
                    switch ((_context9.prev = _context9.next)) {
                      case 0:
                        _context9.next = 2;
                        return this.get('govQueryApi').getEsmJoins();

                      case 2:
                        stakes = _context9.sent;
                        parsedStakes = stakes.map(function (e) {
                          var transactionHash = e.txHash;
                          var senderAddress = e.txFrom;
                          var amount = (0, _constants.MKR)(e.joinAmount);
                          var time = new Date(e.blockTimestamp);
                          return {
                            transactionHash: transactionHash,
                            senderAddress: senderAddress,
                            amount: amount,
                            time: time,
                          };
                        });
                        sortedParsedStakes = parsedStakes.sort(function (a, b) {
                          //sort by date descending
                          return b.time - a.time;
                        });
                        return _context9.abrupt('return', sortedParsedStakes);

                      case 6:
                      case 'end':
                        return _context9.stop();
                    }
                  }
                },
                _callee9,
                this
              );
            })
          );

          function getStakingHistory() {
            return _getStakingHistory.apply(this, arguments);
          }

          return getStakingHistory;
        })(),
      },
      {
        key: '_esmContract',
        value: function _esmContract() {
          return this.get('smartContract').getContractByName(_constants.ESM);
        },
      },
      {
        key: '_endContract',
        value: function _endContract() {
          return this.get('smartContract').getContractByName(_constants.END);
        },
      },
    ]);
    return EsmService;
  })(_servicesCore.PrivateService)),
  ((0, _applyDecoratedDescriptor2['default'])(
    _class.prototype,
    'stake',
    [_dec],
    Object.getOwnPropertyDescriptor(_class.prototype, 'stake'),
    _class.prototype
  ),
  (0, _applyDecoratedDescriptor2['default'])(
    _class.prototype,
    'triggerEmergencyShutdown',
    [_dec2],
    Object.getOwnPropertyDescriptor(
      _class.prototype,
      'triggerEmergencyShutdown'
    ),
    _class.prototype
  )),
  _class));
exports['default'] = EsmService;
