import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

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

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<ChartData[]>(
    ["chartUpDown", coinId],
    () => fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
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
          options={{
            theme: {
              mode: "dark",
            },
            chart: { height: 300, width: 500, toolbar: { show: false } },
            stroke: { curve: "smooth", width: 4 },
          }}
        />
      )}
    </div>
  );
}

export default Chart;

/* 1.우리가 보고자 하는 암호화폐가 무엇인지 알아야됨 
   2.coinId props를 차트페이지로 보내준다
*/
