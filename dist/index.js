'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
);

var _ramda = require('ramda');

var _constants = require('./utils/constants');

var _ChiefService = _interopRequireDefault(require('./ChiefService'));

var _VoteProxyService = _interopRequireDefault(require('./VoteProxyService'));

var _VoteProxyFactoryService = _interopRequireDefault(
  require('./VoteProxyFactoryService')
);

var _GovPollingService = _interopRequireDefault(require('./GovPollingService'));

var _GovQueryApiService = _interopRequireDefault(
  require('./GovQueryApiService')
);

var _EsmService = _interopRequireDefault(require('./EsmService'));

var _SpellService = _interopRequireDefault(require('./SpellService'));

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
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

var _default = {
  addConfig: function addConfig(config, _ref) {
    var _esmContracts, _objectSpread2;

    var _ref$network = _ref.network,
      network = _ref$network === void 0 ? 'mainnet' : _ref$network,
      _ref$staging = _ref.staging,
      staging = _ref$staging === void 0 ? false : _ref$staging;
    var contractAddresses = {
      kovan: require('../contracts/addresses/kovan.json'),
      mainnet: require('../contracts/addresses/mainnet.json'),
    };

    try {
      contractAddresses.testnet = require('../contracts/addresses/testnet.json');
    } catch (err) {
      // do nothing here; throw an error only if we later attempt to use ganache
    }

    var addressKey = network == 'ganache' ? 'testnet' : network;
    var esmContracts =
      ((_esmContracts = {}),
      (0, _defineProperty2['default'])(_esmContracts, _constants.ESM, {
        address: (0, _ramda.map)(
          (0, _ramda.prop)('MCD_ESM'),
          contractAddresses
        ),
        abi: require('../contracts/abis/ESM.json'),
      }),
      (0, _defineProperty2['default'])(_esmContracts, _constants.END, {
        address: (0, _ramda.map)(
          (0, _ramda.prop)('MCD_END'),
          contractAddresses
        ),
        abi: require('../contracts/abis/End.json'),
      }),
      _esmContracts);

    var addContracts = _objectSpread(
      ((_objectSpread2 = {}),
      (0, _defineProperty2['default'])(_objectSpread2, _constants.CHIEF, {
        address: (0, _ramda.map)(
          (0, _ramda.prop)('MCD_ADM'),
          contractAddresses
        ),
        // TODO check for MCD-specific version of DSChief
        abi: require('../contracts/abis/DSChief.json'),
      }),
      (0, _defineProperty2['default'])(
        _objectSpread2,
        _constants.VOTE_PROXY_FACTORY,
        {
          address: (0, _ramda.map)(
            (0, _ramda.prop)('VOTE_PROXY_FACTORY'),
            contractAddresses
          ),
          abi: require('../contracts/abis/VoteProxyFactory.json'),
        }
      ),
      (0, _defineProperty2['default'])(_objectSpread2, _constants.POLLING, {
        address: (0, _ramda.map)(
          (0, _ramda.prop)('POLLING'),
          contractAddresses
        ),
        abi: require('../contracts/abis/PollingEmitter.json'),
      }),
      (0, _defineProperty2['default'])(
        _objectSpread2,
        _constants.BATCH_POLLING,
        {
          address: (0, _ramda.map)(
            (0, _ramda.prop)('BATCH_POLLING'),
            contractAddresses
          ),
          abi: require('../contracts/abis/BatchPollingEmitter.json'),
        }
      ),
      (0, _defineProperty2['default'])(_objectSpread2, _constants.PAUSE, {
        address: (0, _ramda.map)((0, _ramda.prop)('PAUSE'), contractAddresses),
        abi: require('../contracts/abis/DSPause.json'),
      }),
      _objectSpread2),
      esmContracts
    );

    var makerConfig = _objectSpread(
      _objectSpread({}, config),
      {},
      {
        additionalServices: [
          'chief',
          'voteProxy',
          'voteProxyFactory',
          'govPolling',
          'govQueryApi',
          'esm',
          'spell',
        ],
        chief: [_ChiefService['default']],
        voteProxy: [_VoteProxyService['default']],
        voteProxyFactory: [_VoteProxyFactoryService['default']],
        govPolling: [_GovPollingService['default']],
        govQueryApi: [
          _GovQueryApiService['default'],
          {
            staging: staging,
          },
        ],
        esm: [_EsmService['default']],
        spell: [_SpellService['default']],
        smartContract: {
          addContracts: addContracts,
        },
        token: {
          erc20: [
            {
              currency: _constants.MKR,
              symbol: _constants.MKR.symbol,
              address: contractAddresses[addressKey].SAI_GOV
                ? contractAddresses[addressKey].SAI_GOV
                : contractAddresses[addressKey].GOV,
            },
            {
              currency: _constants.IOU,
              symbol: _constants.IOU.symbol,
              address: contractAddresses[addressKey].MCD_IOU,
            },
          ],
        },
      }
    );

    return makerConfig;
  },
};
exports['default'] = _default;
