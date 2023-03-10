import { isError, useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface ChartData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const PriceChart = styled.div`
  margin-top: 30px;
`;

const ErrorMs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0px;
`; /* 에러메세지 */

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<ChartData[]>(
    ["chartUpDown", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const isDark = useRecoilValue(isDarkAtom);

  /*  
  console.log(data);
  console.log(Array.isArray(data)); */

  return (
    <PriceChart>
      {isLoading ? (
        "Loading chart..."
      ) : Array.isArray(data) ? (
        <div>
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                /* close 종가만 차트로 그림 */
                data: data?.map((price) => price.close) as number[],
              },
            ]}
            /* data가 받아야되는건 number이고 data?.map()으로 읽어올때와
                 읽어오지 못할때를 구분해서 받아야되는데 읽어오면 number이지만
                 못읽어오면 undefined 형태가 되서 문제가 생김
                 그래서 as를 이용하여 number배열 형태로 강제해줘서 오류를 잡음 */
            width="100%"
            height="150px"
            options={{
              noData: {
                text: "",
              },
              theme: {
                mode: isDark ? "dark" : "light" /* 모드전환 토글 하기 */,
              },
              grid: { show: false },
              chart: {
                background: "transparent",
                toolbar: { show: false },
              },
              stroke: { curve: "smooth", width: 4 },
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors: [" #0be881"],
                  stops: [0, 100],
                },
              },
              colors: ["#0fbcf9"],
              /*차트에 마우스 올렸을때 나오는 것*/
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value}`,
                },
              },
              /* y축값 */
              yaxis: {
                labels: {
                  show: false,
                },
              },
              /* x축 값 */
              xaxis: {
                type: "datetime",
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                categories: data?.map(
                  (price) => new Date(+price.time_close * 1000).toISOString()
                  /* The left-hand side of an arithmetic operation must be of type 
                ‘any’ ‘number’ or an enum type라는 오류는 
                price.time_close와 *1000에서 나오는 오류다 
                이유는 Date()로 생성된 값을 연산에 사용하기 때문이다 typescript에서는
                명시적으로 연산이 가능한 숫자와 같이 처리를 해줘야된다 
                이 오류는 단항연산자인 +를 지정해주면 해결된다 
                price.time_close앞에 +를 붙이면 new Date()의 결과를 숫자(number)로 
                취급되기 때문에 연산에 사용할 수 있게된다 */
                ),
              },
            }}
            /* 라인 차트 옵션 */
          />
          <ApexChart
            type="candlestick"
            series={[
              {
                name: "Price",

                data: data?.map((price) => ({
                  x: +price.time_close * 1000,
                  y: [price.open, price.high, price.low, price.close],
                })),
              },
            ]}
            /* The left-hand side of an arithmetic operation must be of type 
              ‘any’ ‘number’ or an enum type라는 오류는 
              price.time_close와 *1000에서 나오는 오류다 
              이유는 Date()로 생성된 값을 연산에 사용하기 때문이다 typescript에서는
              명시적으로 연산이 가능한 숫자와 같이 처리를 해줘야된다 
              이 오류는 단항연산자인 +를 지정해주면 해결된다 
              price.time_close앞에 +를 붙이면 new Date()의 결과를 숫자(number)로 
              취급되기 때문에 연산에 사용할 수 있게된다 */
            width="97%"
            height="150px"
            options={{
              noData: {
                text: "",
              },
              theme: {
                mode: isDark ? "dark" : "light" /* 모드전환 토글 하기 */,
              },
              grid: { show: false },
              chart: {
                background: "transparent",
                toolbar: { show: false },
              },
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value}`,
                },
              },
              /* y축값 */
              yaxis: {
                labels: {
                  show: false,
                },
                tooltip: {
                  enabled: true,
                },
              },
              /* x축 값 */
              xaxis: {
                type: "datetime",
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                categories: data?.map(
                  (price) => new Date(+price.time_close * 1000).toISOString()
                  /* The left-hand side of an arithmetic operation must be of type 
              ‘any’ ‘number’ or an enum type라는 오류는 
              price.time_close와 *1000에서 나오는 오류다 
              이유는 Date()로 생성된 값을 연산에 사용하기 때문이다 typescript에서는
              명시적으로 연산이 가능한 숫자와 같이 처리를 해줘야된다 
              이 오류는 단항연산자인 +를 지정해주면 해결된다 
              price.time_close앞에 +를 붙이면 new Date()의 결과를 숫자(number)로 
              취급되기 때문에 연산에 사용할 수 있게된다 */
                ),
              },
            }}
            /* 캔들 차트 옵션 */
          />
        </div>
      ) : (
        <ErrorMs>차트 데이터가 없습니다.</ErrorMs>
      )}
    </PriceChart>
  );
}

export default Chart;

/* 1.우리가 보고자 하는 암호화폐가 무엇인지 알아야됨 
   2.coinId props를 차트페이지로 보내준다
*/

/* 차트 데이터가 없을 경우 페이지 전체가 에러가남
해결 방법 : 
1.console.log(data);를 하여 data는 배열이라는것을 알아냄
2.console.log(Array.isArray(data));를 사용하여 오류가 나는 페이지는 
데이터 배열이 아닌것을 확인함
Array,isArray(data)를 삼항연산자로 넣어 true일때 차트를 그리고
false일때 오류 문구를 나오게 수정함
*/
