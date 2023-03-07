/* 코인 개인 페이지 */
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const BtnHome = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.grayText};
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 25px;
  color: ${(props) => props.theme.textColor};
  align-items: center;
`;

const Loader = styled.span`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 30px;
  font-size: 2rem;
  color: ${(props) => props.theme.textColor};
`;

const Overview = styled.div`
  /* 검은색 박스 */
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.divColor};
  padding: 10px 25px;
  border-radius: 10px;
  margin: 20px 0px;
`;

const OverviewItem = styled.div`
  /* 검은색박스 내용 */
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
`;

const Description = styled.p`
  /* 코인 설명 */
  margin: 20px;
  line-height: 1.5; //줄간격
`;

const Tabs = styled.div`
  /* 가격,차트 박스 */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 15px 0px;
  gap: 20px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  /*isActive를 true,false로 나타내줌*/
  /* 가격,차트 내용 */
  text-align: center;
  text-transform: uppercase;
  background-color: ${(props) => props.theme.divColor};
  font-size: 16px;
  font-weight: ${(props) => (props.isActive ? "700" : "500")};
  padding: 10px 0px;
  border-radius: 20px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};

  a {
    display: block;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinPrice(coinId),
    {
      refetchInterval: 5000,
    }
  );
  /* key값이 coinId로 같을때는 배열로 묶고 
  식별할 수 있는 아이템을 만들어 줌*/

  /* -------------------------------------- 기존코드
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<infoData>();
  const [priceInfo, setPriceInfo] = useState<priceData>();

  라우터가 매치 되는지 확인하는 훅
  유저가선택한 url에 들어가 있다면 오브젝트를 가져옴 

  useEffect 컴포넌트가 렌더링 될 때 
      특정 작업을 실행할 수 있도록 하는 Hook이다
  
   useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();  // 코인 정보 링크 

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();  // 코인 가격 정보 링크 

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false); //데이터를 불러왔으면 로딩을 false로 지워줌
    })();
  }, []);
  코드를 시작시 한번만 실행할 때에는 []빈칸으로 둔다 
  []안에 어떤것을 넣으면 어떤것의 값이 변할때 마다 실행(렌더링) 한다 */

  const loading = infoLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        <title>{infoData?.name}</title>
      </Helmet>

      <Nav>
        <BtnHome>
          <Link to={"/"}>
            <i className="fa-solid fa-chevron-left fa-2x"></i>
          </Link>
        </BtnHome>
      </Nav>

      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>

      {/* 로딩 삼항연산자 시작*/}

      {loading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <>
          {/* 첫번째 검은색박스 */}
          <Overview>
            <OverviewItem>
              <span>순위 :</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol :</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>가격 :</span>
              <span>${priceData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>

          {/* 코인 설명 */}
          <Description>{infoData?.description}</Description>

          {/* 두번째 검은색박스 */}
          <Overview>
            <OverviewItem>
              <span>총 공급량 :</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>최대 공급량 : </span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          {/*가격, 차트  
            한번에 하나의 route만 렌더링 하기위해 Switch를 사용해줌
            url을 변경하기 위해 Link를 이용함*/}

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              {/*chart를 선택했을때 오브젝트가 나오고 null이 아니므로
              isActive는 true가 된다 
              이 값을 tab컴포넌트에 color에 추가한다*/}
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:coinId/price`}>
              <Price />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}

      {/* 로딩 삼항연산자 종료*/}
    </Container>
  );
}

export default Coin;
