export const HEADER_API_KEY_KEY = 'API-Key'
export const HEADER_API_SIGNATURE_KEY = 'API-Sign'
export const HEADER_USER_AGENT_KEY = 'User-Agent'
export const HEADER_USER_AGENT_VALUE = 'Kraken API Universal JavaScript Client'
export const PRIVATE = 'private'
export const PUBLIC = 'public'

export const DEFAULT_ENDPOINTS = {
  AssetPairs: {
    method: 'GET',
    path: '/public/AssetPairs',
    type: 'public',
  },
  Assets: {
    method: 'GET',
    path: '/public/Assets',
    type: 'public',
  },
  Depth: {
    method: 'GET',
    path: '/public/Depth',
    type: 'public',
  },
  OHLC: {
    method: 'GET',
    path: '/public/OHLC',
    type: 'public',
  },
  Spread: {
    method: 'GET',
    path: '/public/Spread',
    type: 'public',
  },
  Ticker: {
    method: 'GET',
    path: '/public/Ticker',
    type: 'public',
  },
  Time: {
    method: 'GET',
    path: '/public/Time',
    type: 'public',
  },
  Trades: {
    method: 'GET',
    path: '/public/Trades',
    type: 'public',
  },
  // prettier-ignore
  AddOrder: { // eslint-disable-line sort-keys
    method: 'POST',
    path: '/private/AddOrder',
    type: 'private',
  },
  Balance: {
    method: 'POST',
    path: '/private/Balance',
    type: 'private',
  },
  CancelOrder: {
    method: 'POST',
    path: '/private/CancelOrder',
    type: 'private',
  },
  ClosedOrders: {
    method: 'POST',
    path: '/private/ClosedOrders',
    type: 'private',
  },
  DepositAddresses: {
    method: 'POST',
    path: '/private/DepositAddresses',
    type: 'private',
  },
  DepositMethods: {
    method: 'POST',
    path: '/private/DepositMethods',
    type: 'private',
  },
  DepositStatus: {
    method: 'POST',
    path: '/private/DepositStatus',
    type: 'private',
  },
  Ledgers: {
    method: 'POST',
    path: '/private/Ledgers',
    type: 'private',
  },
  OpenOrders: {
    method: 'POST',
    path: '/private/OpenOrders',
    type: 'private',
  },
  OpenPositions: {
    method: 'POST',
    path: '/private/OpenPositions',
    type: 'private',
  },
  QueryLedgers: {
    method: 'POST',
    path: '/private/QueryLedgers',
    type: 'private',
  },
  QueryOrders: {
    method: 'POST',
    path: '/private/QueryOrders',
    type: 'private',
  },
  QueryTrades: {
    method: 'POST',
    path: '/private/QueryTrades',
    type: 'private',
  },
  TradeBalance: {
    method: 'POST',
    path: '/private/TradeBalance',
    type: 'private',
  },
  TradesHistory: {
    method: 'POST',
    path: '/private/TradesHistory',
    type: 'private',
  },
  TradeVolume: {
    method: 'POST',
    path: '/private/TradeVolume',
    type: 'private',
  },
  Withdraw: {
    method: 'POST',
    path: '/private/Withdraw',
    type: 'private',
  },
  WithdrawCancel: {
    method: 'POST',
    path: '/private/WithdrawCancel',
    type: 'private',
  },
  WithdrawInfo: {
    method: 'POST',
    path: '/private/WithdrawInfo',
    type: 'private',
  },
  WithdrawStatus: {
    method: 'POST',
    path: '/private/WithdrawStatus',
    type: 'private',
  },
}
