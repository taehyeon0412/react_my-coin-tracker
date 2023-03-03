const BASE_URL = `https://api.coinpaprika.com/v1`;

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

/*API를 fetch하고 json을 리턴해준다
  return fetch(`주소`).then((response)=>response.json());
*/
