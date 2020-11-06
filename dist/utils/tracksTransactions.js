'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.tracksTransactionsWithOptions = tracksTransactionsWithOptions;
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

var _typeof2 = _interopRequireDefault(require('@babel/runtime/helpers/typeof'));

var _times = _interopRequireDefault(require('lodash/times'));

// FIXME this is a duplicate of the file in the main dai.js source -- it should
// be moved to a utility library or something, but for now, this is the simplest
// way to avoid any issues with importing

/*

The default export is a decorator definition.

If a function is decorated with `@tracksTransactions`, it should expect its last
argument to be an object with a key named `promise`. It should pass that
`promise` argument along as a key in the last argument to any non-constant
function calls it makes to a smart contract (i.e. an instance returned from the
getContract method in SmartContractService), or any calls it makes to other
functions that will eventually call such smart contract functions.

This allows TransactionManager to let users input a promise and attach lifecycle
callbacks to all transactions that were created in the course of executing that
promise.

@tracksTransactions is only necessary when the function is async. If the
function returns a contract call and does not make any async calls before that,
then the async keyword can be removed, and it just needs to have an `options`
argument that it passes to its contract call.

If you need to apply this to a function that has any arguments with default
values, use `@tracksTransactionsWithOptions({ numArguments })` instead, where
`numArguments` is the total number of arguments to the function, including the
last object which contains a key named `promise`.

*/
var tracksTransactions = tracksTransactionsWithOptions({});
var _default = tracksTransactions;
exports['default'] = _default;

function tracksTransactionsWithOptions(_ref) {
  var numArguments = _ref.numArguments;
  return function (target, name, descriptor) {
    var original = descriptor.value;
    var correctArgsLength = numArguments || original.length;

    descriptor.value = function () {
      var _this = this;

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      var last = args[args.length - 1];
      var options;

      if (
        (0, _typeof2['default'])(last) === 'object' &&
        last !== null &&
        last.constructor === Object
      ) {
        args = args.slice(0, args.length - 1);
        options = last;
      } else {
        options = {};
      }

      var promise = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee() {
          var newArgs;
          return _regenerator['default'].wrap(function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.next = 2;
                  return 0;

                case 2:
                  // if there's already a promise, reuse it instead of setting this one--
                  // this allows the function we're running to behave differently when
                  // it's called directly vs. by another function. e.g. lockWeth
                  if (!options.promise) options.promise = promise; // pad the list of arguments with `undefined` to account for any missing
                  // ones with default values.

                  newArgs = [].concat(
                    (0, _toConsumableArray2['default'])(args),
                    (0, _toConsumableArray2['default'])(
                      (0, _times['default'])(
                        correctArgsLength - 1 - args.length,
                        function () {
                          return undefined;
                        }
                      )
                    ),
                    [options]
                  );
                  return _context.abrupt(
                    'return',
                    original.apply(_this, newArgs)
                  );

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee);
        })
      )();
      return promise;
    };

    return descriptor;
  };
}
