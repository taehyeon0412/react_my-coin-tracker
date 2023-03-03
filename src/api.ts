export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}

/*API를 fetch하고 json을 리턴해준다
  return fetch(`주소`).then((response)=>response.json());
*/
