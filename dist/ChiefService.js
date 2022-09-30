'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

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

var _assertThisInitialized2 = _interopRequireDefault(
  require('@babel/runtime/helpers/assertThisInitialized')
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

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
);

var _servicesCore = require('@makerdao/services-core');

var _constants = require('./utils/constants');

var _helpers = require('./utils/helpers');

var _ramda = require('ramda');

var _contractInfo = _interopRequireDefault(
  require('../contracts/contract-info.json')
);

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it =
    (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
  if (!it) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it['return'] != null) it['return']();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          (0, _defineProperty2['default'])(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
  }
  return target;
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

var chiefInfo = _contractInfo['default'].chief;

var ChiefService = /*#__PURE__*/ (function (_LocalService) {
  (0, _inherits2['default'])(ChiefService, _LocalService);

  var _super = _createSuper(ChiefService);

  function ChiefService() {
    var _this;

    var name =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : 'chief';
    (0, _classCallCheck2['default'])(this, ChiefService);
    _this = _super.call(this, name, ['smartContract', 'web3']);
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'paddedBytes32ToAddress',
      function (hex) {
        return hex.length > 42 ? '0x' + (0, _ramda.takeLast)(40, hex) : hex;
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'parseVoteAddressData',
      function (data) {
        var candidates = [];
        var addressData = data.substr(330);

        for (var i = 0; i < addressData.length / 64; i++) {
          var address = '0x'.concat(
            addressData.substring(i * 64 + 24, (i + 1) * 64)
          );
          if (address.length === 42) candidates.push(address);
        }

        return candidates;
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'memoizedGetSlateAddresses',
      (0, _ramda.memoizeWith)(_ramda.identity, _this.getSlateAddresses)
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'getDetailedLockLogs',
      /*#__PURE__*/ (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee() {
          var chiefAddress, web3Service, netId, networkName, locks;
          return _regenerator['default'].wrap(function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  chiefAddress = _this._chiefContract().address;
                  web3Service = _this.get('web3');
                  netId = web3Service.network;
                  networkName = (0, _helpers.netIdToName)(netId);
                  _context.next = 6;
                  return web3Service.getPastLogs({
                    fromBlock: chiefInfo.inception_block[networkName],
                    toBlock: 'latest',
                    address: chiefAddress,
                    topics: [chiefInfo.events.lock],
                  });

                case 6:
                  locks = _context.sent;
                  return _context.abrupt(
                    'return',
                    locks.map(function (lockLog) {
                      return {
                        blockNumber: lockLog.blockNumber,
                        sender: _this.paddedBytes32ToAddress(lockLog.topics[1]),
                        amount: _constants.MKR.wei(lockLog.topics[2]),
                      };
                    })
                  );

                case 8:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee);
        })
      )
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'getDetailedFreeLogs',
      /*#__PURE__*/ (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee2() {
          var chiefAddress, web3Service, netId, networkName, frees;
          return _regenerator['default'].wrap(function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  chiefAddress = _this._chiefContract().address;
                  web3Service = _this.get('web3');
                  netId = web3Service.network;
                  networkName = (0, _helpers.netIdToName)(netId);
                  _context2.next = 6;
                  return web3Service.getPastLogs({
                    fromBlock: chiefInfo.inception_block[networkName],
                    toBlock: 'latest',
                    address: chiefAddress,
                    topics: [chiefInfo.events.free],
                  });

                case 6:
                  frees = _context2.sent;
                  return _context2.abrupt(
                    'return',
                    frees.map(function (freeLog) {
                      return {
                        blockNumber: freeLog.blockNumber,
                        sender: _this.paddedBytes32ToAddress(freeLog.topics[1]),
                        amount: _constants.MKR.wei(freeLog.topics[2]),
                      };
                    })
                  );

                case 8:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2);
        })
      )
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'getLockLogs',
      /*#__PURE__*/ (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee3() {
          var chiefAddress, web3Service, netId, networkName, locks;
          return _regenerator['default'].wrap(function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  chiefAddress = _this._chiefContract().address;
                  web3Service = _this.get('web3');
                  netId = web3Service.network;
                  networkName = (0, _helpers.netIdToName)(netId);
                  _context3.next = 6;
                  return web3Service.getPastLogs({
                    fromBlock: chiefInfo.inception_block[networkName],
                    toBlock: 'latest',
                    address: chiefAddress,
                    topics: [chiefInfo.events.lock],
                  });

                case 6:
                  locks = _context3.sent;
                  return _context3.abrupt(
                    'return',
                    (0, _ramda.uniq)(
                      locks
                        .map(function (logObj) {
                          return (0, _ramda.nth)(1, logObj.topics);
                        })
                        .map(_this.paddedBytes32ToAddress)
                    )
                  );

                case 8:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3);
        })
      )
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'getVoteAddressLogs',
      /*#__PURE__*/ (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee4() {
          var chiefAddress, web3Service, netId, networkName, votes;
          return _regenerator['default'].wrap(function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  chiefAddress = _this._chiefContract().address;
                  web3Service = _this.get('web3');
                  netId = web3Service.network;
                  networkName = (0, _helpers.netIdToName)(netId);
                  _context4.next = 6;
                  return web3Service.getPastLogs({
                    fromBlock: chiefInfo.inception_block[networkName],
                    toBlock: 'latest',
                    address: chiefAddress,
                    topics: [chiefInfo.events.vote_addresses],
                  });

                case 6:
                  votes = _context4.sent;
                  return _context4.abrupt(
                    'return',
                    votes.map(function (voteLog) {
                      return {
                        blockNumber: voteLog.blockNumber,
                        sender: _this.paddedBytes32ToAddress(voteLog.topics[1]),
                        candidates: _this.parseVoteAddressData(voteLog.data),
                      };
                    })
                  );

                case 8:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4);
        })
      )
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'getVoteSlateLogs',
      /*#__PURE__*/ (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee5() {
          var chiefAddress, web3Service, netId, networkName, votes;
          return _regenerator['default'].wrap(function _callee5$(_context5) {
            while (1) {
              switch ((_context5.prev = _context5.next)) {
                case 0:
                  chiefAddress = _this._chiefContract().address;
                  web3Service = _this.get('web3');
                  netId = web3Service.network;
                  networkName = (0, _helpers.netIdToName)(netId);
                  _context5.next = 6;
                  return web3Service.getPastLogs({
                    fromBlock: chiefInfo.inception_block[networkName],
                    toBlock: 'latest',
                    address: chiefAddress,
                    topics: [chiefInfo.events.vote_slate],
                  });

                case 6:
                  votes = _context5.sent;
                  return _context5.abrupt(
                    'return',
                    votes.map(function (voteLog) {
                      return {
                        blockNumber: voteLog.blockNumber,
                        sender: _this.paddedBytes32ToAddress(voteLog.topics[1]),
                        slate: voteLog.topics[2],
                      };
                    })
                  );

                case 8:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5);
        })
      )
    );
    return _this;
  } // Writes -----------------------------------------------

  (0, _createClass2['default'])(ChiefService, [
    {
      key: 'etch',
      value: function etch(addresses) {
        return this._chiefContract().etch(addresses);
      },
    },
    {
      key: 'lift',
      value: function lift(address) {
        return this._chiefContract().lift(address);
      },
    },
    {
      key: 'vote',
      value: function vote(picks) {
        if (Array.isArray(picks))
          return this._chiefContract()['vote(address[])'](picks);
        return this._chiefContract()['vote(bytes32)'](picks);
      },
    },
    {
      key: 'lock',
      value: function lock(amt) {
        var unit =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : _constants.MKR;
        var mkrAmt = (0, _helpers.getCurrency)(amt, unit).toFixed('wei');
        return this._chiefContract().lock(mkrAmt);
      },
    },
    {
      key: 'free',
      value: function free(amt) {
        var unit =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : _constants.MKR;
        var mkrAmt = (0, _helpers.getCurrency)(amt, unit).toFixed('wei');
        return this._chiefContract().free(mkrAmt);
      }, // Reads ------------------------------------------------
    },
    {
      key: 'getVoteTally',
      value: (function () {
        var _getVoteTally = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee6() {
            var _this2 = this;

            var voters,
              withDeposits,
              withSlates,
              withVotes,
              voteTally,
              _iterator,
              _step,
              voteObj,
              _iterator2,
              _step2,
              vote,
              _loop,
              _i,
              _Object$entries;

            return _regenerator['default'].wrap(
              function _callee6$(_context6) {
                while (1) {
                  switch ((_context6.prev = _context6.next)) {
                    case 0:
                      _context6.next = 2;
                      return this.getLockLogs();

                    case 2:
                      voters = _context6.sent;
                      _context6.next = 5;
                      return Promise.all(
                        voters.map(function (voter) {
                          return _this2
                            .getNumDeposits(voter)
                            .then(function (deposits) {
                              return {
                                address: voter,
                                deposits: parseFloat(deposits),
                              };
                            });
                        })
                      );

                    case 5:
                      withDeposits = _context6.sent;
                      _context6.next = 8;
                      return Promise.all(
                        withDeposits.map(function (addressDeposit) {
                          return _this2
                            .getVotedSlate(addressDeposit.address)
                            .then(function (slate) {
                              return _objectSpread(
                                _objectSpread({}, addressDeposit),
                                {},
                                {
                                  slate: slate,
                                }
                              );
                            });
                        })
                      );

                    case 8:
                      withSlates = _context6.sent;
                      _context6.next = 11;
                      return Promise.all(
                        withSlates.map(function (withSlate) {
                          return _this2
                            .memoizedGetSlateAddresses(withSlate.slate)
                            .then(function (addresses) {
                              return _objectSpread(
                                _objectSpread({}, withSlate),
                                {},
                                {
                                  votes: addresses,
                                }
                              );
                            });
                        })
                      );

                    case 11:
                      withVotes = _context6.sent;
                      voteTally = {};
                      _iterator = _createForOfIteratorHelper(withVotes);

                      try {
                        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                          voteObj = _step.value;
                          _iterator2 = _createForOfIteratorHelper(
                            voteObj.votes
                          );

                          try {
                            for (
                              _iterator2.s();
                              !(_step2 = _iterator2.n()).done;

                            ) {
                              vote = _step2.value;
                              vote = vote.toLowerCase();

                              if (voteTally[vote] === undefined) {
                                voteTally[vote] = {
                                  approvals: voteObj.deposits,
                                  addresses: [
                                    {
                                      address: voteObj.address,
                                      deposits: voteObj.deposits,
                                    },
                                  ],
                                };
                              } else {
                                voteTally[vote].approvals += voteObj.deposits;
                                voteTally[vote].addresses.push({
                                  address: voteObj.address,
                                  deposits: voteObj.deposits,
                                });
                              }
                            }
                          } catch (err) {
                            _iterator2.e(err);
                          } finally {
                            _iterator2.f();
                          }
                        }
                      } catch (err) {
                        _iterator.e(err);
                      } finally {
                        _iterator.f();
                      }

                      _loop = function _loop() {
                        var _Object$entries$_i = (0,
                          _slicedToArray2['default'])(_Object$entries[_i], 2),
                          key = _Object$entries$_i[0],
                          value = _Object$entries$_i[1];

                        var sortedAddresses = value.addresses.sort(function (
                          a,
                          b
                        ) {
                          return b.deposits - a.deposits;
                        });
                        var approvals = voteTally[key].approvals;
                        var withPercentages = sortedAddresses.map(function (
                          shapedVoteObj
                        ) {
                          return _objectSpread(
                            _objectSpread({}, shapedVoteObj),
                            {},
                            {
                              percent: (
                                (shapedVoteObj.deposits * 100) /
                                approvals
                              ).toFixed(2),
                            }
                          );
                        });
                        voteTally[key] = withPercentages;
                      };

                      for (
                        _i = 0, _Object$entries = Object.entries(voteTally);
                        _i < _Object$entries.length;
                        _i++
                      ) {
                        _loop();
                      }

                      return _context6.abrupt('return', voteTally);

                    case 18:
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

        function getVoteTally() {
          return _getVoteTally.apply(this, arguments);
        }

        return getVoteTally;
      })(),
    },
    {
      key: 'getVotedSlate',
      value: function getVotedSlate(address) {
        return this._chiefContract().votes(address);
      },
    },
    {
      key: 'getNumDeposits',
      value: function getNumDeposits(address) {
        return this._chiefContract().deposits(address).then(_constants.MKR.wei);
      },
    },
    {
      key: 'getApprovalCount',
      value: function getApprovalCount(address) {
        return this._chiefContract()
          .approvals(address)
          .then(_constants.MKR.wei);
      },
    },
    {
      key: 'getHat',
      value: function getHat() {
        return this._chiefContract().hat();
      },
    },
    {
      key: 'getSlateAddresses',
      value: (function () {
        var _getSlateAddresses = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee7(
            slateHash
          ) {
            var i,
              _args7 = arguments;
            return _regenerator['default'].wrap(
              function _callee7$(_context7) {
                while (1) {
                  switch ((_context7.prev = _context7.next)) {
                    case 0:
                      i =
                        _args7.length > 1 && _args7[1] !== undefined
                          ? _args7[1]
                          : 0;
                      _context7.prev = 1;
                      _context7.next = 4;
                      return this._chiefContract().slates(slateHash, i);

                    case 4:
                      _context7.t1 = _context7.sent;
                      _context7.t0 = [_context7.t1];
                      _context7.next = 8;
                      return this.getSlateAddresses(slateHash, i + 1);

                    case 8:
                      _context7.t2 = _context7.sent;
                      return _context7.abrupt(
                        'return',
                        _context7.t0.concat.call(_context7.t0, _context7.t2)
                      );

                    case 12:
                      _context7.prev = 12;
                      _context7.t3 = _context7['catch'](1);
                      return _context7.abrupt('return', []);

                    case 15:
                    case 'end':
                      return _context7.stop();
                  }
                }
              },
              _callee7,
              this,
              [[1, 12]]
            );
          })
        );

        function getSlateAddresses(_x) {
          return _getSlateAddresses.apply(this, arguments);
        }

        return getSlateAddresses;
      })(),
    },
    {
      key: 'getLockAddressLogs',
      value: function getLockAddressLogs() {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
          _this3
            ._chiefContract({
              web3js: true,
            })
            .LogNote(
              {
                sig: '0xdd467064',
              },
              {
                fromBlock: 0,
                toBlock: 'latest',
              }
            )
            .get(function (error, result) {
              if (error) reject(error);
              resolve(
                result.map(function (log) {
                  return log.args.guy;
                })
              );
            });
        });
      },
    },
    {
      key: 'getEtchSlateLogs',
      value: function getEtchSlateLogs() {
        var _this4 = this;

        return new Promise(function (resolve, reject) {
          _this4
            ._chiefContract({
              web3js: true,
            })
            .Etch(
              {},
              {
                fromBlock: 0,
                toBlock: 'latest',
              }
            )
            .get(function (error, result) {
              if (error) reject(error);
              resolve(
                result.map(function (log) {
                  return log.args.slate;
                })
              );
            });
        });
      }, // Internal --------------------------------------------
    },
    {
      key: '_chiefContract',
      value: function _chiefContract() {
        var _ref6 =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : {},
          _ref6$web3js = _ref6.web3js,
          web3js = _ref6$web3js === void 0 ? false : _ref6$web3js;

        if (web3js)
          return this.get('smartContract').getWeb3ContractByName(
            _constants.CHIEF
          );
        return this.get('smartContract').getContractByName(_constants.CHIEF);
      },
    },
  ]);
  return ChiefService;
})(_servicesCore.LocalService);

exports['default'] = ChiefService;
