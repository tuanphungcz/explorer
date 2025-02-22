import { useQuery } from 'react-query';

const getCurrentBtcPrice = async () =>
  fetch('https://api.coingecko.com/api/v3/exchange_rates')
    .then(res => res.json())
    .then(data => data?.rates?.usd?.value);

export const useCurrentBtcPrice = () =>
  useQuery('current-btc-price', getCurrentBtcPrice, { staleTime: 30 * 60 * 1000 });

const getCurrentStxPrice = async () =>
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=blockstack,bitcoin&vs_currencies=usd')
    .then(res => res.json())
    .then(data => data?.blockstack?.usd);

export const useCurrentStxPrice = () =>
  useQuery('current-stx-price', getCurrentStxPrice, { staleTime: 30 * 60 * 1000 });
