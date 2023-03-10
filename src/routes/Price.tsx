import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  gap: 15px;
`;
/* 전체박스 */

const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.divColor};
  width: auto;
  border-radius: 15px;
  padding: 20px 0px;
  gap: 15px;
`;
/* 가격박스 */

const TimeSpan = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.grayText};
`;
/* 시간 */

const PercentBox = styled.div<{ percent?: number }>`
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${(props) => (props.percent! >= 0 ? `#4deb6d` : `#e83a42`)};
  i {
    font-size: 30px;
    @media screen and (max-width: 400px) {
      font-size: 20px;
    }
  }
`;
/* 퍼센트 박스 */

const PercentSpan = styled.span`
  font-weight: 800;
  font-size: 30px;
  @media screen and (max-width: 400px) {
    font-size: 25px;
  }
`;

interface IPriceData {
  price30m?: number;
  price1h?: number;
  price6h?: number;
  price24h?: number;
  price7d?: number;
  price1y?: number;
}
/* coin페이지에서 넘어온 가격데이터 */

function Price() {
  const { state } = useLocation<IPriceData>();
  const priceList = [
    { text: "30분", value: state.price30m },
    { text: "1시간", value: state.price1h },
    { text: "6시간", value: state.price6h },
    { text: "1일", value: state.price24h },
    { text: "7일", value: state.price7d },
    { text: "1년", value: state.price1y },
  ];

  return (
    <Container>
      {priceList.map((item) => (
        <PriceBox key={item.text}>
          <TimeSpan>{item.text} 전보다</TimeSpan>
          <PercentBox percent={item.value}>
            <PercentSpan>
              {item.value! >= 0 ? `+${item.value}%` : `${item.value}%`}
            </PercentSpan>
            {item.value! >= 0 ? (
              <i className="fa-solid fa-arrow-trend-up fa-2xl"></i>
            ) : (
              <i className="fa-solid fa-arrow-trend-down fa-2xl"></i>
            )}
          </PercentBox>
        </PriceBox>
      ))}
    </Container>
  );
}

export default Price;

/* 1.전체 div gird 2,1fr //ok
  2.개별박스 div - 컨텐츠 중앙정렬 //ok
  3. span-div 정렬 -span에 grayText //ok
  4. 3번째 안의 div span 데이터 받아오기 + 아이콘으로 삼항연산자
  (price데이터를 넘겨주기 위해서 price를 클릭하면 coin 페이지에서 
  Link 함수를 이용해서 받아옴)
  5. price div 전체색깔 적용 
  #e83a42= 빨간색 
   #4deb6d= 초록색*/

/* 
<i class="fa-solid fa-arrow-trend-up"></i> 올라가는 화살
<i class="fa-solid fa-arrow-trend-down"></i> 내려가는 화살
*/
