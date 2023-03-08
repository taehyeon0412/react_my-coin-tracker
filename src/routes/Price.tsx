import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
/* 전체박스 */

const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.divColor};
  border-radius: 15px;
  padding: 20px;
  gap: 15px;
`;
/* 가격박스 */

const TimeSpan = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.grayText};
`;
/* 시간 */

const PercentBox = styled.div``;
/* 퍼센트 박스 */

function Price() {
  return (
    <Container>
      <PriceBox>
        <TimeSpan>24시간전</TimeSpan>
        <PercentBox>+30%</PercentBox>
      </PriceBox>
      <PriceBox>
        <TimeSpan>24시간전</TimeSpan>
        <PercentBox>+30%</PercentBox>
      </PriceBox>
    </Container>
  );
}

export default Price;

/* 1.전체 div gird 2,1fr
  2.개별박스 div - 컨텐츠 중앙정렬
  3. span-div 정렬 -span에 grayText
  4. 3번째 안의 div price 받아오기 + 아이콘으로 삼항연산자
  5. price div 색깔 적용 */
