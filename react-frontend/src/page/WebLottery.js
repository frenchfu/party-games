import React, { useState, useEffect } from 'react';
import axios from '../apis/https';
import RewardDiv from '../components/div/RewardDiv';
import PaRewardDiv from '../components/div/PaRewardDiv';
import PaListDiv from '../components/div/PaListDiv';
import Bootbox  from  'bootbox-react';
import {drowApi, doGetDrowResult} from '../apis/doDrowApi';
import {doPlListPdfDownload} from '../apis/doDownloadPfgApi'; 
import { downloadFile } from '../utilities/fileUtils';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';


const WebLottery = () => {


    const [irxLotRewardsDatas, setIrxLotRewardsDatas] = useState([]);
    const [showAlert, setShowAlert] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [showPaReward, setShowPaReward] = useState(false);
    const [count, setCount] = useState(0);
    const [newCount, setNewCount] = useState("");
    const [showOverlay, setShowOverlay] = useState(false);
    const [showPaList, setShowPaList] = useState(false);
    const [showListButton, setShowListButton] = useState(false);
    const [drowResult, setDrowResult] = useState([]);
    const [rewards, setRewards] = useState({});
    
    
    //關閉 中獎清冊
    const closePaListDiv = async () => {
        setShowPaList(false);
    }

    const plListPdfDownload = async (drowData) => {

        let postData = {
            "rewards" : drowData
        }

        const response = await doPlListPdfDownload(postData);
        console.log(response);
        if (response) {
            let fileName = response.headers['Content-Disposition'] ? response.headers['Content-Disposition'] : response.headers['Content-disposition'];
            if (fileName)
                fileName = fileName.replace("inline; filename=","");
            else
                fileName = 'contract.pdf';
            downloadFile(response.data, 'application/octet-stream', fileName);
        } else {
            alert('檔案下載失敗，請稍後再試');
        }

    }


    //進行抽獎
    const doDrowApi = async (drowData) => {

        //todo SHOW 彩球
        setShowListButton(false);//先隱藏 顯示名單的按鈕
        const response = await drowApi(drowData);
        if(response.code == '000'){
            console.log(response);
            //alert(response.result.useTime);
            
        }else{
            alert(response.message);
            setShowPaReward(false)
            return;
        }
        setRewards(response.result.rewards);
        setShowListButton(true);
        getDrowResult(response.result);
        setCount(count + 1);

    }

    //進行抽獎後 取得抽獎結果
    const getDrowResult = async (drowData) => {

        const response = await doGetDrowResult(drowData);
        if(response.code == '000'){
            setDrowResult(response.result.irxLotListBeans);
        }else{
            alert(response.message);
        }

    }

    const customModalStyles = {
        modalDialog: {
          //margin: 0,
          //transform: 'translate(0, 0)',
        },
        modalContent: {
          borderRadius: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.1)', // 使用rgba顏色值
        },
        modalContentList: {
            borderRadius: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // 使用rgba顏色值
            width :'70vw'
          },
      };

      //針對已抽過獎的獎項 查詢中獎清冊
      const showDrowedDrowResult = async (drowData) => {

        let postData = {
            "rewards" : drowData
        }
        const response = await doGetDrowResult(postData);
        if(response.code == '000'){
            setRewards(response.result.rewards);
            setDrowResult(response.result.irxLotListBeans);
            setShowPaList(true);
        }else{
            alert(response.message);
        }

    }    
    

    useEffect(() => {

        if(irxLotRewardsDatas.length == 0 || count != newCount){

            setNewCount(count);

            axios.post('/api/irx-lot-rewards/list', {
                rewardCd: 'G01'
            }).then((response) => {
                if (!!response &&  response.data.code == '000') {
                    
                    console.log(response.data);
                    let dataList =  response.data.result.rewards;
                    //按照第一個showRow 分類
                    let orgnzeResult = dataList.reduce((acc, obj) => {
                        const { showRow, sort } = obj;
                        const index = acc.findIndex(item => item[0] && item[0].showRow[0] === showRow[0]);
                        if (index !== -1) {
                        acc[index].push(obj);
                        } else {
                        acc.push([obj]);
                        }
                        return acc;
                    }, []).map(subArr => subArr.sort((a, b) => a.sort - b.sort));

                    setIrxLotRewardsDatas(orgnzeResult);

                }
            } ).catch((err) => {
                console.log("--------------");
                console.log(err);
                if(!!err.response){
                    setErrMessage(err.response);
                }else{
                    setErrMessage("無法取得獎項清單");
                }
                setShowAlert(true);
            });
        };

      }, [count]); // 傳入 count 作為相依性

    const handleClose = () => {
		return setShowAlert(false);
	}      


  return (<>
        <Bootbox show={showAlert} 
				type={"alert"}  
				message={errMessage}  
				onClose={handleClose} 
        />               
        <div className="sign_out">
            <Link to="/party-games/lottery-index" >
                <a  className="" title="返回">
                    <i className="icon-circle-arrow-left"></i>
                </a>
            </Link>
            <Link to="/party-games/logout" >
                <a  className="" title="登出">
                    <i className="icon-sign-out"></i>
                </a>
             </Link>
        </div>        
        <div className={`awardsall ${showOverlay ? 'overlay-container' : ''}`}>
            {irxLotRewardsDatas.map((datas, index) => {
                return (
                    <div className="text-center">
                        {datas.map((data, index2) => {
                            return(<RewardDiv mainClass={"awards"} data={data} doOnClick={doDrowApi} showPaReward={setShowPaReward} showDrowedDrowResult={showDrowedDrowResult} ></RewardDiv>)
                        })}
                    </div>
                )
            })}
        </div>
        <Modal show={showPaReward}   style={customModalStyles.modalDialog} >
            <Modal.Body style={customModalStyles.modalContent}>
                <PaRewardDiv 
                    show={showPaReward} 
                    showListButton={showListButton}  
                    setShowPaReward={setShowPaReward}  
                    setShowPaList={setShowPaList} 
                    getDrowResult={getDrowResult}
                ></PaRewardDiv>
            </Modal.Body>
        </Modal>
        <Modal show={showPaList}  style={customModalStyles.modalDialog} size="lg" scrollable={true} >
            <PaListDiv show={showPaList}  rewards={rewards}  drowResult={drowResult}  closePaListDiv={closePaListDiv} plListPdfDownload={plListPdfDownload} ></PaListDiv>
        </Modal>        

  </>)
};
  export default WebLottery;