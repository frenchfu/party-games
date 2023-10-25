import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { actions } from './stores';
import { Select, Checkbox, Divider, Input  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { saveSolutionDetail, doUploadSolutionFiles } from 'apis/solutionApi';
import { useState, useRef, useEffect } from 'react';
import { actions as returnActions } from "components/ReturnMsgDialog/stores";
import { genFormData } from './genFormData'
import "./antd_custom.css";
import { createSolutionDownloadPath, getFileName, FILE_TYPE, checkImageWH } from 'utilities/fileUtils';
import { useNotify, useSysConfig } from 'utilities/useCustomHooks';

/* Styles */
import {
  DialogWrapper,
  DialogContent,
  ConfirmBlock,
  ListDetailBlock,
  CloseButton
} from './dialog.style';

import {
  SolutionPlanMainContent,
  CategorySettings
} from 'views/Register/SolutionPlan/solutionPlan.style';
import { API_RETURN_CODE } from 'apis/ReturnCodes';
import { SOLUTION_STATUS } from 'utilities/SystemStatus';

const SolutionDetailDialog = () => {
  const mode = useSelector(({solutionDetailDialog}) => solutionDetailDialog.mode);
  var listData = useSelector(({solutionDetailDialog}) => solutionDetailDialog.listData);
  const userInfo = useSelector(({login}) => login.userInfo);
  const uiConfigList = useSelector(({ sysConfig }) => sysConfig.UI_CONFIG_LIST) || {};
  const dispatch = useDispatch();
  
  const sysConfig = useSysConfig('solutionCategory');
  //const solCategory = useSolutionCategory( listData.zoneCode ,'solutionCategory'); 

  const notify = useNotify();
 
  /* --------- Ant Select Data --------- */
  const { Option } = Select;
  const [selectData, setSelectData] = useState({
    suitableIndustryList: listData.suitableIndustryList,
    suitableScaleList: listData.suitableScaleList,
    serviceAreaList: listData.serviceAreaList,
    serviceLimit: listData.serviceLimit,
    solutionSpecList: listData.solutionSpecList,
    tagsList: listData.tags || [],
    tagsAdmList: listData.tagsAdm || [],
    cate1: listData.cate1 || [], 
    cate2: listData.cate2 || [], 
    cate3: listData.cate3 || [], 
    cate4: listData.cate4 || [], 
    cate5: listData.cate5 || [], 
    cate6: listData.cate6 || [], 
  })
  const [tagsOptionList, setTagsOptionList] = useState(listData.tags) || [];
  const [newTags, setNewTags] = useState(null);
  const [solutionSpecCount, setSolutionSpecCount] = useState(listData.solutionSpecList.length);
  const [solutionSpecList, setSolutionSpecList] = useState(listData.solutionSpecList);
  const [pictureFile, setPictureFile] = useState(listData.picture);
  const [achievementFile, setAchievementFile] = useState(listData.achievementFile);
  const [iaasPaasFile, setIaasPaasFile] = useState(listData.iaasPaasFile);
  const [otherDocs, setOtherDocs] = useState(listData.otherDocs);
  const ban = listData.ban;
  const toggleBlockRef = useRef();
  const newTagsRef = useRef();


  useEffect(() => {
    toggleBlockRef.current.classList.toggle('open');
    if (listData.solutionStatus === SOLUTION_STATUS.OFF_LAUNCH) {
      notify('提示:', '編輯「已下架」的解決方案，需重新進行「審核流程」。')
    }
  }, [])

  const {     
    register,
    handleSubmit,
    formState: {errors}, 
  } = useForm();
  const handleClickCloseDialog = () => {
    dispatch (actions.closeDialog());
  };

    const uploadFiles = (uuid) => {
      const ban = userInfo.ban;
      // 代表這次才新增檔案
      if (pictureFile && pictureFile.name) {
        const picFormData = new FormData();
        picFormData.append(FILE_TYPE.picture, pictureFile);
        doUploadSolutionFiles(ban, uuid, FILE_TYPE.picture, picFormData);
      }
      // 代表這次才新增檔案
      if (iaasPaasFile && iaasPaasFile.name) {
        const iaasPaasFileData = new FormData();
        iaasPaasFileData.append(FILE_TYPE.iaasPaasFile, iaasPaasFile);
        doUploadSolutionFiles(ban, uuid, FILE_TYPE.iaasPaasFile, iaasPaasFileData);
      }
  
      // 代表這次才新增檔案
      if (achievementFile && achievementFile.name) {
        const achievementFileFormData = new FormData();
        achievementFileFormData.append(FILE_TYPE.achievementFile, achievementFile);
        doUploadSolutionFiles(ban, uuid, FILE_TYPE.achievementFile, achievementFileFormData);
      }
  
      // 代表這次才新增檔案
      if (otherDocs && otherDocs.name) {
        const otherDocsFormData = new FormData();
        otherDocsFormData.append(FILE_TYPE.otherDocs, otherDocs);
        doUploadSolutionFiles(ban, uuid, FILE_TYPE.otherDocs, otherDocsFormData)
      }
    }

    const handleOpenReview = async(data) => {
      data.mode = 'draft';
      const result = {...data, ...selectData,pictureFile,achievementFile,iaasPaasFile,otherDocs,ban,solutionSpecCount};
      if (!isValidCategorySize()) {
        return;
      }
      let bodyFormData = genFormData(result);
      /* 將 Content-Type 設定為 "multipart/form-data" */
      let token = sessionStorage.getItem('jwtKey');
      const config = {
        headers: {
          "authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
      const response = await saveSolutionDetail(bodyFormData, config);
      if(response.apiCode === API_RETURN_CODE.SUCCESS) {
        uploadFiles(listData.uuid);
        window.open(process.env.REACT_APP_URL + '/perviewSolution/'+ listData.uuid +'/'+sessionStorage.getItem('jwtKey'),'_blank')
      } else {
        dispatch(returnActions.openDialog("renderSave",  { msg: response.apiMessage }));
      }
    };

  // 子分類數量限制: x <= 3
  const isValidCategorySize = () => {
    const collection = [
      ...selectData.cate1,
      ...selectData.cate2,
      ...selectData.cate3,
      ...selectData.cate4,
      ...selectData.cate5,
      ...selectData.cate6,
    ]

    if (collection.length > 3) {
      notify('子分類最多只能選擇3個');
      return false;
    }
    return true;
  }

  const draft = async(data) => {
    data.mode = 'draft';
    const result = {...data, ...selectData,pictureFile,achievementFile,iaasPaasFile,otherDocs,ban,solutionSpecCount};

    if (!isValidCategorySize()) {
      return;
    }

    let bodyFormData = genFormData(result);
    /* 將 Content-Type 設定為 "multipart/form-data" */
    let token = sessionStorage.getItem('jwtKey');
    const config = {
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }
    const response = await saveSolutionDetail(bodyFormData, config);
    if(response.apiCode === API_RETURN_CODE.SUCCESS) {
      uploadFiles(listData.uuid);
      dispatch(returnActions.openDialog("renderSave",  { msg: response.apiMessage }));
      dispatch(actions.closeDialog());
    } else {
      dispatch(returnActions.openDialog("renderSave",  { msg: response.apiMessage }));
    }
  }
    // 完整資料 (包含 Select)
  const review = async (data) => {
    // ----- Submit form -----
    data.mode = 'review'
    const result = {...data, ...selectData,pictureFile,achievementFile,iaasPaasFile,otherDocs,ban,solutionSpecCount};
    let bodyFormData = genFormData(result);
    /* 將 Content-Type 設定為 "multipart/form-data" */
    let token = sessionStorage.getItem('jwtKey');
    const config = {
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }

    if (!isValidCategorySize()) {
      return;
    }

    const response = await saveSolutionDetail(bodyFormData, config);
    if(response.apiCode === API_RETURN_CODE.SUCCESS) {
      uploadFiles(listData.uuid);
      dispatch(returnActions.openDialog("renderSave",  { msg: response.apiMessage }));
      dispatch(actions.closeDialog());
    } else {
      dispatch(returnActions.openDialog("renderSave",  { msg: response.apiMessage }));
    }
  };

  const hanldeTagOnChange = (e) => {
      setNewTags(e.target.value);
  }

  const addNewTags = () => {
    if (newTags) {
      const tagsList = [...tagsOptionList];
      tagsList.push(newTags);  
      setTagsOptionList([...new Set(tagsList)]);
      setNewTags('');
    }
  }

  const handleClickDeleteSpec = ( element ) => {
    const newSolutionSpecList = solutionSpecList.filter((val , inx) => {
      return inx != element
    });
    setSolutionSpecList(newSolutionSpecList);
    setSolutionSpecCount(prevCount => prevCount - 1);
  };

  const createSkuBlock = (count) => {
    const newIndex = count + 1;
    const currentSolutionSpecList = solutionSpecList;
    const solutionSpecElement = {
      specName : '',
      price : '',
      period : '',
      numData : '',
      numClient : '',
    }
    currentSolutionSpecList.push(solutionSpecElement);
    setSolutionSpecList(currentSolutionSpecList);
  }

  const handleSolutionImageOnChange = async(e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;

      var allowedExtensions =  /(\.jpg|\.bmp|\.png|\.gif)$/i;

      if (!allowedExtensions.exec(fileName)) {
          notify('請確認檔案類型，僅允許.jpg/.png/.gif/.bmp')
          return;
      } 

      const isValid = await checkImageWH(file, 1248, 656);

      if (!isValid) {
        notify('請確認圖片長、寬範圍，介於1248 x 656px');
        return;
      }

      setPictureFile(e.target.files[0]);
    }
  };

  const handleUploadAchievementFileOnChange = e => {
    setAchievementFile(e.target.files[0]);
  };
  
  const handleUploadIaasPaasFileOnChange = e => {
    setIaasPaasFile(e.target.files[0]);
  };
  
  const handleUploadOtherDocsOnChange = e => {
    setOtherDocs(e.target.files[0]);
  };

  const handleClickToggleControl = () => {
    toggleBlockRef.current.classList.toggle('open');
    var span = document.getElementById("span1");
    if (span.textContent === "-") {
      span.textContent = "+";
    } else {
      span.textContent = "-";
    }
  };

  const handleClickCreateSkuBlock = () => {
    setSolutionSpecCount(prevCount => prevCount + 1);
    createSkuBlock(solutionSpecCount)
  }

  const MessageContent =({title, value, isVisible}) => {
    if (!isVisible)
      return null;
    
    return(
      <div className="inputItem">
        <label style={{color: '#FF1313'}}>{title}</label>
        <textarea
          defaultValue={value}
          disabled
        />
      </div>  
    )
  }    

  /* ----- render blocks ----- */
  const renderListDetail = () => {
    const { uuid, solutionStatus, discontinuedMsg, rejectMsg, stopSaleMsg, solutionName, solutionEName, intro, suitableIndustryList ,suitableIndustryO, 
            suitableScaleList, serviceAreaList, serviceAreaO, serviceLimit,
            spec, marketingPlan, achievement, feature, specName, price, solDesc, discountPlan,succCase,
            iaasPaas,  portablePlan, demoUrl, moreInfo,  pictureDesc,
            massiveConn, massiveCal, flexibleScheduling, uninterruptedService, loadBalance, infoSecurity, isContractSigned, otherSpec, solutionBatch
          } = listData;
    return (
      <SolutionPlanMainContent>
        <form>
          <input type="hidden" defaultValue={uuid} {...register('uuid')}></input>
          <div>
            <div className="contentTitleBlock">
              <h3 className="contentTitle lg">
                編輯解決方案
              </h3>
            </div>

            <MessageContent 
              title="退件原因"
              value={rejectMsg}
              isVisible={solutionStatus === SOLUTION_STATUS.REJECT}
            />

            <MessageContent 
              title="下架原因"
              value={discontinuedMsg}
              isVisible={solutionStatus === SOLUTION_STATUS.OFF_LAUNCH}
            />

            <MessageContent 
              title="停售原因"
              value={stopSaleMsg}
              isVisible={solutionStatus === SOLUTION_STATUS.STOPSALE}
            />

            <div className="inputItem">
              <label className="requiredLabel" >解決方案中文名稱</label>
              { errors.solutionName && <span className="error">{errors.solutionName.message}</span> }
              <input readOnly maxLength={60} type="text" defaultValue={solutionName} 
              {...register('solutionName')}
               />
            </div>

            <div className="inputItem">
              <label>解決方案英文名稱</label>
              <input readOnly={(isContractSigned && solutionBatch !== uiConfigList.CAN_EDIT_BATCH_NO)} type="text" maxLength={60} defaultValue={solutionEName} {...register('solutionEName', {
                pattern: {
                  value: /^[a-zA-Z0-9\uFF10-\uFF19\uFF41-\uFF5A\uFF21-\uFF3A_()&amp;＆＿～－.,．－~!@#$%^&*(),\s　\-]+$/,
                  message: '請輸入英文'
                }
              })} />
              { errors.solutionEName && <span className="error">{errors.solutionEName.message}</span> }
            </div>

            <CategorySettings>
              <div className="toggleControl" onClick={handleClickToggleControl}>
                <p >主分類<font color="red">*</font><font>  (最多只能選取3個子分類項目)</font>
                <span id="span1">-</span></p>
              </div>

              <div className="toggleBlock" ref={toggleBlockRef}>
                <div>
                  <label>{( sysConfig && sysConfig.data && sysConfig.data.A[0].value1) || '網路開店'}</label>
                  <Select
                    mode="multiple"
                    size="default"
                    placeholder="請選擇子分類項目"
                    // 要預先載入的選項請放在 defaultValue，資料型別需是陣列，可以打開下方註解看效果
                    // defaultValue={['1212', '1214']}
                    // defaultValue={newServiceAreaList}
                    onChange={(value) => setSelectData({...selectData, cate1: value})}
                    defaultValue={selectData.cate1}
                  >
                    {
                      sysConfig && sysConfig.data && sysConfig.data.A && 
                      sysConfig.data.A.map(item => {
                        return <Option value={item.key2}>{item.value2}</Option>
                      })
                    }
                    {/* <Option value="1212">電商/網購平台</Option>
                    <Option value="1213">行動支付</Option>
                    <Option value="1214">信用卡/票證</Option>
                    <Option value="1215">電子發票</Option> */}
                  </Select>
                </div>

                <div>
                  <label>{(sysConfig && sysConfig.data && sysConfig.data.B[0].value1) || '行銷推廣'}</label>
                  <Select
                    mode="multiple"
                    size="default"
                    placeholder="請選擇子分類項目"
                    // 要預先載入的選項請放在 defaultValue，資料型別需是陣列，可以打開下方註解看效果
                    // defaultValue={['子分類 1', '子分類 2']}
                    onChange={(value) => setSelectData({...selectData, cate2: value})}
                    defaultValue={selectData.cate2}
                  >
                    {
                      sysConfig && sysConfig.data && sysConfig.data.B && 
                      sysConfig.data.B.map(item => {
                        return <Option value={item.key2}>{item.value2}</Option>
                      })
                    }
                    {/* <Option value="1222">數位廣告</Option>
                    <Option value="1223">SEO</Option>
                    <Option value="1224">社群內容管理操作</Option>
                    <Option value="1225">行銷媒合/KOL</Option>
                    <Option value="1226">電子報/EDM</Option> */}
                  </Select>
                </div>
                <div>
                  <label>{(sysConfig && sysConfig.data && sysConfig.data.C[0].value1) || '遠距辦公與文書'}</label>
                  <Select
                    mode="multiple"
                    size="default"
                    placeholder="請選擇子分類項目"
                    // 要預先載入的選項請放在 defaultValue，資料型別需是陣列，可以打開下方註解看效果
                    // defaultValue={['子分類 1', '子分類 2']}
                    onChange={(value) => setSelectData({...selectData, cate3: value})}
                    defaultValue={selectData.cate3}
                  >
                    {
                      sysConfig && sysConfig.data && sysConfig.data.C && 
                      sysConfig.data.C.map(item => {
                        return <Option value={item.key2}>{item.value2}</Option>
                      })
                    }
                    {/* <Option value="1232">遠端協作</Option>
                    <Option value="1233">線上會議</Option>
                    <Option value="1234">文書處理軟體</Option> */}
                  </Select>
                </div>
                <div>
                  <label>{(sysConfig && sysConfig.data && sysConfig.data.D[0].value1) || '企業管理'}</label>
                  <Select
                    mode="multiple"
                    size="default"
                    placeholder="請選擇子分類項目"
                    // 要預先載入的選項請放在 defaultValue，資料型別需是陣列，可以打開下方註解看效果
                    // defaultValue={['子分類 1', '子分類 2']}
                    onChange={(value) => setSelectData({...selectData, cate4: value})}
                    defaultValue={selectData.cate4}
                  >
                    {
                      sysConfig && sysConfig.data && sysConfig.data.D && 
                      sysConfig.data.D.map(item => {
                        return <Option value={item.key2}>{item.value2}</Option>
                      })
                    }
                    {/* <Option value="1242">CRM客戶管理系統</Option>
                    <Option value="1243">ERP系統</Option>
                    <Option value="1244">防毒軟體</Option>
                    <Option value="1245">POS整合系統</Option>
                    <Option value="1246">人資管理</Option>
                    <Option value="1247">生產/物流管理</Option>
                    <Option value="1248">財會管理</Option>
                    <Option value="1249">進銷存系統</Option> */}
                  </Select>
                </div>
                <div>
                  <label>{(sysConfig && sysConfig.data && sysConfig.data.E[0].value1) || '客戶服務'}</label>
                  <Select
                    mode="multiple"
                    size="default"
                    placeholder="請選擇子分類項目"
                    // 要預先載入的選項請放在 defaultValue，資料型別需是陣列，可以打開下方註解看效果
                    // defaultValue={['子分類 1', '子分類 2']}
                    onChange={(value) => setSelectData({...selectData, cate5: value})}
                    defaultValue={selectData.cate5}
                  >
                    {
                      sysConfig && sysConfig.data && sysConfig.data.E && 
                      sysConfig.data.E.map(item => {
                        return <Option value={item.key2}>{item.value2}</Option>
                      })
                    }
                    {/* <Option value="1252">客戶互動</Option>
                    <Option value="1253">線上客服</Option>
                    <Option value="1254">線上預約</Option>
                    <Option value="1255">簡訊系統</Option>
                    <Option value="1256">會員/點數系統</Option> */}

                  </Select>
                </div>
                <div>
                  <label>{(sysConfig && sysConfig.data && sysConfig.data.F[0].value1) || '市場分析'}</label>
                  <Select
                    mode="multiple"
                    size="default"
                    placeholder="請選擇子分類項目"
                    // 要預先載入的選項請放在 defaultValue，資料型別需是陣列，可以打開下方註解看效果
                    // defaultValue={['子分類 1', '子分類 2']}
                    onChange={(value) => setSelectData({...selectData, cate6: value})}
                    defaultValue={selectData.cate6}
                  >
                    {
                      sysConfig && sysConfig.data && sysConfig.data.F && 
                      sysConfig.data.F.map(item => {
                        return <Option value={item.key2}>{item.value2}</Option>
                      })
                    }
                    {/* <Option value="1262">大數據分析</Option>
                    <Option value="1263">輿情分析</Option>
                    <Option value="1264">市場調查</Option>
                    <Option value="1265">問券分析</Option> */}

                  </Select>
                </div>
              </div>
            </CategorySettings>

            <CategorySettings>
              <div>
                <label>標籤</label><font color="red">*</font>
                {/* <input type="text" {...register('tags')} /> */}                                          
                <Select
                  disabled={(isContractSigned && solutionBatch !== uiConfigList.CAN_EDIT_BATCH_NO)}
                  placeholder="自訂標籤"
                  mode="multiple" 
                  defaultValue={selectData.tagsList}
                  onChange={(value) => {setSelectData({...selectData, tagsList: value})}}
                  onClick={() => { newTagsRef.current.focus() }}
                  dropdownRender={menu => (
                    <div>
                      {menu}
                      <Divider style={{ margin: '4px 0' }} />
                      <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                        <Input ref={newTagsRef} style={{ flex: 'auto' }} value={newTags} onChange={hanldeTagOnChange} />
                        <a
                          style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                          onClick={addNewTags}
                        >
                          <PlusOutlined />新增標籤
                        </a>
                      </div>
                    </div>
                  )}
                >
                  {tagsOptionList.map(item => (
                    <Option key={item}>{item}</Option>
                  ))}
                </Select>
              </div>
            </CategorySettings>

            
              <label className="requiredLabel" >新增解決方案圖片<font color="red">*</font></label>
              <div className="inputItem">  
              <div className="uploadButtonBlock">
                <input
                  type="file"
                  id="uploadPicture"
                  onChange={handleSolutionImageOnChange}
                  onClick={(event)=> { 
                    event.target.value = null
                  }}
                  accept=".jpg, .png, .gif, .bmp"
                />
                <label htmlFor="uploadPicture" className="button">
                  上傳圖片
                </label>
                &nbsp;&nbsp;檔名：{ 
                  pictureFile && pictureFile.name
                    ? <a href="#">{ pictureFile.name }</a> 
                    : <a href={getFileName(pictureFile) ? createSolutionDownloadPath(userInfo.ban, listData.uuid, FILE_TYPE.picture, getFileName(pictureFile)) : '#' }>{ getFileName(pictureFile)}</a> 
                }
              </div>
              <div style={{transform: 'translateY(10px)', color: '#777777'}}>圖檔大小：1248x656px，檔案格式：.jpg/.png/.gif/.bmp</div>
            </div>

            <div className="inputItem">
              <label className="requiredLabel">圖片說明（alt）</label>
              <input type="text" maxLength={60} defaultValue={pictureDesc} {...register('pictureDesc')} />
            </div>

            {/* <div className="inputItem">
              <label>方案簡介</label>
              <textarea
                placeholder="請自由說明本方案內容，內文會直接呈現在前台網站，審核通過後可以預覽編修 （HTML 編輯器）"
                defaultValue={intro} {...register('intro')}
                readOnly
              />
            </div> */}
          </div>
          <div>
          <div className="skuBlock"/>
            <div className="contentTitleBlock">
              <h3 className="contentTitle lg">請說明您的服務適合怎樣的客戶</h3>
              <p>
                本站設置有推薦系統，請說明您的解決方案，什麼樣的企業來用，會最符合需求
              </p>
            </div>
            {/* <CategorySettings>
              <label >方案可服務能量上限</label>
              <Select
                size={ 'large' }
                id="serviceLimit"
                defaultValue={serviceLimit}
                onChange={(value) => setSelectData({...selectData, serviceLimit: value})}
                disabled
              >
                <Option value="1">1~10家</Option>
                <Option value="2">11~100家</Option>
                <Option value="3">101~200家</Option>
                <Option value="4">201~300家</Option>
                <Option value="5">301~400家</Option>
                <Option value="6">401~500家</Option>
                <Option value="7">501家以上</Option>
              </Select>
            </CategorySettings> */}

            <CategorySettings >
              <label >方案適用行業別</label>
              <Select
                mode="multiple"
                id="suitableIndustryList"
                defaultValue={suitableIndustryList}
                onChange={(value) => setSelectData({...selectData, suitableIndustryList: value})}
                disabled
              >
                <Option value="1">不限產業</Option>
                <Option value="2">製造業</Option>
                <Option value="3">批發零售業</Option>
                <Option value="4">住宿及餐飲業</Option>
                <Option value="5">運輸及倉儲物流</Option>
                <Option value="6">出版、影音、傳播及資通服務業</Option>
                <Option value="7">教育業</Option>
                <Option value="8">藝術娛樂休閒</Option>
                <Option value="9">金融保險</Option>
                <Option value="10">醫療</Option>
                <Option value="11">營建工程</Option>
                <Option value="12">其他</Option>
              </Select>
            </CategorySettings>

            <div className="inputItem">
              <label>方案適用行業別-其他</label>
              <input readOnly type="text" defaultValue={suitableIndustryO} {...register('suitableIndustryO')} />
            </div>

            <CategorySettings>
              <label >方案適用企業規模</label>
              <Select
                mode="multiple"
                defaultValue={suitableScaleList}
                onChange={(value) => setSelectData({...selectData, suitableScaleList: value})}
                disabled
              >
                <Option value="1">9人以下</Option>
                <Option value="2">10~20人</Option>
                <Option value="3">21~50人</Option>
                <Option value="4">51~100人</Option>
                <Option value="5">101~200人</Option>
              </Select>
            </CategorySettings>

            <CategorySettings>
              <label >推廣服務區域</label>
              <Select
                mode="multiple"
                defaultValue={serviceAreaList}
                onChange={(value) => setSelectData({...selectData, serviceAreaList: value})}
                disabled
              >
                <Option value="1">北北基</Option>
                <Option value="2">桃竹苗</Option>
                <Option value="3">中彰投</Option>
                <Option value="4">雲嘉南</Option>
                <Option value="5">高屏</Option>
                <Option value="6">宜花東</Option>
                <Option value="7">離島</Option>
              </Select>
            </CategorySettings>

            <div className="inputItem">
              <label>推廣服務區域-離島</label>
              <input readOnly type="text" defaultValue={serviceAreaO} {...register('serviceAreaO')} />
            </div>

            <div className="inputItem">
              <label className="requiredLabel">方案簡要說明</label>
              <textarea
                  readOnly={(isContractSigned && solutionBatch !== uiConfigList.CAN_EDIT_BATCH_NO)}
                  defaultValue={solDesc} {...register('solDesc')}
              />
            </div>

            <div className="inputItem">
              <label className="requiredLabel" >功能規格、性能（180 字以內）</label>
              <textarea
                readOnly={(isContractSigned && solutionBatch !== uiConfigList.CAN_EDIT_BATCH_NO)}
                placeholder="請提供本解決方案的功能、使用方式、效能等資訊"
                maxLength="180"
                defaultValue={spec} {...register('spec')}
              />
            </div>

            <div className="inputItem">
              <label className="requiredLabel" >特色（300 字以內）</label>
              <textarea
                readOnly={(isContractSigned && solutionBatch !== uiConfigList.CAN_EDIT_BATCH_NO)}
                placeholder="請提供本解決方案的功能、使用方式、效能等資訊"
                maxLength="300"
                defaultValue={feature} {...register('feature')}
              />
            </div>

            <div className="inputItem">
              <label className="requiredLabel" >成功應用案例（300 字以內）</label>
              <textarea
                // readOnly={(isContractSigned && solutionBatch !== uiConfigList.CAN_EDIT_BATCH_NO)}
                placeholder="請用客戶案例說明如何應用方案提升中小微企業營運效率或增加客戶/營收之效益"
                maxLength="300"
                defaultValue={succCase} {...register('succCase')}
              />
            </div>
          </div>
          
          <div className="skuBlock"/>

          <div id="skuMaster">
            <div className="contentTitleBlock">
              <h3 className="contentTitle lg">採購規格（SKU）</h3>
              <p>
                若您的解決方案，可以用使用時間（月份為單位）、資料存取數量、使用者人數來計價採購 您可以使用本功能來制定不同的採購單位，以因應不同企業的需求
              </p>
            </div>

            <div className="skuBlock">
              <div className="twoColumn">
                {/* <div className="inputItem">
                  <label>市價（TWD）</label>
                  <input
                    type="number" defaultValue={price} {...register('price')}
                    placeholder="例：50000"
                  />
                </div> */}
                {/* <div className="inputItem">
                  <label>市價銷售連結：</label>
                  <input
                    type="text" {...register('skuMarketLink')}
                    placeholder="例：https://abc.com"
                  />
                </div> */}
              </div>

              <div className="inputItem">
                <label className="requiredLabel">優惠措施（100 字內）</label>
                <textarea
                  readOnly={(isContractSigned && solutionBatch !== uiConfigList.CAN_EDIT_BATCH_NO)}
                  placeholder="例如：續約優惠價格與期程、加購優惠等，字數100以內"
                  maxLength="100"
                  defaultValue={discountPlan} {...register('discountPlan')}
                />
              </div>

              {/* <div className="inputItem">
                <label>本站售價（TWD）</label>
                <input
                  type="number" {...register('skuPrice')}
                  placeholder="例：45000"
                />
              </div> */}
            </div>

            { solutionSpecList && solutionSpecList.map((item, index) => (
              <div className="skuBlock" key={index} >
                <input type="hidden" defaultValue={item.uuid} {...register(`specUuid${index}`)} />
                <div className="inputItem">
                  <div className="twoColumn">
                    <label className="requiredLabel">規格名稱</label>
                    {/* { index > 0  && index === solutionSpecList.length-1 ?  
                      <div className="nextStepButton button" _inx={index} onClick={()=>{handleClickDeleteSpec(index)}}>刪除規格</div>
                      : ""
                    } */}
                  </div>
                  <br/>
                    <input
                      readOnly={(isContractSigned && solutionBatch !== uiConfigList.CAN_EDIT_BATCH_NO)}
                      type="text" maxLength={30} defaultValue={item.specName} {...register(`specName${index}`)}
                    />
                </div>
                <div className="twoColumn">
                  <div className="inputItem">
                    <label className="requiredLabel">價格</label>
                    <input
                      readOnly={(uiConfigList && uiConfigList.CAN_SPEC_PRICE_EDIT !== 'Y')}
                      type="text" defaultValue={item.price} {...register(`price${index}`, {
                        pattern: { value: /^[0-9]+$/, message: '請輸入數字' }})}
                      placeholder="例：45000"                      
                    />
                    { errors[`price${index}`] && <span className="error">{errors[`price${index}`].message}</span> }
                  </div>
                  <div className="inputItem">
                    <label>使用期限</label>
                    <div className="oneColumn">
                      <input
                        type="number" defaultValue={item.period} {...register(`period${index}`)}
                        placeholder="例：5"
                        readOnly={true}
                        // 2021/10 因點數比例調整，才暫時性開放
                        // readOnly={(isContractSigned && solutionBatch !== uiConfigList.CAN_EDIT_BATCH_NO)}
                      />
                      <span>個月</span>
                    </div>
                  </div>
                </div>
                <div className="twoColumn">   
                  <div className="inputItem">
                    <label className="requiredLabel">資料筆數</label>
                    <input
                      type="number" readOnly defaultValue={item.numData} {...register(`numData${index}`)}
                    />
                  </div>              
                  <div className="inputItem">
                    <label className="requiredLabel">使用人數</label>
                    <input
                      type="number" readOnly defaultValue={item.numClient} {...register(`numClient${index}`)}
                    />
                  </div>                 
                </div>       
                {
                  index === solutionSpecList.length -1 &&
                  <div className="inputItem">
                    <label>其他規格（50 字內）</label>
                    <textarea
                      maxLength="50"
                      defaultValue={otherSpec}
                      readOnly={(isContractSigned && solutionBatch !== uiConfigList.CAN_EDIT_BATCH_NO)}
                      {...register('otherSpec')}
                    />
                  </div>
                }
              </div>
            )) 
            }
            {/* { solutionSpecList.length <= 4 ? (
              <div className="button" onClick={handleClickCreateSkuBlock}>新增其他規格</div>
            ):("")} */}
          </div>

          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">方案行銷推廣能量</h3>
          </div>

          <div className="inputItem">
              <label>行銷推廣計畫</label>
              <textarea
                placeholder="例如透過經銷商地推網絡，字數300以內"
                maxLength="300"
                defaultValue={marketingPlan} {...register('marketingPlan')}
                readOnly
              />
          </div>

          <div className="inputItem">
            <label>方案市場實績</label>
            <textarea
              placeholder="請說明此方案有效付費客戶數、客戶性質、銷售額等，字數100以內，並上傳合約或銷售發票影本掃描檔以資證明"
              maxLength="100"
              readOnly
              defaultValue={achievement} {...register('achievement')}
            />
          </div>

          <div className="inputItem">
            <div className="uploadButtonBlock">
              {/* <input
                type="file"
                id="uploadAchievementFile"
                onChange={handleUploadAchievementFileOnChange}
                disabled
              />
              <label htmlFor="uploadAchievementFile" className="button">
                上傳檔案 <font color="red">*</font>
              </label> */}
              &nbsp;&nbsp;   檔名：{ 
                  achievementFile && achievementFile.name
                    ? <a href="#">{ achievementFile.name }</a> 
                    : <a href={getFileName(achievementFile) ? createSolutionDownloadPath(userInfo.ban, listData.uuid, FILE_TYPE.achievementFile, getFileName(achievementFile)) : '#' }>{ getFileName(achievementFile)}</a> 
                }		
            </div>
          </div>

          <div className="skuBlock"/>
          {/* <div className="contentTitleBlock">
              <h3 className="contentTitle lg">方案技術服務能量</h3>
          </div>

          TODO 6320 GOOGLESHEET: 34

          <div className="skuBlock"/> */}
          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">雲平台架構(IasS/PaaS)</h3>
          </div>
          <div className="inputItem">
            <textarea
              placeholder="請說明雲端方案架構及主機使用說明或上傳圖檔，字數300以內"
              maxLength="300"
              defaultValue={iaasPaas} {...register('iaasPaas')}
              readOnly
            />
          </div>
          <div className="inputItem">
            <div className="uploadButtonBlock">
              {/* <input
                type="file"
                id="uploadIaasPaasFile"
                onChange={handleUploadIaasPaasFileOnChange}
                disabled
              />
              <label htmlFor="uploadIaasPaasFile" className="button">
                上傳檔案<font color="red">*</font>
              </label> */}
              &nbsp;&nbsp;  檔名：{ 
                  iaasPaasFile && iaasPaasFile.name
                    ? <a href="#">{ iaasPaasFile.name }</a> 
                    : <a href={getFileName(iaasPaasFile) ? createSolutionDownloadPath(userInfo.ban, listData.uuid, FILE_TYPE.iaasPaasFile, getFileName(iaasPaasFile)) : '#' }>{ getFileName(iaasPaasFile)}</a> 
                }	
            </div>
          </div>

          <div className="skuBlock"/>
          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">客戶資料可攜/移轉之規劃</h3>
          </div>
          <div className="inputItem">
            <textarea
              placeholder="請說明如客戶終止訂閱，其於雲端上儲存之資料可如何移轉或攜至其他雲端方案，字數300以內"
              maxLength="300"
              readOnly
              defaultValue={portablePlan} {...register('portablePlan')}
            />
          </div>


          <div className="skuBlock"/>
          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">方案操作演示說明影片<font color="red">*</font></h3>
              <p>請填連結網址，影片長度2~5分鐘</p>
              <div className="inputItem">
                <input maxLength={100} type="text" defaultValue={demoUrl}                
                  {
                    ...register('demoUrl', {
                      pattern: {
                        value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i,
                        message: "請確認網址格式，以http或https開頭"
                      }
                    }) 
                  }
                />
              </div>
              { errors.demoUrl && <span className="error">{errors.demoUrl.message}</span> }

          </div>

          <div className="skuBlock"/>
          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">其他附加說明項目</h3>
              <div className="inputItem">
                <textarea
                  placeholder="可附加服務導入說明文字(字數100以內)或影片(連結網址)"
                  maxLength="100"
                  defaultValue={moreInfo} {...register('moreInfo')}
                  readOnly
                />
            </div>
          </div>


          <div className="skuBlock"/>
          <div className="contentTitleBlock">
            <h3 className="contentTitle lg">雲端解決方案技術特性說明</h3>
            <div className="inputItem">
            <label>大量連線</label>
            <p>請說明雲端架構及系統效能規劃，產品遇大量連線之承載量服務水準，字數300以內</p>
            <textarea
              placeholder=""
              maxLength="300"
              defaultValue={massiveConn} {...register('massiveConn')}
              readOnly
            />
            </div>
            <div className="inputItem">
            <label>大量計算</label>
            <p>請說明雲端架構及系統效能規劃，系統能承受多少用戶同時連線運算或處理，字數300以內</p>
            <textarea
              placeholder="請輸入"
              maxLength="300"
              defaultValue={massiveCal} {...register('massiveCal')}
              readOnly
            />
            </div>
            <div className="inputItem">
            <label>資源彈性調度111111</label>
            <p>請說明雲端架構是否具有彈性資源調度功能，當量大時是否增長資源，量小縮減資源，字數300以內</p>
            <textarea
              placeholder="請輸入"
              maxLength="300"
              defaultValue={flexibleScheduling} {...register('flexibleScheduling')}
              readOnly
            />
            </div>
            <div className="inputItem">
            <label>服務不中斷</label>
            <p>請說明雲端架構是否具有服務不中斷功能之偵測、系統故障仍能持續服務之穩定性，字數300以內</p>
            <textarea
              placeholder="請輸入"
              maxLength="300"
              defaultValue={uninterruptedService} {...register('uninterruptedService')}
              readOnly
            />
            </div>
            <div className="inputItem">
            <label>雲端負載機制</label>
            <p>請說明系統於真實網路(三大電信)環境下整體效能表現，並確保負載平衡機制可正常運行並使使用者感受達到SLA水準，字數300以內</p>
            <textarea
              placeholder="請輸入"
              maxLength="300"
              defaultValue={loadBalance} {...register('loadBalance')}
              readOnly
            />
            </div>
            <div className="inputItem">
            <label>資安風險</label>
            <p>請說明下列項目是否無中高度以上資安風險：程式碼檢測、網站弱點掃描、主機弱點掃描、APP資安檢測、滲透測試、第三方開源元件安全及授權，字數500以內</p>
            <textarea
              placeholder="請輸入"
              maxLength="500"
              defaultValue={infoSecurity} {...register('infoSecurity')}
              readOnly
            />
            </div>
          </div>

          <div className="inputItem">
            <label>其他</label>
            <p>如有相關認證請上傳掃描檔案(檔名請標註文件及公司名稱)</p>
            <div className="uploadButtonBlock">
              {/* <input
                type="file"
                id="uploadRecords"
                onChange={handleUploadOtherDocsOnChange}
                disabled
              />
              <label htmlFor="uploadRecords" className="button">
                上傳檔案
              </label> */}
              &nbsp;&nbsp;檔名：{ 
                  otherDocs && otherDocs.name
                    ? <a href="#">{ otherDocs.name }</a> 
                    : <a href={getFileName(otherDocs) ? createSolutionDownloadPath(userInfo.ban, listData.uuid, FILE_TYPE.otherDocs, getFileName(otherDocs)) : '#' }>{ getFileName(otherDocs)}</a> 
                }		
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'flexEnd !important'}}>
            <div className="nextStepButton button" onClick={handleSubmit(draft)}>暫存解決方案</div>
            <div className="nextStepButton button" onClick={handleSubmit(review)}>送出審查</div>
            <div className="nextStepButton button" onClick={handleClickCloseDialog}>不儲存離開</div>
          </div>
          <div>
            <div className="nextStepButton button" onClick={handleSubmit(handleOpenReview)}>暫存並預覽畫面</div>
          </div>
        </form>
      </SolutionPlanMainContent>
    )
  }

  return (
    <DialogWrapper>
      <DialogContent>
        { mode === 'detail' ? (
            renderListDetail()
        ):("")}
        <CloseButton onClick={handleClickCloseDialog}>×</CloseButton>
      </DialogContent>
    </DialogWrapper>
  );
};

export default SolutionDetailDialog;
