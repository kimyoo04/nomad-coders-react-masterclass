import styled from "styled-components";
import {useQuery} from "@tanstack/react-query";
import {useOutletContext} from "react-router-dom";
import {fetchCoinHistory} from "../api";

const Hlist = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 4;
`;

const Vlist = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  flex: 1;
`;

const PlusPrice = styled.span`
  display: block;
  text-align: center;
  color: teal;
`;

const MinusPrice = styled.span`
  display: block;
  text-align: center;
  color: tomato;
`;

const ClosePrice = styled.span`
  display: block;
  text-align: center;
`;

const THead = styled.span`
  display: block;
  text-align: center;
  flex: 1;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
  color: ${(props) => props.theme.accentColor};
`;

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

interface IRouterProps {
  isDark: boolean;
}

interface ChartProps {
  coinId: string;
}

function Price({isDark}: IRouterProps) {
  const {coinId} = useOutletContext<ChartProps>();
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  console.log(
    data?.map((coinPrice, index) => {
      return +data[index].close;
    })
  );
  return (
    <div>
      {isLoading ? (
        "loading Price..."
      ) : (
        <>
          <Hlist>
            <THead>날짜</THead>
            <THead>종가</THead>
            <THead>최고 가격</THead>
            <THead>최저 가격</THead>
          </Hlist>
          <Hlist>
            <Vlist>
              {data?.map((coinPrice) => (
                <ClosePrice key={coinPrice.time_close}>
                  {new Date(coinPrice.time_close * 1000)
                    .toISOString()
                    .slice(0, 10)}
                </ClosePrice>
              ))}
            </Vlist>
            <Vlist>
              {data?.map((coinPrice, index) => {
                if (index === 0) {
                  return (
                    <ClosePrice key={coinPrice.time_close}>
                      {coinPrice.close}
                    </ClosePrice>
                  );
                }
                const result = +data[index].close - +data[index - 1].close;
                if (result > 0) {
                  return (
                    <Hlist>
                      <ClosePrice key={coinPrice.time_close}>
                        {coinPrice.close}
                      </ClosePrice>
                      <PlusPrice key={coinPrice.time_close}>
                        {"  "}
                        {result.toFixed(1)}
                      </PlusPrice>
                    </Hlist>
                  );
                } else if (result < 0) {
                  return (
                    <Hlist>
                      <ClosePrice key={coinPrice.time_close}>
                        {coinPrice.close}
                      </ClosePrice>
                      <MinusPrice key={coinPrice.time_close}>
                        {"  "}
                        {result.toFixed(1)}
                      </MinusPrice>
                    </Hlist>
                  );
                } else {
                  return (
                    <ClosePrice key={coinPrice.time_close}>
                      {coinPrice.close}
                      {"  "}
                      {result.toFixed(1)}
                    </ClosePrice>
                  );
                }
              })}
            </Vlist>
            <Vlist>
              {data?.map((coinPrice) => (
                <ClosePrice key={coinPrice.time_close}>
                  {coinPrice.high}
                </ClosePrice>
              ))}
            </Vlist>
            <Vlist>
              {data?.map((coinPrice) => (
                <ClosePrice key={coinPrice.time_close}>
                  {coinPrice.low}
                </ClosePrice>
              ))}
            </Vlist>
          </Hlist>
        </>
      )}
    </div>
  );
}
export default Price;
