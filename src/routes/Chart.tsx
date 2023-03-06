import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery(["chartUpDown", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return <h1>Chart</h1>;
}

export default Chart;

/* 1.우리가 보고자 하는 암호화폐가 무엇인지 알아야됨 
   2.coinId props를 차트페이지로 보내준다
*/
