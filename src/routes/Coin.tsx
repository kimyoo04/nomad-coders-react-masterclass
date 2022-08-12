import {useQuery} from "@tanstack/react-query";
import {useLocation, useParams, useMatch, Outlet} from "react-router-dom";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {fetchCoinInfo, fetchCoinTickers} from "../api";
import darkIcon from "../img/dark_mode.svg";
import lightIcon from "../img/light_mode.svg";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.areaColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{isActive: boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.areaColor};
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
  }
`;

export const Btn = styled.button`
  background-color: whitesmoke;
  border-radius: 6px;
`;

export const BtnText = styled.span`
  font-size: 16px;
`;

export const DarkBtn = styled.div`
  background-image: url(${darkIcon});
  background-repeat: no-repeat;
  width: 44px;
  height: 20px;
`;
export const LightBtn = styled.div`
  background-image: url(${lightIcon});
  background-repeat: no-repeat;
  width: 44px;
  height: 20px;
`;

interface IRouterProps {
  toggleDark: () => void;
  isDark: boolean;
}

interface RouteState {
  state: {
    name: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
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

function Coin({isDark, toggleDark}: IRouterProps) {
  const {coinId} = useParams() as {coinId: string};
  const {state} = useLocation() as RouteState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const {isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );
  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
        <Btn>
          <Link to={`/`}>
            <BtnText>Go Back</BtnText>
          </Link>
        </Btn>
        <div onClick={toggleDark}>
          <BtnText>{isDark ? <DarkBtn /> : <LightBtn />}</BtnText>
        </div>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{coinId}} />
        </>
      )}
    </Container>
  );
}
export default Coin;