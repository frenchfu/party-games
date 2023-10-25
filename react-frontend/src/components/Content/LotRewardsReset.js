import React, { useEffect, useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { tableContainer, onTableButton ,} from '../../css/irxlot.pg.css.js';
import {doGetReardsList ,doReSetRewards} from '../../apis/adminApi';
import Bootbox  from  'bootbox-react';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.css";
import {Button } from "react-bootstrap";



/**
 *  維護 重設
 *
 */
const LotRewardsReset = () => {

  const [reRender, setReRender] = useState(false);//是否要重新 udsEffect
  const [showAlert, setShowAlert] = useState('');//錯誤視窗彈出
  const [errMessage, setErrMessage] = useState('');//錯誤訊息
  const [rewardsList, setRewardsList] = useState([]);//列表
  const [showEditModal, setShowEditModal] = useState(false);//決定是否顯示編輯新增視窗
  const [isEdit, setIsEdit] = useState(true);//決定是否顯示編輯新增視窗
  const [rewardsModal, setRewardsModal] = useState({});




  const openHandleResetModel = (row) =>{
    setRewardsModal(row);
    setIsEdit(true);
    setShowEditModal(true);
  }

  const doHandelReSetRewards = async () => {

    let sendData = rewardsModal;
    const response =  await doReSetRewards(sendData);
    if(response.code === '000'){
      await loadPage();
      setShowEditModal(false);
      setErrMessage(response.result);
      //setReRender(!reRender);
    }else{
      setErrMessage(response.message);
    }
    setShowAlert(true);

  }



  
  
  const renderButtons = (cell, row) => {
    return (
      <>
        { !!row.drawingTime?( //有抽過
          <>
          <button  className="btn btn-danger text-white" onClick={() => openHandleResetModel(row)}>
          抽獎結果清除 <BsTrash /> {/* 使用 React Icons 的 BsTrash 圖示 */}
          </button>
          </>
        )
        :
          (//沒抽過
          <>
          <button  className="btn btn-danger text-white disabled" onClick={() =>{}}>
            <>尚未抽獎</> {/* 使用 React Icons 的 BsTrash 圖示 */}
          </button>
          </>
          )      
        }
        {" "}
        
      </>
    );
  };

  
  useEffect(() => {
    async function fetchMyAPI() {
      loadPage();
  }
  fetchMyAPI();

  }, [reRender]);

  const loadPage = async () => {
    const response = await doGetReardsList();
      if(!!response){
        if(response.code === '000'){
          setRewardsList(response.result.rewards);
        }else{
          setErrMessage(response.message);
          setShowAlert(true);
        }
  
      }else{
        setErrMessage("取得清單失敗");
        setShowAlert(true);
      }
  }




      const columns = [
        { dataField: 'groupNm', text: '獎項'  ,headerClasses: 'bg-primary  text-white text-center' , headerStyle: { width: '20%' }, style: { textAlign: 'center' }},
        { dataField: 'codeNm', text: '獎次' ,headerClasses: 'bg-primary  text-white text-center', headerStyle: { width: '15%' }, style: { textAlign: 'center' }},
        { dataField: 'showRow', text: '行列',headerClasses: 'bg-primary  text-white text-center' , headerStyle: { width: '10%' }, style: { textAlign: 'center' }},
        { dataField: 'quota', text: '名額',headerClasses: 'bg-primary  text-white text-center' , headerStyle: { width: '20%' }, style: { textAlign: 'center' }},
        { dataField: 'itemNm', text: '內容',headerClasses: 'bg-primary  text-white text-center' , headerStyle: { width: '25%' }, style: { textAlign: 'center' } },
        {
          headerStyle: { width: '10%' }, style: { textAlign: 'center' },
          dataField: 'id',
          text: '操作',
          headerClasses: 'bg-primary text-white text-center',
          formatter: renderButtons, // 使用自訂的 renderButtons 函式來產生按鈕
        }
      ];

      const pagination = paginationFactory({
        sizePerPage: 50,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true
      });

      const MyTable = () => (
        <BootstrapTable
          keyField="rewardCd"
          data={ rewardsList }
          columns={ columns }
          pagination={ pagination }
        />
      );




    return (
        <>   
            <Modal
              show={showEditModal}
              onHide={() => setShowEditModal(false)}
              dialogClassName="modal-xl modal-dialog-centered"
              aria-labelledby="example-custom-modal-styling-title"
             >
            <Modal.Header closeButton className="bg-dark text-white">
              <Modal.Title id="example-custom-modal-styling-title">
                抽獎結果清除
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <>
                確定要重設 {rewardsModal.groupNm}-{rewardsModal.codeNm}-{rewardsModal.itemNm} 嗎?
              </>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              關閉
            </Button>
            <Button onClick={doHandelReSetRewards} variant="primary">
              確認
            </Button>
          </Modal.Footer>
          </Modal>          
            <Bootbox show={showAlert} 
              type={"alert"}  
              message={errMessage}  
              onClose={()=>{setShowAlert(false);}} 
            /> 
            <div style={tableContainer}>                          
                <MyTable></MyTable>
            </div>
        </>
    );
 }
export default LotRewardsReset;
