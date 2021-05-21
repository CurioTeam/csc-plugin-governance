'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
);

var _typeof2 = _interopRequireDefault(require('@babel/runtime/helpers/typeof'));

var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
);

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
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

var _constants = require('./utils/constants');

var _bignumber = _interopRequireDefault(require('bignumber.js'));

var _helpers = require('./utils/helpers');

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        (0, _defineProperty2['default'])(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
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

var POSTGRES_MAX_INT = 2147483647;
var MAX_ROUNDS = 32;

var GovPollingService = /*#__PURE__*/ (function (_PrivateService) {
  (0, _inherits2['default'])(GovPollingService, _PrivateService);

  var _super = _createSuper(GovPollingService);

  function GovPollingService() {
    var name =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : 'govPolling';
    (0, _classCallCheck2['default'])(this, GovPollingService);
    return _super.call(this, name, [
      'smartContract',
      'govQueryApi',
      'token',
      'chief',
      'voteProxy',
    ]);
  }

  (0, _createClass2['default'])(GovPollingService, [
    {
      key: 'createPoll',
      value: (function () {
        var _createPoll = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee(
            startDate,
            endDate,
            multiHash,
            url
          ) {
            var txo, pollId;
            return _regenerator['default'].wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      _context.next = 2;
                      return this._pollingContract().createPoll(
                        startDate,
                        endDate,
                        multiHash,
                        url
                      );

                    case 2:
                      txo = _context.sent;
                      pollId = parseInt(txo.receipt.logs[0].topics[2]);
                      return _context.abrupt('return', pollId);

                    case 5:
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

        function createPoll(_x, _x2, _x3, _x4) {
          return _createPoll.apply(this, arguments);
        }

        return createPoll;
      })(),
    },
    {
      key: 'withdrawPoll',
      value: function withdrawPoll(pollId) {
        return this._pollingContract().withdrawPoll(pollId);
      },
    },
    {
      key: 'vote',
      value: function vote(pollIds, options) {
        if (pollIds.length !== options.length || pollIds.length === 0)
          throw new Error(
            'poll id array and option id array must be the same length and have a non-zero number of elements'
          );
        var optionIds = options.map(function (option) {
          if (!Array.isArray(option)) return option;
          if (option.length === 1) return option[0];
          var byteArray = new Uint8Array(32);
          option.forEach(function (optionIndex, i) {
            byteArray[byteArray.length - i - 1] = optionIndex;
          });
          return (0, _helpers.fromBuffer)(byteArray).toString();
        });

        if (pollIds.length === 1) {
          var func = 'vote(uint256,uint256)';
          return this._batchPollingContract()[func](pollIds[0], optionIds[0]);
        } else {
          var _func = 'vote(uint256[],uint256[])';
          return this._batchPollingContract()[_func](pollIds, optionIds);
        }
      },
    },
    {
      key: 'voteRankedChoice',
      value: function voteRankedChoice(pollId, rankings) {
        var byteArray = new Uint8Array(32);
        rankings.forEach(function (optionIndex, i) {
          byteArray[byteArray.length - i - 1] = optionIndex + 1;
        });
        var optionId = (0, _helpers.fromBuffer)(byteArray).toString();
        return this._batchPollingContract().vote(pollId, optionId);
      },
    },
    {
      key: 'voteLegacy',
      value: function voteLegacy(pollId, optionId) {
        return this._pollingContract().vote(pollId, optionId);
      },
    },
    {
      key: 'voteRankedChoiceLegacy',
      value: function voteRankedChoiceLegacy(pollId, rankings) {
        var byteArray = new Uint8Array(32);
        rankings.forEach(function (optionIndex, i) {
          byteArray[byteArray.length - i - 1] = optionIndex + 1;
        });
        var optionId = (0, _helpers.fromBuffer)(byteArray).toString();
        return this._pollingContract().vote(pollId, optionId);
      },
    },
    {
      key: '_pollingContract',
      value: function _pollingContract() {
        return this.get('smartContract').getContractByName(_constants.POLLING);
      },
    },
    {
      key: '_batchPollingContract',
      value: function _batchPollingContract() {
        return this.get('smartContract').getContractByName(
          _constants.BATCH_POLLING
        );
      }, //--- cache queries
    },
    {
      key: 'getPoll',
      value: (function () {
        var _getPoll2 = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee2(
            multiHash
          ) {
            var polls, filtered, lowest, lowestPoll, i;
            return _regenerator['default'].wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      _context2.next = 2;
                      return this.getAllWhitelistedPolls();

                    case 2:
                      polls = _context2.sent;
                      filtered = polls.filter(function (p) {
                        return p.multiHash === multiHash;
                      });
                      lowest = Infinity;

                      for (i = 0; i < filtered.length; i++) {
                        if (filtered[i].pollId < lowest) {
                          lowest = filtered[i].pollId;
                          lowestPoll = filtered[i];
                        }
                      }

                      return _context2.abrupt('return', lowestPoll);

                    case 7:
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

        function getPoll(_x5) {
          return _getPoll2.apply(this, arguments);
        }

        return getPoll;
      })(),
    },
    {
      key: '_getPoll',
      value: (function () {
        var _getPoll3 = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee3(pollId) {
            var polls;
            return _regenerator['default'].wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      _context3.next = 2;
                      return this.getAllWhitelistedPolls();

                    case 2:
                      polls = _context3.sent;
                      return _context3.abrupt(
                        'return',
                        polls.find(function (p) {
                          return parseInt(p.pollId) === parseInt(pollId);
                        })
                      );

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

        function _getPoll(_x6) {
          return _getPoll3.apply(this, arguments);
        }

        return _getPoll;
      })(),
    },
    {
      key: 'getAllWhitelistedPolls',
      value: (function () {
        var _getAllWhitelistedPolls = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee4() {
            return _regenerator['default'].wrap(
              function _callee4$(_context4) {
                while (1) {
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      if (!this.polls) {
                        _context4.next = 2;
                        break;
                      }

                      return _context4.abrupt('return', this.polls);

                    case 2:
                      _context4.next = 4;
                      return this.get('govQueryApi').getAllWhitelistedPolls();

                    case 4:
                      this.polls = _context4.sent;
                      return _context4.abrupt('return', this.polls);

                    case 6:
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

        function getAllWhitelistedPolls() {
          return _getAllWhitelistedPolls.apply(this, arguments);
        }

        return getAllWhitelistedPolls;
      })(),
    },
    {
      key: 'refresh',
      value: function refresh() {
        this.polls = null;
      },
    },
    {
      key: 'getOptionVotingFor',
      value: (function () {
        var _getOptionVotingFor = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee5(
            address,
            pollId
          ) {
            return _regenerator['default'].wrap(
              function _callee5$(_context5) {
                while (1) {
                  switch ((_context5.prev = _context5.next)) {
                    case 0:
                      return _context5.abrupt(
                        'return',
                        this.get('govQueryApi').getOptionVotingFor(
                          address.toLowerCase(),
                          pollId
                        )
                      );

                    case 1:
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

        function getOptionVotingFor(_x7, _x8) {
          return _getOptionVotingFor.apply(this, arguments);
        }

        return getOptionVotingFor;
      })(),
    },
    {
      key: 'getOptionVotingForRankedChoice',
      value: (function () {
        var _getOptionVotingForRankedChoice = (0,
        _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee6(
            address,
            pollId
          ) {
            var optionIdRaw, ballotBuffer, ballot;
            return _regenerator['default'].wrap(
              function _callee6$(_context6) {
                while (1) {
                  switch ((_context6.prev = _context6.next)) {
                    case 0:
                      _context6.next = 2;
                      return this.get(
                        'govQueryApi'
                      ).getOptionVotingForRankedChoice(
                        address.toLowerCase(),
                        pollId
                      );

                    case 2:
                      optionIdRaw = _context6.sent;

                      if (optionIdRaw) {
                        _context6.next = 5;
                        break;
                      }

                      return _context6.abrupt('return', []);

                    case 5:
                      ballotBuffer = (0, _helpers.toBuffer)(optionIdRaw, {
                        endian: 'little',
                      });
                      ballot = (0, _helpers.paddedArray)(
                        32 - ballotBuffer.length,
                        ballotBuffer
                      );
                      return _context6.abrupt(
                        'return',
                        ballot.reverse().filter(function (choice) {
                          return choice !== 0 && choice !== '0';
                        })
                      );

                    case 8:
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

        function getOptionVotingForRankedChoice(_x9, _x10) {
          return _getOptionVotingForRankedChoice.apply(this, arguments);
        }

        return getOptionVotingForRankedChoice;
      })(),
    },
    {
      key: 'getAllOptionsVotingFor',
      value: (function () {
        var _getAllOptionsVotingFor = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee7(
            address
          ) {
            var options;
            return _regenerator['default'].wrap(
              function _callee7$(_context7) {
                while (1) {
                  switch ((_context7.prev = _context7.next)) {
                    case 0:
                      _context7.next = 2;
                      return this.get('govQueryApi').getAllOptionsVotingFor(
                        address.toLowerCase()
                      );

                    case 2:
                      options = _context7.sent;

                      if (options) {
                        _context7.next = 5;
                        break;
                      }

                      return _context7.abrupt('return', []);

                    case 5:
                      return _context7.abrupt(
                        'return',
                        options.map(function (o) {
                          var rankedChoiceOption = null;

                          if (o.optionIdRaw) {
                            var ballotBuffer = (0, _helpers.toBuffer)(
                              o.optionIdRaw,
                              {
                                endian: 'little',
                              }
                            );
                            var ballot = (0, _helpers.paddedArray)(
                              32 - ballotBuffer.length,
                              ballotBuffer
                            );
                            rankedChoiceOption = ballot
                              .reverse()
                              .filter(function (choice) {
                                return choice !== 0 && choice !== '0';
                              });
                          }

                          return {
                            pollId: o.pollId,
                            option: o.optionId,
                            rankedChoiceOption: rankedChoiceOption,
                          };
                        })
                      );

                    case 6:
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

        function getAllOptionsVotingFor(_x11) {
          return _getAllOptionsVotingFor.apply(this, arguments);
        }

        return getAllOptionsVotingFor;
      })(),
    },
    {
      key: 'getNumUniqueVoters',
      value: (function () {
        var _getNumUniqueVoters = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee8(pollId) {
            return _regenerator['default'].wrap(
              function _callee8$(_context8) {
                while (1) {
                  switch ((_context8.prev = _context8.next)) {
                    case 0:
                      return _context8.abrupt(
                        'return',
                        this.get('govQueryApi').getNumUniqueVoters(pollId)
                      );

                    case 1:
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

        function getNumUniqueVoters(_x12) {
          return _getNumUniqueVoters.apply(this, arguments);
        }

        return getNumUniqueVoters;
      })(),
    },
    {
      key: 'getMkrWeight',
      value: (function () {
        var _getMkrWeight = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee9(
            address
          ) {
            var weight;
            return _regenerator['default'].wrap(
              function _callee9$(_context9) {
                while (1) {
                  switch ((_context9.prev = _context9.next)) {
                    case 0:
                      _context9.next = 2;
                      return this.get('govQueryApi').getMkrWeight(
                        address.toLowerCase(),
                        POSTGRES_MAX_INT
                      );

                    case 2:
                      weight = _context9.sent;
                      return _context9.abrupt(
                        'return',
                        (0, _constants.MKR)(weight)
                      );

                    case 4:
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

        function getMkrWeight(_x13) {
          return _getMkrWeight.apply(this, arguments);
        }

        return getMkrWeight;
      })(),
    },
    {
      key: 'getMkrWeightFromChain',
      value: (function () {
        var _getMkrWeightFromChain = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee10(
            address
          ) {
            var _yield$this$get$getVo,
              hasProxy,
              voteProxy,
              balancePromises,
              otherAddress,
              balances,
              total;

            return _regenerator['default'].wrap(
              function _callee10$(_context10) {
                while (1) {
                  switch ((_context10.prev = _context10.next)) {
                    case 0:
                      _context10.next = 2;
                      return this.get('voteProxy').getVoteProxy(address);

                    case 2:
                      _yield$this$get$getVo = _context10.sent;
                      hasProxy = _yield$this$get$getVo.hasProxy;
                      voteProxy = _yield$this$get$getVo.voteProxy;
                      balancePromises = [
                        this.get('token')
                          .getToken(_constants.MKR)
                          .balanceOf(address),
                        this.get('chief').getNumDeposits(address),
                      ];

                      if (hasProxy) {
                        otherAddress =
                          address.toLowerCase() ===
                          voteProxy.getHotAddress().toLowerCase()
                            ? voteProxy.getColdAddress()
                            : voteProxy.getHotAddress();
                        balancePromises = balancePromises.concat([
                          this.get('token')
                            .getToken(_constants.MKR)
                            .balanceOf(otherAddress),
                          this.get('chief').getNumDeposits(otherAddress),
                          this.get('chief').getNumDeposits(
                            voteProxy.getProxyAddress()
                          ),
                        ]);
                      }

                      _context10.next = 9;
                      return Promise.all(balancePromises);

                    case 9:
                      balances = _context10.sent;
                      total = balances.reduce(function (total, num) {
                        return total.plus(num);
                      }, (0, _constants.MKR)(0));
                      return _context10.abrupt('return', {
                        mkrBalance: balances[0],
                        chiefBalance: balances[1],
                        linkedMkrBalance: hasProxy ? balances[2] : null,
                        linkedChiefBalance: hasProxy ? balances[3] : null,
                        proxyChiefBalance: hasProxy ? balances[4] : null,
                        total: total,
                      });

                    case 12:
                    case 'end':
                      return _context10.stop();
                  }
                }
              },
              _callee10,
              this
            );
          })
        );

        function getMkrWeightFromChain(_x14) {
          return _getMkrWeightFromChain.apply(this, arguments);
        }

        return getMkrWeightFromChain;
      })(),
    },
    {
      key: 'getMkrAmtVoted',
      value: (function () {
        var _getMkrAmtVoted = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee11(
            pollId
          ) {
            var _yield$this$_getPoll, endDate, endUnix, weights;

            return _regenerator['default'].wrap(
              function _callee11$(_context11) {
                while (1) {
                  switch ((_context11.prev = _context11.next)) {
                    case 0:
                      _context11.next = 2;
                      return this._getPoll(pollId);

                    case 2:
                      _yield$this$_getPoll = _context11.sent;
                      endDate = _yield$this$_getPoll.endDate;
                      endUnix = Math.floor(endDate / 1000);
                      _context11.next = 7;
                      return this.get('govQueryApi').getMkrSupport(
                        pollId,
                        endUnix
                      );

                    case 7:
                      weights = _context11.sent;
                      return _context11.abrupt(
                        'return',
                        (0, _constants.MKR)(
                          weights.reduce(function (acc, cur) {
                            return acc + cur.mkrSupport;
                          }, 0)
                        )
                      );

                    case 9:
                    case 'end':
                      return _context11.stop();
                  }
                }
              },
              _callee11,
              this
            );
          })
        );

        function getMkrAmtVoted(_x15) {
          return _getMkrAmtVoted.apply(this, arguments);
        }

        return getMkrAmtVoted;
      })(),
    },
    {
      key: 'getMkrAmtVotedRankedChoice',
      value: (function () {
        var _getMkrAmtVotedRankedChoice = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee12(
            pollId
          ) {
            var _yield$this$_getPoll2, endDate, endUnix, weights;

            return _regenerator['default'].wrap(
              function _callee12$(_context12) {
                while (1) {
                  switch ((_context12.prev = _context12.next)) {
                    case 0:
                      _context12.next = 2;
                      return this._getPoll(pollId);

                    case 2:
                      _yield$this$_getPoll2 = _context12.sent;
                      endDate = _yield$this$_getPoll2.endDate;
                      endUnix = Math.floor(endDate / 1000);
                      _context12.next = 7;
                      return this.get('govQueryApi').getMkrSupportRankedChoice(
                        pollId,
                        endUnix
                      );

                    case 7:
                      weights = _context12.sent;
                      return _context12.abrupt(
                        'return',
                        (0, _constants.MKR)(
                          weights.reduce(function (acc, cur) {
                            return acc + parseFloat(cur.mkrSupport);
                          }, 0)
                        )
                      );

                    case 9:
                    case 'end':
                      return _context12.stop();
                  }
                }
              },
              _callee12,
              this
            );
          })
        );

        function getMkrAmtVotedRankedChoice(_x16) {
          return _getMkrAmtVotedRankedChoice.apply(this, arguments);
        }

        return getMkrAmtVotedRankedChoice;
      })(),
    },
    {
      key: 'getTallyRankedChoiceIrv',
      value: (function () {
        var _getTallyRankedChoiceIrv = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee13(
            pollId
          ) {
            var _yield$this$_getPoll3,
              endDate,
              endUnix,
              votes,
              totalMkrParticipation,
              tally,
              defaultOptionObj,
              _loop,
              _ret;

            return _regenerator['default'].wrap(
              function _callee13$(_context13) {
                while (1) {
                  switch ((_context13.prev = _context13.next)) {
                    case 0:
                      _context13.next = 2;
                      return this._getPoll(pollId);

                    case 2:
                      _yield$this$_getPoll3 = _context13.sent;
                      endDate = _yield$this$_getPoll3.endDate;
                      endUnix = Math.floor(endDate / 1000);
                      _context13.next = 7;
                      return this.get('govQueryApi').getMkrSupportRankedChoice(
                        pollId,
                        endUnix
                      );

                    case 7:
                      votes = _context13.sent;
                      totalMkrParticipation = votes.reduce(function (acc, cur) {
                        return (0, _bignumber['default'])(
                          cur.mkrSupport || 0
                        ).plus(acc);
                      }, (0, _bignumber['default'])(0));
                      tally = {
                        rounds: 1,
                        winner: null,
                        totalMkrParticipation: totalMkrParticipation,
                        options: {},
                      };
                      defaultOptionObj = {
                        firstChoice: (0, _bignumber['default'])(0),
                        transfer: (0, _bignumber['default'])(0),
                        winner: false,
                        eliminated: false,
                      };

                      if (!(votes.length === 0)) {
                        _context13.next = 13;
                        break;
                      }

                      return _context13.abrupt('return', tally);

                    case 13:
                      // run the first round
                      votes.forEach(function (vote) {
                        vote.choice = vote.ballot.pop();
                        if (!tally.options[vote.choice])
                          tally.options[vote.choice] = _objectSpread(
                            {},
                            defaultOptionObj
                          );
                        tally.options[vote.choice].firstChoice = (0,
                        _bignumber['default'])(
                          tally.options[vote.choice].firstChoice
                        ).plus(vote.mkrSupport || 0);
                      }); // does any candidate have the majority after the first round?

                      Object.entries(tally.options).forEach(function (_ref) {
                        var _ref2 = (0, _slicedToArray2['default'])(_ref, 2),
                          option = _ref2[0],
                          firstChoice = _ref2[1].firstChoice;

                        if (firstChoice.gt(totalMkrParticipation.div(2)))
                          tally.winner = option;
                      }); // if so, we're done. Return the winner

                      if (!tally.winner) {
                        _context13.next = 18;
                        break;
                      }

                      tally.options[tally.winner].winner = true;
                      return _context13.abrupt('return', tally);

                    case 18:
                      _loop = function _loop() {
                        tally.rounds++; // eliminate the weakest candidate

                        var filteredOptions = Object.entries(
                          tally.options
                        ).filter(function (_ref3) {
                          var _ref4 = (0, _slicedToArray2['default'])(_ref3, 2),
                            optionDetails = _ref4[1];

                          return !optionDetails.eliminated;
                        });

                        var _filteredOptions$redu = filteredOptions.reduce(
                            function (prv, cur) {
                              var _prv = (0, _slicedToArray2['default'])(
                                  prv,
                                  2
                                ),
                                prvVotes = _prv[1];

                              var _cur = (0, _slicedToArray2['default'])(
                                  cur,
                                  2
                                ),
                                curVotes = _cur[1];

                              if (
                                curVotes.firstChoice
                                  .plus(curVotes.transfer)
                                  .lt(
                                    prvVotes.firstChoice.plus(prvVotes.transfer)
                                  )
                              )
                                return cur;
                              return prv;
                            }
                          ),
                          _filteredOptions$redu2 = (0,
                          _slicedToArray2['default'])(_filteredOptions$redu, 1),
                          optionToEliminate = _filteredOptions$redu2[0];

                        tally.options[optionToEliminate].eliminated = true; // a vote needs to be moved if...
                        // 1) it's currently for the eliminated candidate
                        // 2) there's another choice further down in the voter's preference list

                        var votesToBeMoved = votes
                          .map(function (vote, index) {
                            return _objectSpread(
                              _objectSpread({}, vote),
                              {},
                              {
                                index: index,
                              }
                            );
                          })
                          .filter(function (vote) {
                            return (
                              parseInt(vote.choice) ===
                              parseInt(optionToEliminate)
                            );
                          })
                          .filter(function (vote) {
                            return vote.ballot[vote.ballot.length - 1] !== 0;
                          }); // move votes to the next choice on their preference list

                        votesToBeMoved.forEach(function (vote) {
                          var prevChoice = votes[vote.index].choice;
                          votes[vote.index].choice = votes[
                            vote.index
                          ].ballot.pop();
                          if (!tally.options[votes[vote.index].choice])
                            tally.options[
                              votes[vote.index].choice
                            ] = _objectSpread({}, defaultOptionObj);
                          tally.options[votes[vote.index].choice].transfer = (0,
                          _bignumber['default'])(
                            tally.options[votes[vote.index].choice].transfer
                          ).plus(vote.mkrSupport || 0);
                          tally.options[prevChoice].transfer = (0,
                          _bignumber['default'])(
                            tally.options[prevChoice].transfer
                          ).minus(vote.mkrSupport || 0);
                        }); // look for a candidate with the majority

                        Object.entries(tally.options).forEach(function (_ref5) {
                          var _ref6 = (0, _slicedToArray2['default'])(_ref5, 2),
                            option = _ref6[0],
                            _ref6$ = _ref6[1],
                            firstChoice = _ref6$.firstChoice,
                            transfer = _ref6$.transfer;

                          if (
                            firstChoice
                              .plus(transfer)
                              .gt(totalMkrParticipation.div(2))
                          )
                            tally.winner = option;
                        }); //if there's no more rounds, or if there is one or fewer options that haven't been eliminated
                        // the winner is the option with the most votes

                        if (
                          (tally.rounds > MAX_ROUNDS && !tally.winner) ||
                          ((filteredOptions.length === 1 ||
                            filteredOptions.length === 0) &&
                            !tally.winner)
                        ) {
                          var max = (0, _bignumber['default'])(0);
                          var maxOption;
                          Object.entries(tally.options).forEach(function (
                            _ref7
                          ) {
                            var _ref8 = (0, _slicedToArray2['default'])(
                                _ref7,
                                2
                              ),
                              option = _ref8[0],
                              _ref8$ = _ref8[1],
                              firstChoice = _ref8$.firstChoice,
                              transfer = _ref8$.transfer;

                            if (firstChoice.plus(transfer).gt(max)) {
                              max = firstChoice.plus(transfer);
                              maxOption = option;
                            }
                          });
                          tally.winner = maxOption;
                        } // sanity checks

                        if (Object.keys(tally.options).length === 2) {
                          // dead tie. this seems super unlikely, but it should be here for completeness
                          // return the tally without declaring a winner
                          return {
                            v: tally,
                          };
                        }

                        if (Object.keys(tally.options).length === 1) {
                          // this shouldn't happen
                          throw new Error(
                            'Invalid ranked choice tally '.concat(tally.options)
                          );
                        } // if we couldn't find one, go for another round
                      };

                    case 19:
                      if (tally.winner) {
                        _context13.next = 25;
                        break;
                      }

                      _ret = _loop();

                      if (!((0, _typeof2['default'])(_ret) === 'object')) {
                        _context13.next = 23;
                        break;
                      }

                      return _context13.abrupt('return', _ret.v);

                    case 23:
                      _context13.next = 19;
                      break;

                    case 25:
                      tally.options[tally.winner].winner = true;
                      return _context13.abrupt('return', tally);

                    case 27:
                    case 'end':
                      return _context13.stop();
                  }
                }
              },
              _callee13,
              this
            );
          })
        );

        function getTallyRankedChoiceIrv(_x17) {
          return _getTallyRankedChoiceIrv.apply(this, arguments);
        }

        return getTallyRankedChoiceIrv;
      })(),
    },
    {
      key: 'getPercentageMkrVoted',
      value: (function () {
        var _getPercentageMkrVoted = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee14(
            pollId
          ) {
            var _yield$Promise$all, _yield$Promise$all2, voted, total;

            return _regenerator['default'].wrap(
              function _callee14$(_context14) {
                while (1) {
                  switch ((_context14.prev = _context14.next)) {
                    case 0:
                      _context14.next = 2;
                      return Promise.all([
                        this.getMkrAmtVoted(pollId),
                        this.get('token')
                          .getToken(_constants.MKR)
                          .totalSupply(),
                      ]);

                    case 2:
                      _yield$Promise$all = _context14.sent;
                      _yield$Promise$all2 = (0, _slicedToArray2['default'])(
                        _yield$Promise$all,
                        2
                      );
                      voted = _yield$Promise$all2[0];
                      total = _yield$Promise$all2[1];
                      return _context14.abrupt(
                        'return',
                        voted.div(total).times(100).toNumber()
                      );

                    case 7:
                    case 'end':
                      return _context14.stop();
                  }
                }
              },
              _callee14,
              this
            );
          })
        );

        function getPercentageMkrVoted(_x18) {
          return _getPercentageMkrVoted.apply(this, arguments);
        }

        return getPercentageMkrVoted;
      })(),
    },
    {
      key: 'getPercentageMkrVotedRankedChoice',
      value: (function () {
        var _getPercentageMkrVotedRankedChoice = (0,
        _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee15(
            pollId
          ) {
            var _yield$Promise$all3, _yield$Promise$all4, voted, total;

            return _regenerator['default'].wrap(
              function _callee15$(_context15) {
                while (1) {
                  switch ((_context15.prev = _context15.next)) {
                    case 0:
                      _context15.next = 2;
                      return Promise.all([
                        this.getMkrAmtVotedRankedChoice(pollId),
                        this.get('token')
                          .getToken(_constants.MKR)
                          .totalSupply(),
                      ]);

                    case 2:
                      _yield$Promise$all3 = _context15.sent;
                      _yield$Promise$all4 = (0, _slicedToArray2['default'])(
                        _yield$Promise$all3,
                        2
                      );
                      voted = _yield$Promise$all4[0];
                      total = _yield$Promise$all4[1];
                      return _context15.abrupt(
                        'return',
                        voted.div(total).times(100).toNumber()
                      );

                    case 7:
                    case 'end':
                      return _context15.stop();
                  }
                }
              },
              _callee15,
              this
            );
          })
        );

        function getPercentageMkrVotedRankedChoice(_x19) {
          return _getPercentageMkrVotedRankedChoice.apply(this, arguments);
        }

        return getPercentageMkrVotedRankedChoice;
      })(),
    },
    {
      key: 'getWinningProposal',
      value: (function () {
        var _getWinningProposal = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee16(
            pollId
          ) {
            var _yield$this$_getPoll4, endDate, endUnix, currentVotes, max, i;

            return _regenerator['default'].wrap(
              function _callee16$(_context16) {
                while (1) {
                  switch ((_context16.prev = _context16.next)) {
                    case 0:
                      _context16.next = 2;
                      return this._getPoll(pollId);

                    case 2:
                      _yield$this$_getPoll4 = _context16.sent;
                      endDate = _yield$this$_getPoll4.endDate;
                      endUnix = Math.floor(endDate / 1000);
                      _context16.next = 7;
                      return this.get('govQueryApi').getMkrSupport(
                        pollId,
                        endUnix
                      );

                    case 7:
                      currentVotes = _context16.sent;
                      max = currentVotes[0];

                      for (i = 1; i < currentVotes.length; i++) {
                        if (currentVotes[i].mkrSupport > max.mkrSupport) {
                          max = currentVotes[i];
                        }
                      }

                      return _context16.abrupt(
                        'return',
                        max ? max.optionId : 0
                      );

                    case 11:
                    case 'end':
                      return _context16.stop();
                  }
                }
              },
              _callee16,
              this
            );
          })
        );

        function getWinningProposal(_x20) {
          return _getWinningProposal.apply(this, arguments);
        }

        return getWinningProposal;
      })(), // --- cache queries for networks without Spock, e.g. the testchain
    },
    {
      key: 'getVoteLogs',
      value: (function () {
        var _getVoteLogs = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee17() {
            var fromBlock,
              toBlock,
              web3,
              _args17 = arguments;
            return _regenerator['default'].wrap(
              function _callee17$(_context17) {
                while (1) {
                  switch ((_context17.prev = _context17.next)) {
                    case 0:
                      fromBlock =
                        _args17.length > 0 && _args17[0] !== undefined
                          ? _args17[0]
                          : 0;
                      toBlock =
                        _args17.length > 1 && _args17[1] !== undefined
                          ? _args17[1]
                          : 'latest';
                      web3 = this.get('smartContract').get('web3');
                      return _context17.abrupt(
                        'return',
                        web3.getPastLogs({
                          address: this._batchPollingContract().address,
                          toBlock: toBlock,
                          fromBlock: fromBlock,
                        })
                      );

                    case 4:
                    case 'end':
                      return _context17.stop();
                  }
                }
              },
              _callee17,
              this
            );
          })
        );

        function getVoteLogs() {
          return _getVoteLogs.apply(this, arguments);
        }

        return getVoteLogs;
      })(),
    },
    {
      key: 'getCompletedPolls',
      value: (function () {
        var _getCompletedPolls = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee18(
            address
          ) {
            var _this = this;

            var polls, logs;
            return _regenerator['default'].wrap(
              function _callee18$(_context18) {
                while (1) {
                  switch ((_context18.prev = _context18.next)) {
                    case 0:
                      polls = [];
                      _context18.next = 3;
                      return this.getVoteLogs();

                    case 3:
                      logs = _context18.sent;
                      logs.map(function (log) {
                        if ('0x'.concat(log.topics[1].slice(-40)) === address) {
                          var option = parseInt(log.topics[3]);
                          var rankedChoiceOption = [];
                          if (option > 100)
                            rankedChoiceOption = _this._decodeRankedChoiceOptions(
                              log.topics[3]
                            );
                          polls.push({
                            pollId: parseInt(log.topics[2]),
                            option: option,
                            rankedChoiceOption: rankedChoiceOption,
                          });
                        }
                      });
                      return _context18.abrupt('return', polls);

                    case 6:
                    case 'end':
                      return _context18.stop();
                  }
                }
              },
              _callee18,
              this
            );
          })
        );

        function getCompletedPolls(_x21) {
          return _getCompletedPolls.apply(this, arguments);
        }

        return getCompletedPolls;
      })(),
    },
    {
      key: '_decodeRankedChoiceOptions',
      value: function _decodeRankedChoiceOptions(options) {
        var rankedChoiceOption = [];
        options = options.match(/.{1,2}/g).reverse();
        options.map(function (choice) {
          choice = parseInt(choice);
          if (choice > 0) rankedChoiceOption.push(choice);
        });
        return rankedChoiceOption;
      },
    },
  ]);
  return GovPollingService;
})(_servicesCore.PrivateService);

exports['default'] = GovPollingService;
