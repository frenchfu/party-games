import Layout from "./page/Layout";
import Home from "./page/Home";
import NoPage from "./page/NoPage";
import Bingo from "./page/Bingo";
import BingoAdmin from "./page/BingoAdmin"
import  Logout  from "./page/Logout";
import BingoAdminDashBoard from "./page/BingoAdminDashBoard";
import BingoAdmin_class from "./page/BingoAdmin-class";
import HeaderAndFotter from "./page/HeaderAndFotter"


const subSubRouteArray = [
    { path: "", element: <Home /> }, // Use path: "" instead of index: true
    { path: "bingo", element: <Bingo /> },
    { path: "bingo-admin", element: <BingoAdmin /> },
    { path: "bingo-admin-class", element: <BingoAdmin_class /> },
    { path: "bingo-admin-dash-board", element: <BingoAdminDashBoard /> },
    { path: "*", element: <NoPage /> },
]

const subRouteArray = [
    {
        path: "/party-games",
        element: <Layout />,
        children: subSubRouteArray
      }
]

export const routeArray2 = [
    { path: "/", element: <HeaderAndFotter /> ,children : subRouteArray},
    { path: "/party-games/logout", element: <Logout /> },
  ];




export const routeArray1 = [
    { path: "/", element: <HeaderAndFotter /> },
    {
      path: "/party-games",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> }, // Use path: "" instead of index: true
        { path: "bingo", element: <Bingo /> },
        { path: "bingo-admin", element: <BingoAdmin /> },
        { path: "bingo-admin-class", element: <BingoAdmin_class /> },
        { path: "bingo-admin-dash-board", element: <BingoAdminDashBoard /> },
        { path: "*", element: <NoPage /> },
      ],
    },
    { path: "/party-games/logout", element: <Logout /> },
    // Add more route objects as needed
  ];