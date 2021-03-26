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

var _DSSpell = _interopRequireDefault(
  require('../contracts/abis/DSSpell.json')
);

var _padStart = _interopRequireDefault(require('lodash/padStart'));

var _assert = _interopRequireDefault(require('assert'));

var _contractInfo = _interopRequireDefault(
  require('../contracts/contract-info.json')
);

var _helpers = require('./utils/helpers');

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

var pauseInfo = _contractInfo['default'].pause;

var SpellService = /*#__PURE__*/ (function (_PublicService) {
  (0, _inherits2['default'])(SpellService, _PublicService);

  var _super = _createSuper(SpellService);

  function SpellService() {
    var _this;

    var name =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : 'spell';
    (0, _classCallCheck2['default'])(this, SpellService);
    _this = _super.call(this, name, ['smartContract', 'web3']);
    _this.eta = {};
    _this.done = {};
    _this.action = {};
    _this.executionDate = {};
    _this.scheduledDate = {};
    return _this;
  }

  (0, _createClass2['default'])(SpellService, [
    {
      key: 'getDelayInSeconds',
      value: function getDelayInSeconds() {
        if (this.delay) return this.delay;
        this.delay = this._pauseContract().delay();
        return this.delay;
      },
    },
    {
      key: 'getEta',
      value: (function () {
        var _getEta = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee(
            spellAddress
          ) {
            var spell, eta;
            return _regenerator['default'].wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      if (!this.eta[spellAddress]) {
                        _context.next = 2;
                        break;
                      }

                      return _context.abrupt('return', this.eta[spellAddress]);

                    case 2:
                      spell = this.get(
                        'smartContract'
                      ).getContractByAddressAndAbi(
                        spellAddress,
                        _DSSpell['default']
                      );
                      _context.next = 5;
                      return spell.eta();

                    case 5:
                      eta = _context.sent;

                      if (eta.toNumber()) {
                        _context.next = 8;
                        break;
                      }

                      return _context.abrupt('return', undefined);

                    case 8:
                      this.eta[spellAddress] = new Date(eta.toNumber() * 1000);
                      return _context.abrupt('return', this.eta[spellAddress]);

                    case 10:
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

        function getEta(_x) {
          return _getEta.apply(this, arguments);
        }

        return getEta;
      })(),
    },
    {
      key: 'getScheduledDate',
      value: (function () {
        var _getScheduledDate = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee2(
            spellAddress
          ) {
            var eta,
              pauseAddress,
              web3Service,
              netId,
              networkName,
              paddedSpellAddress,
              _yield$web3Service$ge,
              _yield$web3Service$ge2,
              plotEvent,
              _yield$web3Service$ge3,
              timestamp;

            return _regenerator['default'].wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      if (!this.scheduledDate[spellAddress]) {
                        _context2.next = 2;
                        break;
                      }

                      return _context2.abrupt(
                        'return',
                        this.scheduledDate[spellAddress]
                      );

                    case 2:
                      _context2.next = 4;
                      return this.getEta(spellAddress);

                    case 4:
                      eta = _context2.sent;
                      (0, _assert['default'])(
                        eta,
                        'spell '.concat(spellAddress, ' has not been scheduled')
                      );
                      pauseAddress = this._pauseContract().address;
                      web3Service = this.get('web3');
                      netId = web3Service.network;
                      networkName = (0, _helpers.netIdToName)(netId);
                      paddedSpellAddress =
                        '0x' +
                        (0, _padStart['default'])(
                          spellAddress.replace(/^0x/, ''),
                          64,
                          '0'
                        );
                      _context2.next = 13;
                      return web3Service.getPastLogs({
                        fromBlock: pauseInfo.inception_block[networkName],
                        toBlock: 'latest',
                        address: pauseAddress,
                        topics: [pauseInfo.events.plot, paddedSpellAddress],
                      });

                    case 13:
                      _yield$web3Service$ge = _context2.sent;
                      _yield$web3Service$ge2 = (0, _slicedToArray2['default'])(
                        _yield$web3Service$ge,
                        1
                      );
                      plotEvent = _yield$web3Service$ge2[0];
                      _context2.next = 18;
                      return web3Service.getBlock(plotEvent.blockNumber);

                    case 18:
                      _yield$web3Service$ge3 = _context2.sent;
                      timestamp = _yield$web3Service$ge3.timestamp;
                      this.scheduledDate[spellAddress] = new Date(
                        timestamp * 1000
                      );
                      return _context2.abrupt(
                        'return',
                        this.scheduledDate[spellAddress]
                      );

                    case 22:
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

        function getScheduledDate(_x2) {
          return _getScheduledDate.apply(this, arguments);
        }

        return getScheduledDate;
      })(),
    },
    {
      key: 'getDone',
      value: (function () {
        var _getDone = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee3(
            spellAddress
          ) {
            var spell;
            return _regenerator['default'].wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      if (!this.done[spellAddress]) {
                        _context3.next = 2;
                        break;
                      }

                      return _context3.abrupt(
                        'return',
                        this.done[spellAddress]
                      );

                    case 2:
                      spell = this.get(
                        'smartContract'
                      ).getContractByAddressAndAbi(
                        spellAddress,
                        _DSSpell['default']
                      );
                      this.done[spellAddress] = spell.done();
                      return _context3.abrupt(
                        'return',
                        this.done[spellAddress]
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

        function getDone(_x3) {
          return _getDone.apply(this, arguments);
        }

        return getDone;
      })(),
    },
    {
      key: 'getAction',
      value: (function () {
        var _getAction = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee4(
            spellAddress
          ) {
            var spell;
            return _regenerator['default'].wrap(
              function _callee4$(_context4) {
                while (1) {
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      if (!this.action[spellAddress]) {
                        _context4.next = 2;
                        break;
                      }

                      return _context4.abrupt(
                        'return',
                        this.action[spellAddress]
                      );

                    case 2:
                      spell = this.get(
                        'smartContract'
                      ).getContractByAddressAndAbi(
                        spellAddress,
                        _DSSpell['default']
                      );
                      this.action[spellAddress] = spell.action();
                      return _context4.abrupt(
                        'return',
                        this.action[spellAddress]
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

        function getAction(_x4) {
          return _getAction.apply(this, arguments);
        }

        return getAction;
      })(),
    },
    {
      key: 'getExecutionDate',
      value: (function () {
        var _getExecutionDate = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee5(
            spellAddress
          ) {
            var done,
              pauseAddress,
              web3Service,
              netId,
              networkName,
              paddedSpellAddress,
              _yield$web3Service$ge4,
              _yield$web3Service$ge5,
              execEvent,
              _yield$web3Service$ge6,
              timestamp;

            return _regenerator['default'].wrap(
              function _callee5$(_context5) {
                while (1) {
                  switch ((_context5.prev = _context5.next)) {
                    case 0:
                      if (!this.executionDate[spellAddress]) {
                        _context5.next = 2;
                        break;
                      }

                      return _context5.abrupt(
                        'return',
                        this.executionDate[spellAddress]
                      );

                    case 2:
                      _context5.next = 4;
                      return this.getDone(spellAddress);

                    case 4:
                      done = _context5.sent;
                      (0, _assert['default'])(
                        done,
                        'spell '.concat(spellAddress, ' has not been executed')
                      );
                      pauseAddress = this._pauseContract().address;
                      web3Service = this.get('web3');
                      netId = web3Service.network;
                      networkName = (0, _helpers.netIdToName)(netId);
                      paddedSpellAddress =
                        '0x' +
                        (0, _padStart['default'])(
                          spellAddress.replace(/^0x/, ''),
                          64,
                          '0'
                        );
                      _context5.next = 13;
                      return web3Service.getPastLogs({
                        fromBlock: pauseInfo.inception_block[networkName],
                        toBlock: 'latest',
                        address: pauseAddress,
                        topics: [pauseInfo.events.exec, paddedSpellAddress],
                      });

                    case 13:
                      _yield$web3Service$ge4 = _context5.sent;
                      _yield$web3Service$ge5 = (0, _slicedToArray2['default'])(
                        _yield$web3Service$ge4,
                        1
                      );
                      execEvent = _yield$web3Service$ge5[0];
                      _context5.next = 18;
                      return web3Service.getBlock(execEvent.blockNumber);

                    case 18:
                      _yield$web3Service$ge6 = _context5.sent;
                      timestamp = _yield$web3Service$ge6.timestamp;
                      this.executionDate[spellAddress] = new Date(
                        timestamp * 1000
                      );
                      return _context5.abrupt(
                        'return',
                        this.executionDate[spellAddress]
                      );

                    case 22:
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

        function getExecutionDate(_x5) {
          return _getExecutionDate.apply(this, arguments);
        }

        return getExecutionDate;
      })(),
    },
    {
      key: 'refresh',
      value: function refresh() {
        this.delay = null;
        this.eta = {};
        this.done = {};
        this.executionDate = {};
        this.scheduledDate = {};
      },
    },
    {
      key: '_pauseContract',
      value: function _pauseContract() {
        return this.get('smartContract').getContractByName(_constants.PAUSE);
      },
    },
  ]);
  return SpellService;
})(_servicesCore.PublicService);

exports['default'] = SpellService;
