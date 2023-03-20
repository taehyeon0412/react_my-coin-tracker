/* 코인 홈페이지 */

import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "./../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import Pagination from "react-js-pagination";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  button {
    position: absolute;
    right: 10px;
  }
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
  @media screen and (max-width: 490px) {
    overflow-x: auto;
  }
  //overflow-x: auto; 그리드 가로폭 비율 자동 조절

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
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0);
      transform: scale(1.1);
    }
  }
`;

const CoinName = styled.span`
  max-width: 100px;
  text-align: center;
  white-space: nowrap;
  //스페이스와 탭, 줄바꿈, 자동줄바꿈을 어떻게 처리할지 정하는 속성
  overflow: hidden;
  text-overflow: ellipsis;
  //overflow=> 줄 바꿈을 하지 않을 때 넘치는 텍스트 처리
`;

const Title = styled.h1`
  font-size: 43px;
  color: ${(props) => props.theme.accentColor};
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

const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  width: auto;

  ul {
    width: auto;
    display: flex;
    gap: 10px;
    @media screen and (max-width: 450px) {
      gap: 5px;
    }
  }
  li {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    background-color: ${(props) => props.theme.divColor};
    border-radius: 20px;
    @media screen and (max-width: 450px) {
      width: 35px;
      height: 35px;
    }
    &:hover {
      color: ${(props) => props.theme.accentColor};
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0);
      transform: scale(1.1);
    }
    a {
      padding: 10px;
      font-size: 16px;
      @media screen and (max-width: 450px) {
        font-size: 13px;
      }
    }
  }
  .active {
    color: ${(props) => props.theme.accentColor};
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0);
    transform: scale(1.1);
    font-weight: 900;
  }
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
} /* 코인의 속성 */

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

  //페이지 네이션 시작
  const [totalItemsCount, setTotalItemsCount] = useState(12);
  /* setTotalItemsCount는  */
  const [page, setPage] = useState(1);
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };
  //페이지 네이션 끝

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
        <>
          <CoinsList>
            {data
              ?.slice(
                totalItemsCount * (page - 1),
                totalItemsCount * (page - 1) + totalItemsCount
              ) /* 페이지가 1이면 0부터 totalItemsCount까지 
                  페이지가 2이면 totalItemsCount부터~ */
              .map((coin) => (
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
                    <CoinName>{coin.name}</CoinName>
                  </Link>
                </Coin>
              ))}
          </CoinsList>

          <PaginationDiv>
            <Pagination
              activePage={page}
              itemsCountPerPage={12}
              totalItemsCount={240}
              pageRangeDisplayed={4}
              prevPageText={"‹"}
              nextPageText={"›"}
              onChange={handlePageChange}
            />
          </PaginationDiv>
        </>
      )}

      {/* 로딩 삼항연산자 끝*/}
    </Container>
  ); /* return끝 */
}

export default Coins;

/*Link는 object를 통해서 데이터 그 자체를 다른 페이지에 보낼수 있다.

<Link to={{ pathname: `/${coin.id}`, state: { name: coin.name, symbol: coin.symbol } }}>
=>>         주소                     보내는 내용
*/

/*  isExact : [boolean] true일 경우 
전체 경로가 완전히 매칭될 경우에만 요청을 수행 */

/* activePage: 현재 페이지
itemsCountPerPage: 한 페이지당 보여줄 리스트 아이템의 개수
totalItemsCount: 총 아이템의 개수
pageRangeDisplayed: Paginator 내에서 보여줄 페이지의 범위
prevPageText: "이전"을 나타낼 텍스트 (prev, <, ...)
nextPageText: "다음"을 나타낼 텍스트 (next, >, ...)
onChange: 페이지가 바뀔 때 핸들링해줄 함수 */

/* https://api.coinpaprika.com/v1 */
