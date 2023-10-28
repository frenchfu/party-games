import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout";
import Home from "./page/Home";
import NoPage from "./page/NoPage";
import Bingo from "./page/Bingo";
import BingoAdmin from "./page/BingoAdmin"
import  Logout  from "./page/Logout";
import BingoAdminDashBoard from "./page/BingoAdminDashBoard";

export default function App() {
  return (     
    <BrowserRouter>
      <Routes>
        <Route path="/party-games/logout" element={<Logout />}/>
        <Route path="/party-games" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/party-games/bingo" element={<Bingo />} />
          <Route path="/party-games/bingo-admin" element={<BingoAdmin />} />
          <Route path="/party-games/bingo-admin-dash-board" element={<BingoAdminDashBoard />} />
        </Route>
        {/*
          <Route path="/party-games/admin-lot-rewards-index" element={<AdminLotRewardsIndex />} />
          <Route path="/party-games/admin-lot-rewards-reset" element={<AdminLotRewardsReset />} />
          <Route path="/party-games/admin-lot-rewards-rpt" element={<AdminLotRewardsRpt />} />
      */}
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);