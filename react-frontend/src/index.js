import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout";
import Home from "./page/Home";
import LotteryIndex from "./page/LotteryIndex";
import NoPage from "./page/NoPage";
import MobileLottery from "./page/MobileLottery";
import WebLottery from "./page/WebLottery";
import ExtraLottery from "./page/ExtraLottery";
import Bingo from "./page/Bingo";
import BingoAdmin from "./page/BingoAdmin"
import AdminLotRewardsIndex from "./page/AdminLotRewardsIndex";
import  AdminLotRewardsReset  from "./page/AdminLotRewardsReset";
import  AdminLotRewardsRpt  from "./page/AdminLotRewardsRpt";
import  Logout  from "./page/Logout";

export default function App() {
  return (     
    <BrowserRouter>
      <Routes>
        <Route path="/party-games/logout" element={<Logout />}/>
        <Route path="/party-games" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/party-games/lottery-index" element={<LotteryIndex />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/party-games/web-lottery" element={<WebLottery />} />
          <Route path="/party-games/mobile-lottery" element={<MobileLottery />} />
          <Route path="/party-games/extra-lottery" element={<ExtraLottery />} />
          <Route path="/party-games/bingo" element={<Bingo />} />
          <Route path="/party-games/bingo-admin" element={<BingoAdmin />} />
        </Route>
          <Route path="/party-games/admin-lot-rewards-index" element={<AdminLotRewardsIndex />} />
          <Route path="/party-games/admin-lot-rewards-reset" element={<AdminLotRewardsReset />} />
          <Route path="/party-games/admin-lot-rewards-rpt" element={<AdminLotRewardsRpt />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);