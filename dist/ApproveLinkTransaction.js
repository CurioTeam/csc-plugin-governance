'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
);

var _toConsumableArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toConsumableArray')
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

var ApproveLinkTransaction = /*#__PURE__*/ (function () {
  function ApproveLinkTransaction(contract, transactionManager) {
    (0, _classCallCheck2['default'])(this, ApproveLinkTransaction);
    this._contract = contract;
    this._txMgr = transactionManager;
  }

  (0, _createClass2['default'])(ApproveLinkTransaction, [
    {
      key: 'fees',
      get: function get() {
        return this._txMgr.getTransaction(this.promise).fees();
      },
    },
    {
      key: 'timeStamp',
      get: function get() {
        return this._txMgr.getTransaction(this.promise).timeStamp();
      },
    },
    {
      key: 'timeStampSubmitted',
      get: function get() {
        return this._txMgr.getTransaction(this.promise).timeStampSubmitted();
      },
    },
    {
      key: 'build',
      value: function build(method, args) {
        var _this = this;

        var promise = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee() {
            var _this$_contract;

            var txo;
            return _regenerator['default'].wrap(function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    _context.next = 2;
                    return 0;

                  case 2:
                    _context.next = 4;
                    return (_this$_contract = _this._contract)[method].apply(
                      _this$_contract,
                      [].concat((0, _toConsumableArray2['default'])(args), [
                        {
                          promise: promise,
                        },
                      ])
                    );

                  case 4:
                    txo = _context.sent;

                    _this._parseLogs(txo.receipt.logs);

                    return _context.abrupt('return', _this);

                  case 7:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee);
          })
        )();
        this.promise = promise;
        return promise;
      },
    },
    {
      key: '_parseLogs',
      value: function _parseLogs(logs) {
        var LinkConfirmed = this._contract['interface'].events.LinkConfirmed;

        var web3 = this._txMgr.get('web3')._web3;

        var topic = web3.utils.keccak256(
          web3.utils.toHex(LinkConfirmed.signature)
        );
        var receiptEvent = logs.filter(
          function (e) {
            return e.topics[0].toLowerCase() === topic.toLowerCase();
          } //filter for LinkConfirmed events
        );
        var parsedLog = LinkConfirmed.parse(
          receiptEvent[0].topics,
          receiptEvent[0].data
        );
        this.proxyAddress = parsedLog['voteProxy'];
      },
    },
  ]);
  return ApproveLinkTransaction;
})();

exports['default'] = ApproveLinkTransaction;
