const BASE_URL = `https://api.coinpaprika.com/v1`;
const NOMAD_URL = `https://ohlcv-api.nomadcoders.workers.dev/?coinId=`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}
/* 모든 코인 정보 */

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
} /* 코인 정보 */

export function fetchCoinPrice(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
} /* 코인 가격 정보 */

export function fetchCoinHistory(coinId: string) {
  /* const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7; */
  return fetch(`${NOMAD_URL}${coinId}`).then((response) => response.json());
}

/*API를 fetch하고 json을 리턴해준다
  return fetch(`주소`).then((response)=>response.json());
*/
