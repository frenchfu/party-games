import {  Link,useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import  Bootbox  from  'bootbox-react';
import { useSelector, useDispatch } from 'react-redux';
import {doPostLogin, getValidateCode} from '../apis/loginApi';
import { BsFillEyeFill ,BsEyeSlashFill} from 'react-icons/bs';
//import { useNotify } from '../utilities/useCustomHooks';



const Home = () => {

    const [password, setPassword] = useState('');
    const [passwordHide, setPasswordHide] = useState(true);
    const [username, setUsername] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [showAlert, setShowAlert] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [verifyCodeBase64, setVerifyCodeBase64] = useState(null);
    const [verifyToken, setVerifyToken] = useState('');
    const [mode, setMode] = useState('LOT');//決定登入服務種類
    const [verifyCodeUrl, setVerifyCodeUrl] = useState(null);
    const navigate = useNavigate();

    //const notify = useNotify();

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        const stateUpdateFunctions = {
          password: setPassword,
          username: setUsername,
          verifyCode: setVerifyCode,
        };
        
        const updateState = stateUpdateFunctions[name];
        if (updateState) {
          updateState(value);
        }
      };

      const {
        handleSubmit
      } = useForm();
      
      const loginFormOnSubmit = async(data) => {
        const sentData = {
            mode,
            username,
            password,
            verifyCode,
            verifyToken
        }
        if(checkSentData(sentData)){

            //await reloadImg();
            let response = await doPostLogin(sentData);
            if (response.code === '000') {
                sessionStorage.setItem('account', response.result.account);
                sessionStorage.setItem('flashToken', response.result.flashToken);
                sessionStorage.setItem('jwtKey', response.result.token);
                sessionStorage.setItem('token', response.result.token);

                if(sentData.mode == 'LOT'){
                    navigate("/party-games/lottery-index");
                }else{
                    navigate("/party-games/admin-lot-rewards-index");
                }
                
            }else{
                setErrMessage(response.message);
                setShowAlert(true);
                return;
            }
        }else{
            //do nothing
        }
       

      }

    const handleClose = () => {
		return setShowAlert(false);
	}
  
    const checkSentData = (sentData) => {
		
        if(!!!sentData.username){
            setErrMessage("請輸入帳號");
        } else if (!!!sentData.password){
            setErrMessage("請輸入密碼");        
        } else if (!!!sentData.verifyCode || sentData.verifyCode.length != 6 ){
            setErrMessage("請輸入六碼圖形驗證碼");
        }else{
            return  true;
        }
        setShowAlert(true);
        return false;

	}

    useEffect(() => {
        //if(!!!verifyCodeBase64){
          //  reloadImg();
        //}
    });

    return (
        <>
            {/* ...其他内容... */}
            <div className="account-pages mt-3 mb-3">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-sm-10 col-lg-6">
                            <h1 className="red-text" >炤棋和沛宸</h1>
                            <div className="d-flex justify-content-center">
                                <div className="button-container d-flex align-items-center">
                                    <a href="https://kahoot.it/" target="_blank"><button className="button-blue">問答</button></a>
                                    {"　　"}
                                    <Link to="/party-games/bingo"><button className="button-red">賓果</button></Link>
                                </div>
                            </div>
                            {/* ...其他内容... */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
    
    
    
 }
export default Home;
