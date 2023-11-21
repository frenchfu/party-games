import {  Link,useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BingoCardOne from '../components/BingoCardOne';
import {test401,test402,getToken} from "../apis/testAxios";
import Alert from 'react-bootstrap/Alert';
// Bootstrap CSS and js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

//react Boot Strap 
import { Button , Bootbox} from 'react-bootstrap';



const TestAxios = () => {

    const [showAlert, setShowAlert] = useState('');
    const [errMessage, setErrMessage] = useState('');
 
    const [ bingoCardMap, setBingoCardMap ] = useState({});


    const doTest401 = async ()=>{

        let response = await test401();
    }

    
    const doTest402 = async ()=>{

        let response = await test402();

    }

    const doGetToken = async ()=>{

        let response = await getToken();
        
        if (response.code === '000') {
            sessionStorage.setItem('name', response.result.name);
            sessionStorage.setItem('no', response.result.no);
            sessionStorage.setItem('token', response.result.token);

            setErrMessage("取得token了:token:"+response.result.token);
            setShowAlert(true);


        }else{

            setErrMessage(response.message);
            setShowAlert(true);
            return;

        }        

    }
    

    const handleClose = () => {
		return setShowAlert(false);
	}


    useEffect(() => {
  

    }, []);



    return (
        <>
    
      <Alert show={showAlert} variant="success">
        <Alert.Heading>My Alert</Alert.Heading>
        <p>
            {errMessage}
        </p>
        <hr />
          <Button onClick={() => handleClose()} variant="outline-success">
            Close me
          </Button>
      </Alert>

      
    
        <div className="container">
            <Button onClick={()=>doGetToken()} > 測試取TOKEN</Button>
            <span>　</span>|
            <Button onClick={()=>doTest401()} > 測試401</Button>
            <span>　</span>|
            <Button onClick={()=>doTest402()} > 測試402</Button>
        </div>
        </>
    );
    

 };
export default TestAxios;
