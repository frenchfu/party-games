import {  Link,useNavigate } from "react-router-dom";
import React, { useEffect, useState , useContext} from "react";
import BingoCardOne from '../components/BingoCardOne';
import BingoCardTwo from '../components/BingoCardTwo';
import {drowApi} from "../apis/bingoApi";
// Bootstrap CSS and js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

//react Boot Strap 
import { Button } from 'react-bootstrap';
import { AppContext } from "../context/context";


const GetCardFromApiByButton = () => {
 
    const [ bingoCardMaps, setBingoCardMaps ] = useState([]);
    const {  clickNumber , setClickNumber } = useContext(AppContext);
    
    const doGetAnotherCard = async ()=>{

            let response = await drowApi();
            let bingoCard = response.result.bingoCard;
            setBingoCardMaps([...bingoCardMaps,bingoCard]);

    }

    const doClickNumber =  async (key) => {
  
        const finalClickNumber = {...clickNumber};
        console.log(finalClickNumber);
        if(!!finalClickNumber[key]){
          finalClickNumber[key] = null;
        }else{
          finalClickNumber[key] = true;
        }
        console.log(finalClickNumber);
        setClickNumber(finalClickNumber);
      
      }


    useEffect(() => {

    }, []);

    return (
        <>
        <Button  onClick={() => doGetAnotherCard()}>加一張卡</Button>
        <div className="container">
        {bingoCardMaps.map((bingoCardMap) => {
                return (
                    <BingoCardTwo inputBingoCardMapData={bingoCardMap} clickNumber={clickNumber}  setClickNumber={doClickNumber}  ></BingoCardTwo>
              );
           })}
            
        </div>
        </>
    );
    

 };
export default GetCardFromApiByButton;
