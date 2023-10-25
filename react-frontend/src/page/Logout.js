import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//登出
const Logout = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
        sessionStorage.setItem("account", "");
        sessionStorage.setItem("flashToken", "");
        sessionStorage.setItem("jwtKey", "");
        sessionStorage.setItem("token", "");
        navigate("/party-games");
      }, [navigate]);


    return (
        <>
        </>
    );
 }
export default Logout;
