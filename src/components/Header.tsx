import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 30px 10px 15px;
`;
/* 헤드전체 */

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
/* 코인이름, 가격, 24시간 변동 div */

const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;
/* 코인이름 */

const CoinPrice = styled.span`
  font-size: 25px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
  margin: 8px 0px;
`;
/* 코인 가격 */

interface IPercent24 {
  percent24?: number;
}

const Percent24 = styled.span<IPercent24>`
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => (props.percent24! >= 0 ? "#4deb6d" : "#e83a42")};
  span {
    margin-left: 10px;
    font-size: 13px;
    font-weight: normal;
    color: ${(props) => props.theme.grayText};
  }
`;
/* #e83a42= 빨간색 
   #4deb6d= 초록색
   24시간 변동률*/

const SymbolDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
/* 심볼 디브 */

const SymbolImg = styled.img`
  width: 85px;
  height: 85px;
`;
/* 심볼 이미지 */

interface IHeader {
  coinName?: string;
  price?: number;
  per24?: number;
}

interface RouteState {
  symbol: string;
  id: string;
}

function Header({ coinName, price, per24 }: IHeader) {
  const { state } = useLocation<RouteState>();

  return (
    <Head>
      <TitleDiv>
        <Title>{coinName}</Title>
        <CoinPrice>${price}</CoinPrice>
        <Percent24 percent24={per24}>
          {per24! >= 0
            ? `+$${((price! * Math.abs(per24!)) / 100).toFixed(2)}`
            : `-$${((price! * Math.abs(per24!)) / 100).toFixed(2)}`}
          ({per24}%)
          <span>전일대비</span>
        </Percent24>
      </TitleDiv>
      <SymbolDiv>
        <SymbolImg
          src={`https://cryptocurrencyliveprices.com/img/${state.symbol.toLowerCase()}-${coinName?.toLowerCase()}.png`}
        />
      </SymbolDiv>
    </Head>
  );
}

export default Header;

/* props.percent24 && props.percent24 >= 0 ? "#e83a42" : "#4deb6d"
   첫번째 조건         두번째 조건 
   맞으면 빨강         맞으면 초록 */

/* typescript에서 undefined오류가 뜨면 !를 붙여주면 강제로 undefined이 
아니라는것을 인지시켜줄 수 있다. */

/* 차트,가격 클릭시 src Uncaught TypeError 오류 나는 이유
=> 차트,가격을 누르면 페이지가 변경되면서 기존에 받은 state를 못받게되서
차트 가격 페이지에서도 받아올수 있게 차트 가격 페이지 클릭시
coin페이지에서 state를 차트페이지로 넘겨줘야된다. */
