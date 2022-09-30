'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
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

var _assert = _interopRequireDefault(require('assert'));

var _helpers = require('./utils/helpers');

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

var QueryApi = /*#__PURE__*/ (function (_PublicService) {
  (0, _inherits2['default'])(QueryApi, _PublicService);

  var _super = _createSuper(QueryApi);

  function QueryApi() {
    var _this;

    var name =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : 'govQueryApi';
    (0, _classCallCheck2['default'])(this, QueryApi);
    _this = _super.call(this, name, ['web3']);
    _this.queryPromises = {};
    _this.staging = false;
    return _this;
  }

  (0, _createClass2['default'])(QueryApi, [
    {
      key: 'getQueryResponse',
      value: (function () {
        var _getQueryResponse = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee(
            serverUrl,
            query
          ) {
            var resp, _yield$resp$json, data;

            return _regenerator['default'].wrap(function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    _context.next = 2;
                    return fetch(serverUrl, {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        query: query,
                      }),
                    });

                  case 2:
                    resp = _context.sent;
                    _context.next = 5;
                    return resp.json();

                  case 5:
                    _yield$resp$json = _context.sent;
                    data = _yield$resp$json.data;
                    (0, _assert['default'])(
                      data,
                      'error fetching data from '.concat(serverUrl)
                    );
                    return _context.abrupt('return', data);

                  case 9:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee);
          })
        );

        function getQueryResponse(_x, _x2) {
          return _getQueryResponse.apply(this, arguments);
        }

        return getQueryResponse;
      })(),
    },
    {
      key: 'getQueryResponseMemoized',
      value: (function () {
        var _getQueryResponseMemoized = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee2(
            serverUrl,
            query
          ) {
            var cacheKey;
            return _regenerator['default'].wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      cacheKey = ''.concat(serverUrl, ';').concat(query);

                      if (!this.queryPromises[cacheKey]) {
                        _context2.next = 3;
                        break;
                      }

                      return _context2.abrupt(
                        'return',
                        this.queryPromises[cacheKey]
                      );

                    case 3:
                      this.queryPromises[cacheKey] = this.getQueryResponse(
                        serverUrl,
                        query
                      );
                      return _context2.abrupt(
                        'return',
                        this.queryPromises[cacheKey]
                      );

                    case 5:
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

        function getQueryResponseMemoized(_x3, _x4) {
          return _getQueryResponseMemoized.apply(this, arguments);
        }

        return getQueryResponseMemoized;
      })(),
    },
    {
      key: 'initialize',
      value: function initialize(settings) {
        if (settings.staging) {
          this.staging = true;
        }
      },
    },
    {
      key: 'connect',
      value: function connect() {
        var network = this.get('web3').network;
        this.serverUrl = this.staging
          ? (0, _helpers.netIdtoSpockUrlStaging)(network)
          : (0, _helpers.netIdtoSpockUrl)(network);
      },
    },
    {
      key: 'getAllWhitelistedPolls',
      value: (function () {
        var _getAllWhitelistedPolls = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee3() {
            var query, response;
            return _regenerator['default'].wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      query =
                        '{activePolls {\n      nodes {\n          creator\n          pollId\n          blockCreated\n          startDate\n          endDate\n          multiHash\n          url\n          active\n        }\n      }\n    }';
                      _context3.next = 3;
                      return this.getQueryResponse(this.serverUrl, query);

                    case 3:
                      response = _context3.sent;
                      return _context3.abrupt(
                        'return',
                        response.activePolls.nodes.map(function (p) {
                          p.startDate = new Date(p.startDate * 1000);
                          p.endDate = new Date(p.endDate * 1000);
                          return p;
                        })
                      );

                    case 5:
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

        function getAllWhitelistedPolls() {
          return _getAllWhitelistedPolls.apply(this, arguments);
        }

        return getAllWhitelistedPolls;
      })(),
    },
    {
      key: 'getNumUniqueVoters',
      value: (function () {
        var _getNumUniqueVoters = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee4(pollId) {
            var query, response;
            return _regenerator['default'].wrap(
              function _callee4$(_context4) {
                while (1) {
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      query = '{uniqueVoters(argPollId:'.concat(
                        pollId,
                        '){\n      nodes\n    }\n    }'
                      );
                      _context4.next = 3;
                      return this.getQueryResponse(this.serverUrl, query);

                    case 3:
                      response = _context4.sent;
                      return _context4.abrupt(
                        'return',
                        parseInt(response.uniqueVoters.nodes[0])
                      );

                    case 5:
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

        function getNumUniqueVoters(_x5) {
          return _getNumUniqueVoters.apply(this, arguments);
        }

        return getNumUniqueVoters;
      })(),
    },
    {
      key: 'getMkrWeight',
      value: (function () {
        var _getMkrWeight = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee5(
            address,
            unixTime
          ) {
            var query, response;
            return _regenerator['default'].wrap(
              function _callee5$(_context5) {
                while (1) {
                  switch ((_context5.prev = _context5.next)) {
                    case 0:
                      query =
                        '{totalMkrWeightProxyAndNoProxyByAddressAtTime(argAddress: "'
                          .concat(address, '", argUnix: ')
                          .concat(
                            unixTime,
                            '){\n      nodes {\n        address\n        weight\n      }\n    }\n    }'
                          );
                      _context5.next = 3;
                      return this.getQueryResponse(this.serverUrl, query);

                    case 3:
                      response = _context5.sent;

                      if (
                        response.totalMkrWeightProxyAndNoProxyByAddressAtTime
                          .nodes[0]
                      ) {
                        _context5.next = 6;
                        break;
                      }

                      return _context5.abrupt('return', 0);

                    case 6:
                      return _context5.abrupt(
                        'return',
                        response.totalMkrWeightProxyAndNoProxyByAddressAtTime
                          .nodes[0].weight
                      );

                    case 7:
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

        function getMkrWeight(_x6, _x7) {
          return _getMkrWeight.apply(this, arguments);
        }

        return getMkrWeight;
      })(),
    },
    {
      key: 'getOptionVotingFor',
      value: (function () {
        var _getOptionVotingFor = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee6(
            address,
            pollId
          ) {
            var query, response;
            return _regenerator['default'].wrap(
              function _callee6$(_context6) {
                while (1) {
                  switch ((_context6.prev = _context6.next)) {
                    case 0:
                      query = '{\n      currentVote(argAddress: "'
                        .concat(address, '", argPollId: ')
                        .concat(
                          pollId,
                          '){\n        nodes{\n          optionId\n        }\n      }\n    }'
                        );
                      _context6.next = 3;
                      return this.getQueryResponse(this.serverUrl, query);

                    case 3:
                      response = _context6.sent;

                      if (response.currentVote.nodes[0]) {
                        _context6.next = 6;
                        break;
                      }

                      return _context6.abrupt('return', null);

                    case 6:
                      return _context6.abrupt(
                        'return',
                        response.currentVote.nodes[0].optionId
                      );

                    case 7:
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

        function getOptionVotingFor(_x8, _x9) {
          return _getOptionVotingFor.apply(this, arguments);
        }

        return getOptionVotingFor;
      })(),
    },
    {
      key: 'getAllOptionsVotingFor',
      value: (function () {
        var _getAllOptionsVotingFor = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee7(
            address
          ) {
            var query, response;
            return _regenerator['default'].wrap(
              function _callee7$(_context7) {
                while (1) {
                  switch ((_context7.prev = _context7.next)) {
                    case 0:
                      query = '{\n      allCurrentVotes(argAddress: "'.concat(
                        address,
                        '"){\n        nodes{\n          pollId\n          optionId\n          optionIdRaw\n        }\n      }\n    }'
                      );
                      _context7.next = 3;
                      return this.getQueryResponse(this.serverUrl, query);

                    case 3:
                      response = _context7.sent;

                      if (response.allCurrentVotes.nodes[0]) {
                        _context7.next = 6;
                        break;
                      }

                      return _context7.abrupt('return', null);

                    case 6:
                      return _context7.abrupt(
                        'return',
                        response.allCurrentVotes.nodes
                      );

                    case 7:
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

        function getAllOptionsVotingFor(_x10) {
          return _getAllOptionsVotingFor.apply(this, arguments);
        }

        return getAllOptionsVotingFor;
      })(),
    },
    {
      key: 'getOptionVotingForRankedChoice',
      value: (function () {
        var _getOptionVotingForRankedChoice = (0,
        _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee8(
            address,
            pollId
          ) {
            var query, response;
            return _regenerator['default'].wrap(
              function _callee8$(_context8) {
                while (1) {
                  switch ((_context8.prev = _context8.next)) {
                    case 0:
                      query = '{\n      currentVoteRankedChoice(argAddress: "'
                        .concat(address, '", argPollId: ')
                        .concat(
                          pollId,
                          '){\n        nodes{\n          optionIdRaw\n        }\n      }\n    }'
                        );
                      _context8.next = 3;
                      return this.getQueryResponse(this.serverUrl, query);

                    case 3:
                      response = _context8.sent;

                      if (response.currentVoteRankedChoice.nodes[0]) {
                        _context8.next = 6;
                        break;
                      }

                      return _context8.abrupt('return', null);

                    case 6:
                      return _context8.abrupt(
                        'return',
                        response.currentVoteRankedChoice.nodes[0].optionIdRaw
                      );

                    case 7:
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

        function getOptionVotingForRankedChoice(_x11, _x12) {
          return _getOptionVotingForRankedChoice.apply(this, arguments);
        }

        return getOptionVotingForRankedChoice;
      })(),
    },
    {
      key: 'getBlockNumber',
      value: (function () {
        var _getBlockNumber = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee9(
            unixTime
          ) {
            var query, response;
            return _regenerator['default'].wrap(
              function _callee9$(_context9) {
                while (1) {
                  switch ((_context9.prev = _context9.next)) {
                    case 0:
                      query = '{\n      timeToBlockNumber(argUnix: '.concat(
                        unixTime,
                        '){\n      nodes\n    }\n    }'
                      );
                      _context9.next = 3;
                      return this.getQueryResponseMemoized(
                        this.serverUrl,
                        query
                      );

                    case 3:
                      response = _context9.sent;
                      return _context9.abrupt(
                        'return',
                        response.timeToBlockNumber.nodes[0]
                      );

                    case 5:
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

        function getBlockNumber(_x13) {
          return _getBlockNumber.apply(this, arguments);
        }

        return getBlockNumber;
      })(),
    },
    {
      key: 'getMkrSupportRankedChoice',
      value: (function () {
        var _getMkrSupportRankedChoice = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee10(
            pollId,
            unixTime
          ) {
            var query, response;
            return _regenerator['default'].wrap(
              function _callee10$(_context10) {
                while (1) {
                  switch ((_context10.prev = _context10.next)) {
                    case 0:
                      query = '{voteMkrWeightsAtTimeRankedChoice(argPollId: '
                        .concat(pollId, ', argUnix: ')
                        .concat(
                          unixTime,
                          '){\n      nodes{\n        optionIdRaw\n        mkrSupport\n      }\n    }\n    }'
                        );
                      _context10.next = 3;
                      return this.getQueryResponseMemoized(
                        this.serverUrl,
                        query
                      );

                    case 3:
                      response = _context10.sent;
                      return _context10.abrupt(
                        'return',
                        response.voteMkrWeightsAtTimeRankedChoice.nodes
                          .filter(function (vote) {
                            return vote.optionIdRaw !== '0';
                          })
                          .map(function (vote) {
                            var ballotBuffer = (0, _helpers.toBuffer)(
                              vote.optionIdRaw,
                              {
                                endian: 'little',
                              }
                            );
                            var ballot = (0, _helpers.paddedArray)(
                              32 - ballotBuffer.length,
                              ballotBuffer
                            );
                            return _objectSpread(
                              _objectSpread({}, vote),
                              {},
                              {
                                ballot: ballot,
                              }
                            );
                          })
                      );

                    case 5:
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

        function getMkrSupportRankedChoice(_x14, _x15) {
          return _getMkrSupportRankedChoice.apply(this, arguments);
        }

        return getMkrSupportRankedChoice;
      })(),
    },
    {
      key: 'getMkrSupport',
      value: (function () {
        var _getMkrSupport = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee11(
            pollId,
            unixTime
          ) {
            var query, response, weights, totalWeight;
            return _regenerator['default'].wrap(
              function _callee11$(_context11) {
                while (1) {
                  switch ((_context11.prev = _context11.next)) {
                    case 0:
                      query = '{voteOptionMkrWeightsAtTime(argPollId: '
                        .concat(pollId, ', argUnix: ')
                        .concat(
                          unixTime,
                          '){\n    nodes{\n      optionId\n      mkrSupport\n    }\n  }\n  }'
                        );
                      _context11.next = 3;
                      return this.getQueryResponseMemoized(
                        this.serverUrl,
                        query
                      );

                    case 3:
                      response = _context11.sent;
                      weights = response.voteOptionMkrWeightsAtTime.nodes; // We don't want to calculate votes for 0:abstain

                      weights = weights.filter(function (o) {
                        return o.optionId !== 0;
                      });
                      totalWeight = weights.reduce(function (acc, cur) {
                        var mkrSupport = isNaN(parseFloat(cur.mkrSupport))
                          ? 0
                          : parseFloat(cur.mkrSupport);
                        return acc + mkrSupport;
                      }, 0);
                      return _context11.abrupt(
                        'return',
                        weights.map(function (o) {
                          var mkrSupport = isNaN(parseFloat(o.mkrSupport))
                            ? 0
                            : parseFloat(o.mkrSupport);
                          o.mkrSupport = mkrSupport;
                          o.percentage = (100 * mkrSupport) / totalWeight;
                          return o;
                        })
                      );

                    case 8:
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

        function getMkrSupport(_x16, _x17) {
          return _getMkrSupport.apply(this, arguments);
        }

        return getMkrSupport;
      })(),
    },
    {
      key: 'getEsmJoins',
      value: (function () {
        var _getEsmJoins = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee12() {
            var query, response, joins;
            return _regenerator['default'].wrap(
              function _callee12$(_context12) {
                while (1) {
                  switch ((_context12.prev = _context12.next)) {
                    case 0:
                      query =
                        '{allEsmJoins {\n      nodes {\n        txFrom\n        txHash\n        joinAmount\n        blockTimestamp\n      }\n  }\n  }';
                      _context12.next = 3;
                      return this.getQueryResponse(this.serverUrl, query);

                    case 3:
                      response = _context12.sent;
                      joins = response.allEsmJoins.nodes;
                      return _context12.abrupt('return', joins);

                    case 6:
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

        function getEsmJoins() {
          return _getEsmJoins.apply(this, arguments);
        }

        return getEsmJoins;
      })(),
    },
  ]);
  return QueryApi;
})(_servicesCore.PublicService);

exports['default'] = QueryApi;
