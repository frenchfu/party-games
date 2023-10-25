import React, { useEffect, useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { BsFillEyeFill } from 'react-icons/bs';
import { tableContainer, onTableButton ,} from '../../css/irxlot.pg.css.js';
import {doGetReardsList, doSaveRewards} from '../../apis/adminApi';
import Bootbox  from  'bootbox-react';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.css";
import Form from 'react-bootstrap/Form';
import {Button } from "react-bootstrap";



/**
 *  維護 獎項
 *
 */
const LotRewards = () => {

  const [reRender, setReRender] = useState(false);//是否要重新 udsEffect
  const [showAlert, setShowAlert] = useState('');//錯誤視窗彈出
  const [errMessage, setErrMessage] = useState('');//錯誤訊息
  const [rewardsList, setRewardsList] = useState([]);//列表
  const [showEditModal, setShowEditModal] = useState(false);//決定是否顯示編輯新增視窗
  const [isEdit, setIsEdit] = useState(true);//決定是否顯示編輯新增視窗
  const [rewardsModal, setRewardsModal] = useState({});




  const handleEdit = (row) =>{
    setRewardsModal(row);
    setIsEdit(true);
    setShowEditModal(true);
  }

  const handleDelete = () =>{

  }

  const handleAdd = () =>{
      setRewardsModal(
        {
          groupCd:"G01",
          itemCd:"01",
          showRow:"0",
          quota:100,
          itemNm:"",
          enableIconUrl:"",
          disableIconUrl:""
        }
      );
      setIsEdit(false);
      setShowEditModal(true);
  }
  
  
  const renderButtons = (cell, row) => {
    return (
      <>
        <button  className="btn btn-success text-white" onClick={() => handleEdit(row)}>
          檢視 <BsFillEyeFill /> {/* 使用 React Icons 的 BsPencilSquare 圖示 */}
        </button>
        {
          //" "
        }
        {/*
        <button  className="btn btn-danger text-white" onClick={() => handleDelete(row)}>
          <BsTrash /> 
        </button>
        */}{/* 使用 React Icons 的 BsTrash 圖示 */}
        
      </>
    );
  };

  
  useEffect(() => {


    async function fetchMyAPI() {
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
  fetchMyAPI();

  }, [reRender]);


      const columns = [
        { dataField: 'groupNm', text: '獎項'  ,headerClasses: 'bg-primary  text-white text-center' , headerStyle: { width: '25%' }, style: { textAlign: 'center' }},
        { dataField: 'codeNm', text: '獎次' ,headerClasses: 'bg-primary  text-white text-center', headerStyle: { width: '20%' }, style: { textAlign: 'center' }},
        { dataField: 'showRow', text: '行列',headerClasses: 'bg-primary  text-white text-center' , headerStyle: { width: '10%' }, style: { textAlign: 'center' }},
        { dataField: 'quota', text: '名額',headerClasses: 'bg-primary  text-white text-center' , headerStyle: { width: '20%' }, style: { textAlign: 'center' }},
        { dataField: 'itemNm', text: '內容',headerClasses: 'bg-primary  text-white text-center' , headerStyle: { width: '25%' }, style: { textAlign: 'center' } },
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

      const handleModalChange = (e) => {
        const { name, value } = e.target;
        setRewardsModal((prevModal) => ({
          ...prevModal,
          [name]: value,
        }));
      };

      const doSaveRewardFrom = async () => {

        let sendData = rewardsModal;
        sendData.edit = isEdit;
        const response =  await doSaveRewards(sendData);
        console.log(response);
        if(response.code === '000'){
          setShowEditModal(false);
          setErrMessage(response.result);
          //setReRender(!reRender);
        }else{
          setErrMessage(response.message);
        }
        setShowAlert(true);

      }
               


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
                {isEdit?(<>獎項設定 修改</>) 
                :(<>獎項設定 新增</>)}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <>
              <div className="form-row">
                <div className="form-group col-md-6 col-6">
                  <label htmlFor="groupCd">獎項</label>
                  <Form.Select disabled 
                    name="groupCd"
                    aria-label="Default select example"
                    onChange={handleModalChange}
                    value={rewardsModal.groupCd || ""}
                  >
                    <option value="G01">網路報稅獎</option>
                    <option value="G02">手機報稅加碼獎</option>
                    <option value="G03">E化繳退稅加碼獎</option>
                  </Form.Select>
                </div>
                <div className="form-group col-md-6 col-6">
                  <label htmlFor="itemCd">獎次</label>
                  <Form.Select disabled 
                    name="itemCd"
                    aria-label="Default select example"
                    onChange={handleModalChange}
                    value={rewardsModal.itemCd || ""}
                  >
                    <option value="01">頭獎</option>
                    <option value="02">貳獎</option>
                    <option value="03">參獎</option>
                    <option value="04">肆獎</option>
                    <option value="05">伍獎</option>
                    <option value="06">陸獎</option>
                    <option value="90">普獎(90)</option>
                    <option value="91">普獎(91)</option>
                  </Form.Select>
                </div>
                <div className="form-group col-md-6 col-6">
                  <label htmlFor="showRow">行列</label>
                  <Form.Select disabled 
                    name="showRow"
                    aria-label="Default select example"
                    onChange={handleModalChange}
                    value={rewardsModal.showRow || ""}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </Form.Select>
                </div>
                <div className="form-group col-md-6 col-6">
                  <label htmlFor="quota">名額</label>
                  <input readOnly
                    name="quota"
                    type="text"
                    onChange={handleModalChange}
                    onKeyUp={(e) => (e.target.value = e.target.value.replace(/[^\d]/g, ""))}
                    className="form-control"
                    inputMode="numeric"
                    //onBlur={(e) => (e.target.value = irx.util.convertFullToHalfWidthText(e.target.value))}
                    autoComplete="off"
                    placeholder="100"
                    title="名額"
                    maxLength="10"
                    value={rewardsModal.quota || ""}
                  />
                </div>
                <div className="form-group col-md-12 col-12">
                  <label htmlFor="itemNm">名稱</label>
                  <input readOnly
                    name="itemNm"
                    type="text"
                    onChange={handleModalChange}
                    className="form-control"
                    //onBlur={(e) => (e.target.value = irx.util.convertFullToHalfWidthText(e.target.value))}
                    autoComplete="off"
                    placeholder="輸入名稱"
                    maxLength="20"
                    value={rewardsModal.itemNm || ""}
                  />
                </div>
                <div className="form-group col-md-12 col-12">
                <label for="enableIconUrl">未抽選按鈕圖</label>
                  <input name="enableIconUrl" type="text" onChange={handleModalChange} readOnly
                    onkeyup="value=value.replace(/[^\d]/g,'')" className="form-control"
                    inputmode="numeric"
                    onblur="this.value = irx.util.convertFullToHalfWidthText(this.value);"
                    autocomplete="off" placeholder="/party-games/assets/images/awards01.png" title="名額"
                    maxlength="4" goto="fiscModal_irc02_creditCardNo3" />                
                </div>
                <div className="form-group col-md-12 col-12">
                <label for="disableIconUrl">已抽選按鈕圖</label>
                  <input name="disableIconUrl" type="text" onChange={handleModalChange} readOnly
                    onkeyup="value=value.replace(/[^\d]/g,'')" className="form-control"
                    inputmode="numeric"
                    onblur="this.value = irx.util.convertFullToHalfWidthText(this.value);"
                    autocomplete="off" placeholder="/party-games/assets/images/awards01_atv.png" title="名額"
                    maxlength="4" goto="fiscModal_irc02_creditCardNo3" />                
                </div>                                
              </div>
              </>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={() => setShowEditModal(false)}>
              關閉
            </Button>
          </Modal.Footer>
          </Modal>          
            <Bootbox show={showAlert} 
              type={"alert"}  
              message={errMessage}  
              onClose={()=>{setShowAlert(false);}} 
            />
            {/*
            <div>
              <button className="btn btn-success" style={onTableButton} onClick={handleAdd}>
                新增獎項
              </button>                
            </div>        
           */
           }
            <div style={tableContainer}>                          
                <MyTable></MyTable>
            </div>
        </>
    );
 }
export default LotRewards;
