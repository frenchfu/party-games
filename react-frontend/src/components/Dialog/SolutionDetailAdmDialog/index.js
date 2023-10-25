import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { actions } from './stores';
import { Select, Divider, Input } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { doChangeStatusSolution,  saveSolutionTags } from 'apis/solutionApi';
import { useSysConfig  } from 'utilities/useCustomHooks';
import { createSolutionDownloadPath, getFileName, FILE_TYPE , createSimpleSolutionDownloadPath} from 'utilities/fileUtils';
import { useNotify, useConfirmDialog } from "utilities/useCustomHooks";
import { genFormData } from './genFormData';
import { PlusOutlined } from '@ant-design/icons';
import { actions as returnActions } from "components/ReturnMsgDialog/stores";

/* Styles */
import {
  DialogWrapper,
  DialogContent,
  ListDetailBlock,
  CloseButton
} from './dialog.style';

import {
  SolutionPlanMainContent,
  CategorySettings
} from 'views/Register/SolutionPlan/solutionPlan.style';
import { ROLE_TYPE } from 'utilities/RoleConstant';
import { API_RETURN_CODE } from 'apis/ReturnCodes';
import { SOLUTION_STATUS } from 'utilities/SystemStatus';
import ConfirmDialog from 'components/Dialog/ConfirmDialog';


const RequiredFont = () => (
  <font style={{color:'red'}}>*</font>
)

const SolutionDetailAdmDialog = ({onRefresh}) => {
  var listData = useSelector(({solutionDetailAdmDialog}) => solutionDetailAdmDialog.listData) || {};
  const triggerType = useSelector(({solutionDetailAdmDialog}) => solutionDetailAdmDialog.triggerType) || null;
  const userInfo = useSelector(({login}) => login.userInfo);
  const dispatch = useDispatch();
  
  const sysConfig = useSysConfig('solutionCategory');
  // const solCategory = useSolutionCategory( listData.zoneCode ,'solutionCategory'); 

  const [tagsAdmOptionList, setTagsAdmOptionList] = useState(listData.tagsAdm) || [];
  const [newTagsAdm, setNewTagsAdm] = useState(null);
  const newTagsAdmRef = useRef();

  const uiConfigList = useSelector(({ sysConfig }) => sysConfig.UI_CONFIG_LIST) || {};

  /* --------- Ant Select Data --------- */

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
 
  const { Option } = Select;
  const toggleBlockRef = useRef();
  const notify = useNotify();
  const { confirmDialogOpen, setConfirmDialogOpen, toggle}  = useConfirmDialog();

  useEffect(() => {
    toggleBlockRef.current.classList.toggle('open');
  }, [])

  const {     
    register,
    handleSubmit,
    formState: {errors}, 
  } = useForm();
  const handleClickCloseDialog = () => {
    dispatch ( actions.closeDialog());
  };

  const openReject = () => {
    setConfirmDialogOpen(true);   
  };

  const handleOpenReview = (uuid) => {
    window.open(process.env.REACT_APP_URL + '/perviewSolution/'+uuid+'/'+sessionStorage.getItem('jwtKey'),'_blank')
  };


  const saveTags = async (data) => {
    // ----- Submit form ----- 
    const uuidSolution = listData.uuid;
    const result = { uuidSolution,...selectData};
    let bodyJsonData = genFormData(result);
    /* 將 Content-Type 設定為 "application/json" */
    let token = sessionStorage.getItem('jwtKey');
    const config = {
      headers: {
        "authorization": 'Bearer ${token}',
        "Content-Type": 'application/json'
      }
    }
     
    const response = await saveSolutionTags(bodyJsonData, config);
    if ( response.apiCode === API_RETURN_CODE.SUCCESS) {
      dispatch(returnActions.openDialog("renderSave",  { msg: response.apiMessage }));
      dispatch(actions.closeDialog()); 
    } else {
      dispatch(returnActions.openDialog("renderSave",  { msg: response.apiMessage }));
    }
  };


  const hanldeTagOnChange = (e) => {
    setNewTagsAdm(e.target.value);
}

const addNewTagsAdm = () => { 
  if (newTagsAdm) {
    const tagsAdmList = [...tagsAdmOptionList];
    tagsAdmList.push(newTagsAdm);  
    setTagsAdmOptionList([...new Set(tagsAdmList)]);
    setNewTagsAdm('');
  }
}

  const active = async (input, e) => {
    if (listData.solutionStatus === 'review') {
      const data = {
        uuidSolution : input.uuid,
        solutionStatus : e.target.getAttribute('status-set'),
      };    
      const response = await doChangeStatusSolution(data);        
      const proccessDesc = e.target.getAttribute('status-set') === 'reject' ? '退件成功' : e.target.getAttribute('status-set') === 'active' ? '審核成功' : '處理成功';
  
  
      // 成功則關閉審核視窗
      if (response.returnCode === API_RETURN_CODE.SUCCESS) {
        onRefresh();
        notify('審核結果', proccessDesc)
        dispatch(actions.closeDialog());        
      } else {
        notify('審核結果', '處理失敗');
      }
    } else {
      notify('審核結果', '請確認解決方案的狀態，只有待審查能進行審核');
    }
  };

  const handleReject = async (input, e) => {
    const data = {
      uuidSolution : input.uuid,
      solutionStatus : 'reject',
      reason: input.reason
    };    
    
    const response = await doChangeStatusSolution(data);        

    // 成功則關閉審核視窗
    if (response.returnCode === API_RETURN_CODE.SUCCESS) {
      onRefresh();
      notify('審核結果', '退件成功');
      dispatch(actions.closeDialog());      
    } else {
      notify('審核結果', '處理失敗');
    }
    setConfirmDialogOpen(false);
  }

    // 完整資料 (包含 Select)
  const viewOnly = async () => {
      dispatch(actions.closeDialog());
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
    const { uuid, solutionName, solutionEName, intro, suitableIndustryList ,suitableIndustryO, 
      suitableScaleList, serviceAreaList, serviceAreaO, serviceLimit,
      spec, marketingPlan, achievement, feature, specName, solDesc, price, discountPlan,succCase,
      iaasPaas, iaasPaasFile, otherDocs, portablePlan, demoUrl, moreInfo,  pictureDesc,
      massiveConn, massiveCal, flexibleScheduling, uninterruptedService, loadBalance, infoSecurity, solutionSpecList, picture, achievementFile,
      cate1, cate2, cate3, cate4, cate5, cate6, tags, tagsAdm, rejectMsg, discontinuedMsg, stopSaleMsg, solutionStatus, launchDate, discontinuedDate, otherSpec
    } = listData;
    return (
      <>
      <SolutionPlanMainContent>
        <form>
          <input type="hidden" defaultValue={uuid} {...register('uuid')}></input>
          <div>
            <div className="contentTitleBlock title-space-between">
              <h3 className="contentTitle lg">
                編輯解決方案
              </h3>
              {/* 停售、上架、通過 => 顯示上架日期 */}
              {                
                (launchDate && (solutionStatus === SOLUTION_STATUS.STOPSALE
                  || solutionStatus === SOLUTION_STATUS.LAUNCHED
                  || solutionStatus === SOLUTION_STATUS.ACTIVE)
                )
                && <p>上架日期: {launchDate}</p>
              }
              {/* 通過，但供應商未設定 => 顯示未設定 */}
              {                
                (!launchDate && solutionStatus === SOLUTION_STATUS.ACTIVE) && <p>上架日期: 未設定</p>
              }
              {/* 下架 => 顯示下架日期 */}
              {
                solutionStatus === SOLUTION_STATUS.OFF_LAUNCH && <p>下架日期: {discontinuedDate}</p>
              }
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
              <label className="requiredLabel">解決方案中文名稱</label>
              <input type="text" defaultValue={solutionName} readOnly />
            </div>

            <div className="inputItem">
              <label>解決方案英文名稱</label>
              <input type="text" defaultValue={solutionEName} readOnly />
            </div>

            <CategorySettings>
              <div className="toggleControl" onClick={handleClickToggleControl}>
                <p>主分類
                  <RequiredFont />
                <span id="span1">-</span></p>
              </div>

              <div className="toggleBlock" ref={toggleBlockRef}>
                <div>
                  <label>{sysConfig && sysConfig.data && sysConfig.data.A[0].value1 || '網路開店'}</label>
                  <Select
                    disabled
                    mode="multiple"
                    size="default"
                    defaultValue={cate1}
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
                  <label>{sysConfig && sysConfig.data && sysConfig.data.B[0].value1 || '行銷推廣'}</label>
                  <Select
                    disabled
                    mode="multiple"
                    size="default"
                    defaultValue={cate2}
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
                  <label>{sysConfig && sysConfig.data && sysConfig.data.C[0].value1 || '遠距辦公與文書'}</label>
                  <Select
                    disabled
                    mode="multiple"
                    size="default"
                    defaultValue={cate3}
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
                  <label>{sysConfig && sysConfig.data && sysConfig.data.D[0].value1 || '企業管理'}</label>
                  <Select
                    disabled
                    mode="multiple"
                    size="default"
                    defaultValue={cate4}
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
                  <label>{sysConfig && sysConfig.data && sysConfig.data.E[0].value1 || '客戶服務'}</label>
                  <Select
                    disabled
                    mode="multiple"
                    size="default"
                    defaultValue={cate5}
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
                  <label>{sysConfig && sysConfig.data && sysConfig.data.F[0].value1 || '市場分析'}</label>
                  <Select
                    disabled
                    mode="multiple"
                    size="default"
                    defaultValue={cate6}
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
                <label>標籤</label>
                {/* <input type="text" {...register('tags')} /> */}
                <Select
                      mode="multiple"
                      size="default"
                      defaultValue={tags}
                      disabled
                >                  
                </Select>
              </div>
            </CategorySettings>

            <CategorySettings>
              <div>
                <label>管理者標籤</label>
                {/* <input type="text" {...register('tags')} /> */}                                          
                <Select              
                  placeholder="自訂標籤"
                  mode="multiple" 
                  defaultValue={selectData.tagsAdmList}
                  onChange={(value) => {setSelectData({...selectData, tagsAdmList: value})}}
                  onClick={() => { newTagsAdmRef.current.focus() }}
                  dropdownRender={menu => (
                    <div>
                      {menu}
                      <Divider style={{ margin: '4px 0' }} />
                      <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                        <Input ref={newTagsAdmRef} style={{ flex: 'auto' }} value={newTagsAdm} onChange={hanldeTagOnChange} />
                        <a
                          style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                          onClick={addNewTagsAdm}
                        >
                          <PlusOutlined />新增標籤
                        </a>
                      </div>
                    </div>
                  )}
                >
                  {tagsAdmOptionList.map(item => (
                    <Option key={item}>{item}</Option>
                  ))}
                </Select>
              </div>
            </CategorySettings>

            <div className="inputItem">
              <label className="requiredLabel">解決方案圖片</label>
              <div className="uploadButtonBlock">
                &nbsp;&nbsp;檔名：{
                  picture && picture.name
                    ? <a href="#">{ picture.name }</a> 
                    : <a href={getFileName(picture) ? createSimpleSolutionDownloadPath(picture) : '#' }>{ getFileName(picture)}</a> 
                }
              </div>
            </div>

            <div className="inputItem">
              <label className="requiredLabel">圖片說明（alt）</label>
              <input type="text" defaultValue={pictureDesc} readOnly />
            </div>

            {/* <div className="inputItem">
              <label className="requiredLabel">方案簡介</label>
              <textarea
                defaultValue={intro} readOnly
              />
            </div> */}


          </div>

          <div>
            {/* <div className="contentTitleBlock">
              <h3 className="contentTitle lg">請說明您的服務適合怎樣的客戶</h3>
              <p>
                本站設置有推薦系統，請說明您的解決方案，什麼樣的企業來用，會最符合需求
              </p>
            </div> */}


            {/* <CategorySettings>
              <label className="requiredLabel">方案可服務能量上限</label>
              <Select
                size={ 'large' }
                id="serviceLimit"
                defaultValue={serviceLimit}
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

            <CategorySettings>
              <label className="requiredLabel">方案適用行業別</label>
              <Select
                mode="multiple"
                id="suitableIndustryList"
                defaultValue={suitableIndustryList}
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
              <label className="requiredLabel">方案適用行業別-其他</label>
              <input type="text" defaultValue={suitableIndustryO} {...register('suitableIndustryO')} readOnly />
            </div>


            <CategorySettings>
              <label className="requiredLabel">方案適用企業規模</label>
              <Select
                mode="multiple"
                defaultValue={suitableScaleList}
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
              <label className="requiredLabel">推廣服務區域</label>
              <Select
                mode="multiple"
                defaultValue={serviceAreaList}
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
                  defaultValue={solDesc} readOnly
              />
            </div>

            <div className="inputItem">
              <label className="requiredLabel">功能規格、性能（180 字以內）</label>
              <textarea
                maxLength="180"
                defaultValue={spec} readOnly
              />
            </div>

            <div className="inputItem">
              <label className="requiredLabel">特色（300 字以內）</label>
              <textarea
                maxLength="300"
                defaultValue={feature} readOnly
              />
            </div>

            <div className="inputItem">
              <label className="requiredLabel">成功應用案例（300 字以內）</label>
              <textarea
                maxLength="300"
                defaultValue={succCase} readOnly
              />
            </div>
          </div>
          
          <div className="skuBlock"/>

          <div>
            <div className="contentTitleBlock">
              <h3 className="contentTitle lg">採購規格（SKU）</h3>
              <p>
                若您的解決方案，可以用使用時間（月份為單位）、資料存取數量、使用者人數來計價採購 您可以使用本功能來制定不同的採購單位，以因應不同企業的需求
              </p>
            </div>

            <div className="inputItem">
                <label className="requiredLabel">優惠措施（100 字內）</label>
                <textarea
                  maxLength="100"
                  defaultValue={discountPlan} {...register('discountPlan')}
                  readOnly
                />
            </div>

            { solutionSpecList && solutionSpecList.map((item, index) => (
              <div className="skuBlock" key={index} >
                <div className="inputItem">
                  <div className="twoColumn">
                    <label className="requiredLabel">規格名稱</label>                   
                  </div>
                  <br/>
                    <input
                      type="text" readOnly defaultValue={item.specName} {...register(`specName${index}`)}
                    />
                </div>
                <div className="twoColumn">
                  <div className="inputItem">
                    <label className="requiredLabel">價格</label>
                    <input
                      type="number" readOnly defaultValue={item.price} {...register(`price${index}`)}
                    />
                  </div>
                  <div className="inputItem">
                    <label className="requiredLabel">使用期限</label>
                    <div className="oneColumn">
                      <input
                        type="number" readOnly defaultValue={item.period} {...register(`period${index}`)}
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
                      defaultValue={otherSpec} readOnly
                    />
                  </div>
                }
              </div>
            )) 
            }
      
            {/* { skuBlockList && skuBlockList.map((item, index) => (
              <div className="skuBlock" key={index}>{item}</div>
            )) } */}
          </div>

          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">方案行銷推廣能量</h3>
          </div>

          <div className="inputItem">
              <label className="requiredLabel">行銷推廣計畫</label>
              <textarea
                maxLength="100"
                defaultValue={marketingPlan} readOnly
              />
          </div>

          <div className="inputItem">
            <label className="requiredLabel">方案市場實績</label>
            <textarea
              maxLength="100"
              defaultValue={achievement} readOnly
            />
          </div>

          <div className="inputItem">
            <div className="uploadButtonBlock">
            檔名：{ 
                  achievementFile && achievementFile.name
                    ? <a href="#">{ achievementFile.name }</a> 
                    : <a href={getFileName(achievementFile) ? createSimpleSolutionDownloadPath(achievementFile) : '#' }>{ getFileName(achievementFile)}</a> 
                }		            
            </div>
          </div>

          {/* <div className="skuBlock"/>
          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">方案技術服務能量</h3>
              TODO 6320 GOOGLESHEET: 34
          </div> */}

          <div className="skuBlock"/>
          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">雲平台架構(IasS/PaaS) <RequiredFont /></h3>
          </div>
          <div className="inputItem">
            <textarea
              maxLength="300"
              defaultValue={iaasPaas} readOnly
            />
          </div>
          <div className="inputItem">
            <div className="uploadButtonBlock">
            &nbsp;&nbsp;  檔名：{ 
                  iaasPaasFile && iaasPaasFile.name
                    ? <a href="#">{ iaasPaasFile.name }</a> 
                    : <a href={getFileName(iaasPaasFile) ? createSimpleSolutionDownloadPath(iaasPaasFile) : '#' }>{ getFileName(iaasPaasFile)}</a> 
                }	
            </div>
          </div>

          <div className="skuBlock"/>
          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">客戶資料可攜/移轉之規劃<RequiredFont /></h3>
          </div>
          <div className="inputItem">
            <textarea
              maxLength="300"
              defaultValue={portablePlan} readOnly
            />
          </div>


          <div className="skuBlock"/>
          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">方案操作演示說明影片 <RequiredFont /></h3>
              <p>請填連結網址，影片長度2~5分鐘</p>
              <div className="inputItem">
                <input className="requiredLabel" type="text" defaultValue={demoUrl} readOnly />
              </div>
          </div>

          <div className="skuBlock"/>
          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">其他附加說明項目</h3>
              <div className="inputItem">
                <textarea
                  maxLength="100"
                  defaultValue={moreInfo} readOnly
                />
            </div>
          </div>


          <div className="skuBlock"/>
          <div className="contentTitleBlock">
            <h3 className="contentTitle lg">雲端解決方案技術特性說明</h3>
            <div className="inputItem">
            <label className="requiredLabel">大量連線</label>
            <p>請說明雲端架構及系統效能規劃，產品遇大量連線之承載量服務水準，字數300以內</p>
            <textarea
              maxLength="300"
              defaultValue={massiveConn} readOnly
            />
            </div>
            <div className="inputItem">
            <label className="requiredLabel">大量計算</label>
            <p>請說明雲端架構及系統效能規劃，系統能承受多少用戶同時連線運算或處理，字數300以內</p>
            <textarea
              maxLength="300"
              defaultValue={massiveCal} readOnly
            />
            </div>
            <div className="inputItem">
            <label className="requiredLabel">資源彈性調度3333</label>
            <p>請說明雲端架構是否具有彈性資源調度功能，當量大時是否增長資源，量小縮減資源，字數300以內</p>
            <textarea
              maxLength="300"
              defaultValue={flexibleScheduling} readOnly
            />
            </div>
            <div className="inputItem">
            <label className="requiredLabel">服務不中斷</label>
            <p>請說明雲端架構是否具有服務不中斷功能之偵測、系統故障仍能持續服務之穩定性，字數300以內</p>
            <textarea
              maxLength="300"
              defaultValue={uninterruptedService} readOnly
            />
            </div>
            <div className="inputItem">
            <label className="requiredLabel">雲端負載機制</label>
            <p>請說明系統於真實網路(三大電信)環境下整體效能表現，並確保負載平衡機制可正常運行並使使用者感受達到SLA水準，字數300以內</p>
            <textarea
              maxLength="300"
              defaultValue={loadBalance} readOnly
            />
            </div>
            <div className="inputItem">
            <label className="requiredLabel">資安風險</label>
            <p>請說明下列項目是否無中高度以上資安風險：程式碼檢測、網站弱點掃描、主機弱點掃描、APP資安檢測、滲透測試、第三方開源元件安全及授權，字數500以內</p>
            <textarea
              maxLength="500"
              defaultValue={infoSecurity} readOnly
            />
            </div>
          </div>

          <div className="inputItem">
            <label>其他</label>
            <p>如有相關認證請上傳掃描檔案(檔名請標註文件及公司名稱)</p>
            <div className="uploadButtonBlock">
              檔名：{ 
                  otherDocs && otherDocs.name
                    ? <a href="#">{ otherDocs.name }</a> 
                    : <a href={getFileName(otherDocs) ?  createSimpleSolutionDownloadPath(otherDocs) : '#' }>{ getFileName(otherDocs)}</a> 
                }		
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'flexEnd !important'}}>
            {
              triggerType && triggerType === 'OPERATION' ?
                (userInfo.acType === ROLE_TYPE.ADMIN.acType || userInfo.acType === ROLE_TYPE.SUPREVIEWER.acType) &&
                <>
                  <div
                      className="nextStepButton button"
                      onClick={handleSubmit(active)}
                      status-set = 'active'
                  >
                    通過
                  </div>
                  <div
                      className="nextStepButton button"
                      onClick={openReject}
                      status-set = 'reject'
                  >
                    不通過
                  </div>
                </>
              : null
            }
         
            <div className="nextStepButton button" onClick={() => {handleOpenReview(uuid)}}>預覽畫面</div>
            <div className="nextStepButton button" onClick={viewOnly}>不儲存關閉</div>
            <div className="nextStepButton button" onClick={handleSubmit(saveTags)}>儲存並關閉</div>
          </div>
        </form>       
      </SolutionPlanMainContent>
       <ConfirmDialog
        isShow={confirmDialogOpen}
        onCancel={() => setConfirmDialogOpen(false)}
        customContent={() => {
          return (      
            <>
              <h3>請填寫退件原因<RequiredFont /></h3>
              <form>                          
                <textarea 
                  placeholder="請輸入退件原因"
                  maxLength="150"
                  {...register('reason', { required: '請輸入退件原因', 
                    validate: (value) => value && value.trim().length === 0 ? "請輸入退件原因" : undefined
                  })} 
                />
                <div className="buttons">
                    <button
                        type="button"
                        className="button primary"
                        onClick={() => {setConfirmDialogOpen(false)}}
                    >
                        取消
                    </button>                  
                    <button
                        className="button"
                        type="button"
                        onClick={handleSubmit(handleReject)}
                    >
                        確定
                    </button>
                </div>
              </form>
            </>
        );
        }} 
     />
      </>
    )
  }

  return (
    <DialogWrapper>
      <DialogContent>
        {
          renderListDetail()
        }
        <CloseButton onClick={handleClickCloseDialog}>×</CloseButton>
      </DialogContent>
    </DialogWrapper>
  );
};

export default SolutionDetailAdmDialog;
