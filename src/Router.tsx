import {BrowserRouter, Routes, Route} from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

interface IRouterProps {
  isDark: boolean;
  toggleDark: () => void;
}

function Router({isDark, toggleDark}: IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:coinId"
          element={<Coin isDark={isDark} toggleDark={toggleDark} />}
        >
          <Route path="Chart" element={<Chart isDark={isDark} />} />
          <Route path="Price" element={<Price isDark={isDark} />} />
        </Route>
        <Route
          path="/"
          element={<Coins isDark={isDark} toggleDark={toggleDark} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
