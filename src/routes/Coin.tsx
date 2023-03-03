/* 코인 개인 페이지 */
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>

      {/* 로딩 삼항연산자 시작*/}
      {loading ? <Loader>"Loading..."</Loader> : null}
      {/* 로딩 삼항연산자 종료*/}
    </Container>
  );
}

export default Coin;
