import {  Link,useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BingoCardOne from './components/BingoCardOne'

const ThreeCard = () => {

    let bingoCardMapData = {
        "1":"1",
        "2":"2",
        "3":"3",
        "4":"4",
        "5":"5",
        "6":"6",
        "7":"7",
        "8":"8",
        "9":"9",
        "10":"10",
        "11":"11",
        "12":"12",
        "13":"13",
        "14":"14",
        "15":"15",
        "16":"16",
        "17":"17",
        "18":"18",
        "19":"19",
        "20":"20",
        "21":"21",
        "22":"22",
        "23":"23",
        "24":"24",
        "25":"25"
        };
        const [ bingoCardMap, setBingoCardMap ] = useState(bingoCardMapData);

    useEffect(() => {
    });

    return (
        <>
        <div className="container">
            <BingoCardOne inputBingoCardMapData={bingoCardMap}   ></BingoCardOne>
            <BingoCardOne inputBingoCardMapData={bingoCardMap}   ></BingoCardOne>
            <BingoCardOne inputBingoCardMapData={bingoCardMap}   ></BingoCardOne>
        </div>
        </>
    );
    

 }
export default ThreeCard;
