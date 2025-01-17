export const getNextTimeframe = (timeframe: string): string => {
  const timeframes: Dictionary<string> = {
    'tick': '1m',
    // 'tick': '0.2s',
    // '0.2s': '1s',
    // '1s': '1m',
    // '1m': '3m',
    // '3m': '5m',
    // '5m': '15m',
    // '15m': '30m',
    // '30m': '1h',
    // '1h': '2h',
    // '2h': '4h',
    // '4h': '6h',
    // '6h': '8h',
    // '8h': '12h',
    // '12h': '1d',
    // '1d': '3d',
    // '3d': '1w',
    // '1w': '1M',
  };
  return timeframes[timeframe] || '';
}