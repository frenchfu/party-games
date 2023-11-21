import {  Link,useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BingoCardOne from '../components/BingoCardOne';
import {drowApi} from "../apis/bingoApi";
// Bootstrap CSS and js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

//react Boot Strap 
import { Button } from 'react-bootstrap';


const GetCardFromApi = () => {
 
    const [ bingoCardMap, setBingoCardMap ] = useState({});

    useEffect(() => {
        const fetchData = async () => {


            //let response = await drowApi();
            //let bingoCard = response.result.bingoCard;
            //setBingoCardMap(bingoCard);



            const response = await fetch('http://localhost:8080/party-games/api/react-class/drow-a-card', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
            });
            const data = await response.json();
            setBingoCardMap(data.result.bingoCard);
            console.log("ForceRerender");
            console.log(data.result.bingoCard);
            console.log("ForceRerender 2 ");
  
        };
        fetchData();
    }, []);

    return (
        <>
        <div className="container">
            <BingoCardOne inputBingoCardMapData={bingoCardMap}   ></BingoCardOne>
        </div>
        </>
    );
    

 };
export default GetCardFromApi;
