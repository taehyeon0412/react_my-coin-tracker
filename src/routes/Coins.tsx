/* 코인 홈페이지 */

import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "./../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 5px 0px 20px;
`;

const ThemeToggleBtn = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.grayText};
  & :hover {
    color: ${(props) => props.theme.textColor};
  }
  /* 테마 토글 버튼 */
`;

const CoinsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  gap: 15px;
`;

/* 코인 */
const Coin = styled.div`
  background-color: ${(props) => props.theme.divColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 15px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  margin-right: 50px;
`;

const Loader = styled.span`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 30px;
  font-size: 2rem;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
`;

/* 코인의 속성 */
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  /* const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const json = await (
        await fetch("https://api.coinpaprika.com/v1/coins")
      ).json();
      setCoins(json.slice(0, 100)); //coins를 0부터 @까지 자른다
      setLoading(false);
    })(); /* ()()형식으로 코딩을 짜면 앞에 코드를 바로 실행하게 할 수 있다. 
  }, []); 기존코드*/

  const setDarkAtom = useSetRecoilState(isDarkAtom);
  /* useSetRecoilState => atom의 state값을 바꿀 수 있다 */
  const toggleDark = () => setDarkAtom((prev) => !prev);
  /* 토글 버튼을 누르면 isDarkAtom의 현재값을 반대로 바꾼다 */

  return (
    <Container>
      <Helmet>
        <title>Coin Tracker</title>
      </Helmet>
      <Header>
        <Title>Coin Tracker</Title>
        <ThemeToggleBtn onClick={toggleDark}>
          <i className="fa-regular fa-moon fa-2x"></i>
        </ThemeToggleBtn>
      </Header>

      {/* 로딩 삼항연산자 시작*/}
      {isLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 12).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name, symbol: coin.symbol },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
      {/* 로딩 삼항연산자 끝*/}
    </Container>
  );
}

export default Coins;

/*Link는 object를 통해서 데이터 그 자체를 다른 페이지에 보낼수 있다.

<Link to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}>
=>> 
*/
