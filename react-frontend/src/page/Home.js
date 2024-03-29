import {  Link,useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Home = () => {

    const navigate = useNavigate();

    //const notify = useNotify();


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
                            <h1 className="red-text" >炤棋和沛宸的婚禮小遊戲</h1>
                            <br/>
                            <br/>
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
