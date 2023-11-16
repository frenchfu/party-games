import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout";
import Home from "./page/Home";
import NoPage from "./page/NoPage";
import Bingo from "./page/Bingo";
import BingoAdmin from "./page/BingoAdmin";
import Logout from "./page/Logout";
import BingoAdminDashBoard from "./page/BingoAdminDashBoard";
import BingoAdmin_class from "./page/BingoAdmin-class";
import HeaderAndFotter from "./page/HeaderAndFotter";
import { routeArray1 as routeArray , routeArray2  } from './routes';


export default function App() {
  return (     
    <BrowserRouter>
      <Routes>
        { 
        // <Route path="/" element={<HeaderAndFotter />} > 
        } 
          <Route path="/party-games/logout" element={<Logout />}/>
          <Route path="/party-games" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/party-games/bingo" element={<Bingo />} />
            <Route path="/party-games/bingo-admin" element={<BingoAdmin />} />
            <Route path="/party-games/bingo-admin-class" element={<BingoAdmin_class />} />
            <Route path="/party-games/bingo-admin-dash-board" element={<BingoAdminDashBoard />} />
          </Route>
        { 
          // </Route> 
        } 
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);





/*

//不使用JSX

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout";
import Home from "./page/Home";
import NoPage from "./page/NoPage";
import Bingo from "./page/Bingo";
import BingoAdmin from "./page/BingoAdmin";
import Logout from "./page/Logout";
import BingoAdminDashBoard from "./page/BingoAdminDashBoard";

class App extends React.Component {
  render() {
    return React.createElement(BrowserRouter, null,
      React.createElement(Routes, null,
        React.createElement(Route, { path: "/party-games/logout", element: React.createElement(Logout, null) }),
        React.createElement(Route, { path: "/party-games", element: React.createElement(Layout, null),
          children: [
            React.createElement(Route, { index: true, element: React.createElement(Home, null) }),
            React.createElement(Route, { path: "*", element: React.createElement(NoPage, null) }),
            React.createElement(Route, { path: "/party-games/bingo", element: React.createElement(Bingo, null) }),
            React.createElement(Route, { path: "/party-games/bingo-admin", element: React.createElement(BingoAdmin, null) }),
            React.createElement(Route, { path: "/party-games/bingo-admin-dash-board", element: React.createElement(BingoAdminDashBoard, null) })
          ]
        })
      )
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App, null));

*/

/*


//使用 react class Component

import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout";
import Home from "./page/Home";
import NoPage from "./page/NoPage";
import Bingo from "./page/Bingo";
import BingoAdmin from "./page/BingoAdmin";
import Logout from "./page/Logout";
import BingoAdminDashBoard from "./page/BingoAdminDashBoard";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/party-games/logout" element={<Logout />} />
          <Route path="/party-games" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/party-games/bingo" element={<Bingo />} />
            <Route path="/party-games/bingo-admin" element={<BingoAdmin />} />
            <Route
              path="/party-games/bingo-admin-dash-board"
              element={<BingoAdminDashBoard />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

*/




/*
//ROUTE 可以維護在同一個 陣列參數中 

const renderRoutes = (routesInput) => {
  return (
    routesInput.map((rout, index) => (
      <Route key={index} path={rout.path} element={rout.element}>
        {rout.children && renderRoutes(rout.children)}
      </Route>
    ))
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {renderRoutes(routeArray)}
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


*/
