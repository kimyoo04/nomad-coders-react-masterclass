import {useQuery} from "@tanstack/react-query";
import {useOutletContext} from "react-router-dom";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}
function Chart() {
  const {coinId} = useOutletContext<ChartProps>();
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                data?.map(function (data) {
                  return {
                    x: data.time_close * 1000,
                    y: [data.open, data.high, data.low, data.close],
                  };
                }) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {show: false},
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: {show: false},
              axisTicks: {show: false},
              labels: {show: false},
              type: "datetime",
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
