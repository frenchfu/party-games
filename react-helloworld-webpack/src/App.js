import logo from './logo.svg';
import './App.css';
import BingoCardOne from './components/BingoCardOne'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState , useEffect} from 'react';
import Layout from "./Layout";
import Home from "./Home";
import ThreeCard from "./ThreeCard";
import GetCardFromApi from "./page/GetCardFromApi";
import GetCardFromApiByButton from "./page/GetCardFromApiByButton";
import HeaderAndFotter from "./page/HeaderAndFotter";
import TestAxios from "./page/TestAxios"


//context
import { AppContext } from "./context/context";
import { useClickNumber } from "./context/clickNumber";


const App = () => {

  const tbody_css = {
    border: "5px solid black", /* 给元素添加黑色边框 */
    color: "#18b674;" // 设置文字颜色为亮色系，示例中使用橙色 */
  }
  
  const tbody_css_red = {
    border: "5px solid black",
    color: "#18b674",
    backgroundColor: "red" // 保留分号
  }

  const { clickNumber, setClickNumber } = useClickNumber();


  useEffect(() => {


  }, []); 


  return (
    <>
      <AppContext.Provider value={{ clickNumber , setClickNumber }}>
          <BrowserRouter>
            <Routes>
              
                <Route path="/" element={<HeaderAndFotter />} > 
              
                  <Route path="/party-games" element={<Layout />}>
                      <Route index element={<Home />} />
                      <Route path="threeCard"  element={<ThreeCard />} />
                      <Route path="getCardFromApi"  element={<GetCardFromApi />} />
                      <Route path="getCardFromApiByButton"  element={<GetCardFromApiByButton />} />
                      <Route path="testAxios"  element={<TestAxios />} />
                  </Route>
                
              </Route>
            
            </Routes>
          </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;