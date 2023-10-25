//獎項的圓餅圖DIV
import { useState ,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MatterStepThree } from "../../js/MatterStepThree";

const PaRewardDiv = ({show, showListButton = false , setShowPaList, setShowPaReward }) => {

    const [countDown, setCountDown] =  useState(6);

     

    const handleClick = () => {
        setShowPaReward(false);
        setShowPaList(true);
    }

    useEffect(() => {

        let intervalId = null;

        if(show){
            intervalId = setInterval(() => {
                setCountDown((prevCount) => prevCount - 1);
              }, 1000);        
        }

        if(showListButton && countDown <= 0){
            handleClick();
        }


        return () => {
            clearInterval(intervalId);
        };

    },[show, showListButton, countDown]);
    

    return show?(
    <>
            <div>
                <div className="modal-dialog modal-dialog-top">
                    <div className="modal-content">
                        <div className="modal-body_t modal_awardsbody text-center">
                            <div className="con">
                                <MatterStepThree />
                                <img src="/party-games/assets/images/con-bg.png" className=""/>
                                <img src="/party-games/assets/images/con-bg02.png" className=""/>
                                <img src="/party-games/assets/images/con-bg03.png" className=""/>
                            </div>
                        </div>
                        {/*
                            showListButton? 
                                <div className="d-flex justify-content-end">
                                    <button onClick={handleClick} type="button" className="btn rounded-pill btn-lg modal_btn" data-bs-toggle="modal" data-bs-target="#pa_list">展示名單</button>
                                </div>
                            :<></>
                        */}
                    </div>
                </div>
            </div>  
    </>
    ):(<></>);

};
export default PaRewardDiv;