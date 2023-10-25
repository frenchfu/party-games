import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { actions } from './stores';
import { Select, Checkbox  } from 'antd';
import { saveSolutionDetail, doUploadSolutionFiles } from 'apis/solutionApi';
import { useState, useRef } from 'react';
import { actions as returnActions } from "components/ReturnMsgDialog/stores";
import "./antd_custom.css";
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
import { createSolutionDownloadPath, getFileName, FILE_TYPE } from 'utilities/fileUtils';

const Dialog = () => {
  const mode = useSelector(({dialog}) => dialog.mode);
  var listData = useSelector(({dialog}) => dialog.listData);
  const userInfo = useSelector(({login}) => login.userInfo);
  const dispatch = useDispatch();

  /* --------- Ant Select Data --------- */
  const { Option } = Select;
  const [selectData, setSelectData] = useState({
    suitableIndustryList: listData.suitableIndustryList,
    suitableScaleList: listData.suitableScaleList,
    serviceAreaList: listData.serviceAreaList,
    serviceLimit: listData.serviceLimit,
    solutionSpecList: listData.solutionSpecList
  })
  const [solutionSpecCount, setSolutionSpecCount] = useState(0);
  const [skuBlockList, setSkuBlockList] = useState([]);
  const [solutionSpecList, setSolutionSpecList] = useState(listData.solutionSpecList);
  const [picture, setPicture] = useState(listData.picture);
  const [achievementFile, setAchievementFile] = useState(listData.achievementFile);
  const [iaasPaasFile, setIaasPaasFile] = useState(listData.iaasPaasFile);
  const [otherDocs, setOtherDocs] = useState(listData.otherDocs);


   
  const toggleBlockRef = useRef();
  const {     
    register,
    handleSubmit,
    formState: {errors}, 
  } = useForm();
  const handleClickCloseDialog = () => {
    dispatch (actions.closeDialog());
  };

  // TODO uuid 改從listData中取得
  const uploadFiles = (uuid) => {
    const ban = userInfo.ban;
    if (picture) {
      const picFormData = new FormData();
      picFormData.append(FILE_TYPE.picture, picture);
      doUploadSolutionFiles(ban, uuid, FILE_TYPE.picture, picFormData);
    }
    if (iaasPaasFile) {
      const iaasPaasFileData = new FormData();
      iaasPaasFileData.append(FILE_TYPE.iaasPaasFile, iaasPaasFile);
      doUploadSolutionFiles(ban, uuid, FILE_TYPE.iaasPaasFile, iaasPaasFileData);
    }

    if (achievementFile) {
      const achievementFileFormData = new FormData();
      achievementFileFormData.append(FILE_TYPE.achievementFile, achievementFile);
      doUploadSolutionFiles(ban, uuid, FILE_TYPE.achievementFile, achievementFileFormData);
    }

    if (otherDocs) {
      const otherDocsFormData = new FormData();
      otherDocsFormData.append(FILE_TYPE.otherDocs, otherDocs);
      doUploadSolutionFiles(ban, uuid, FILE_TYPE.otherDocs, otherDocsFormData)
    }
  }

  const draft = async(data) => {
    data.mode = 'draft'
    const result = {...data, ...selectData};
    uploadFiles(data.uuid); // 上傳檔案
    const response = await saveSolutionDetail(result);
    if(response) {
      dispatch(returnActions.openDialog("renderSave",  { msg: response }));
      dispatch(actions.closeDialog());
    }
  }
    // 完整資料 (包含 Select)
  const review = async (data) => {
    // ----- Submit form -----
    data.mode = 'review'
    const result = {...data, ...selectData};
    uploadFiles(data.uuid); // 上傳檔案
    const response =  await saveSolutionDetail(result);
    if(response) {
      dispatch(returnActions.openDialog("renderSave",  { msg: response }));
      dispatch(actions.closeDialog());
    }
  };

  const createSkuBlock = (count) => {
    const currentSolutionSpecList = solutionSpecList;
    const solutionSpecElement = (
      <>

        <div className="inputItem">
          <label>名稱</label>
          <input
            type="text" {...register(`skuName${count}`)}
            placeholder="例如：5 個月方案"
          />
        </div>

        <div className="twoColumn">
          <div className="inputItem">
            <label>採購單位</label>
            <select name="purchasingDepartment" {...register(`purchasingDepartment${count}`)}>
              <option value="purchasingDepartmentA">單位 A</option>
              <option value="purchasingDepartmentB">單位 B</option>
              <option value="purchasingDepartmentC">單位 C</option>
            </select>
          </div>

          <div className="inputItem">
            <label>計算方式</label>
            <div className="oneColumn">
              <input
                type="number" {...register(`skuMonth${count}`)}
                placeholder="例：5"
              />
              <span>個月</span>
            </div>
          </div>
        </div>

        <div className="twoColumn">
          <div className="inputItem">
            <label>市價（TWD）</label>
            <input
              type="number" {...register(`skuMarketPrice${count}`)}
              placeholder="例：50000"
            />
          </div>

          <div className="inputItem">
            <label>市價銷售連結：</label>
            <input
              type="text" {...register(`skuMarketLink${count}`)}
              placeholder="例：https://abc.com"
            />
          </div>
        </div>

        <div className="inputItem">
          <label>優惠措施（100 字內）</label>
          <textarea
            placeholder="例如：續約優惠價格與期程、加購優惠等，字數100以內"
            maxLength="100"
            {...register(`solutionDiscount${count}`)}
          />
        </div>

        <div className="inputItem">
          <label>本站售價（TWD）</label>
          <input
            type="number" {...register(`skuPrice${count}`)}
            placeholder="例：45000"
          />
        </div>
      </>
    )
    currentSolutionSpecList.push(solutionSpecElement);
    setSolutionSpecList(currentSolutionSpecList);
  }

  const handleSolutionImageOnChange = e => {
    setPicture(e.target.files[0]);
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

  /* ----- render blocks ----- */
  const renderListDetail = () => {
    const { uuid, solutionName, solutionEName, intro, suitableIndustryList ,suitableIndustryO, 
            suitableScaleList, serviceAreaList, serviceAreaO, serviceLimit,
            spec, marketingPlan, achievement, feature, specName, price, solDesc, discountPlan,succCase,
            iaasPaas, portablePlan, demoUrl, moreInfo, pictureDesc,
            massiveConn, massiveCal, flexibleScheduling, uninterruptedService, loadBalance, infoSecurity } = listData;
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

            <div className="inputItem">
              <label>解決方案中文名稱</label>
              <input type="text" defaultValue={solutionName} {...register('solutionName')} />
            </div>

            <div className="inputItem">
              <label>解決方案英文名稱</label>
              <input type="text" defaultValue={solutionEName} {...register('solutionEName')} />
            </div>

            <CategorySettings>
              <div className="toggleControl" onClick={handleClickToggleControl}>
                <p>主分類
                <span id="span1">＋</span></p>
              </div>

              <div className="toggleBlock" ref={toggleBlockRef}>
                <div>
                  <label>網路開店</label>
                  <Select
                    mode="multiple"
                    size="default"
                    placeholder="請選擇子分類項目"
                    // 要預先載入的選項請放在 defaultValue，資料型別需是陣列，可以打開下方註解看效果
                    // defaultValue={['1212', '1214']}
                    // defaultValue={newServiceAreaList}
                    onChange={(value) => setSelectData({...selectData, cate1: value})}
                  >
                    <Option value="1212">電商/網購平台</Option>
                    <Option value="1213">行動支付</Option>
                    <Option value="1214">信用卡/票證</Option>
                    <Option value="1215">電子發票</Option>
                  </Select>
                </div>

                <div>
                  <label>行銷推廣</label>
                  <Select
                    mode="multiple"
                    size="default"
                    placeholder="請選擇子分類項目"
                    // 要預先載入的選項請放在 defaultValue，資料型別需是陣列，可以打開下方註解看效果
                    // defaultValue={['子分類 1', '子分類 2']}
                    onChange={(value) => setSelectData({...selectData, cate2: value})}
                  >
                    <Option value="1222">數位廣告</Option>
                    <Option value="1223">SEO</Option>
                    <Option value="1224">社群內容管理操作</Option>
                    <Option value="1225">行銷媒合/KOL</Option>
                    <Option value="1226">電子報/EDM</Option>
                  </Select>
                </div>
                <div>
                  <label>遠距辦公與文書</label>
                  <Select
                    mode="multiple"
                    size="default"
                    placeholder="請選擇子分類項目"
                    // 要預先載入的選項請放在 defaultValue，資料型別需是陣列，可以打開下方註解看效果
                    // defaultValue={['子分類 1', '子分類 2']}
                    onChange={(value) => setSelectData({...selectData, cate3: value})}
                  >
                    <Option value="1232">遠端協作</Option>
                    <Option value="1233">線上會議</Option>
                  </Select>
                </div>
                <div>
                  <label>企業管理</label>
                  <Select
                    mode="multiple"
                    size="default"
                    placeholder="請選擇子分類項目"
                    // 要預先載入的選項請放在 defaultValue，資料型別需是陣列，可以打開下方註解看效果
                    // defaultValue={['子分類 1', '子分類 2']}
                    onChange={(value) => setSelectData({...selectData, cate4: value})}
                  >
                    <Option value="1242">CRM客戶管理系統</Option>
                    <Option value="1243">ERP系統</Option>
                    <Option value="1244">防毒軟體</Option>
                    <Option value="1245">POS整合系統</Option>
                    <Option value="1246">人資管理</Option>
                    <Option value="1247">生產/物流管理</Option>
                    <Option value="1248">財會管理</Option>
                  </Select>
                </div>
                <div>
                  <label>客戶服務</label>
                  <Select
                    mode="multiple"
                    size="default"
                    placeholder="請選擇子分類項目"
                    // 要預先載入的選項請放在 defaultValue，資料型別需是陣列，可以打開下方註解看效果
                    // defaultValue={['子分類 1', '子分類 2']}
                    onChange={(value) => setSelectData({...selectData, cate5: value})}
                  >
                    <Option value="1252">客戶互動</Option>
                    <Option value="1253">線上客服</Option>
                    <Option value="1254">線上預約</Option>
                    <Option value="1255">簡訊系統</Option>

                  </Select>
                </div>
                <div>
                  <label>市場分析</label>
                  <Select
                    mode="multiple"
                    size="default"
                    placeholder="請選擇子分類項目"
                    // 要預先載入的選項請放在 defaultValue，資料型別需是陣列，可以打開下方註解看效果
                    // defaultValue={['子分類 1', '子分類 2']}
                    onChange={(value) => setSelectData({...selectData, cate6: value})}
                  >
                    <Option value="1262">大數據分析</Option>
                    <Option value="1263">輿情分析</Option>
                    <Option value="1264">市場調查</Option>

                  </Select>
                </div>
              </div>
            </CategorySettings>

            <div className="inputItem">
              <label>標籤</label>
              <input type="text" {...register('tag')} />
            </div>

            <div className="inputItem">
              <label>新增解決方案圖片</label>
              <div className="uploadButtonBlock">
                <input
                  type="file"
                  id="uploadPicture"
                  onChange={handleSolutionImageOnChange}
                  accept=".jpg, .png"
                />
                <label htmlFor="uploadPicture" className="button">
                  上傳圖片
                </label>
                &nbsp;&nbsp;檔名：{ 
                  picture && picture.name
                    ? <a href="#">{ picture.name }</a> 
                    : <a href={getFileName(picture) ? createSolutionDownloadPath(userInfo.ban, listData.uuid, FILE_TYPE.picture, getFileName(picture)) : '#' }>{ getFileName(picture)}</a> 
                }
              </div>
            </div>

            <div className="inputItem">
              <label>圖片說明（alt）</label>
              <input type="text" defaultValue={pictureDesc} {...register('pictureDesc')} />
            </div>

            <div className="inputItem">
              <label>方案簡介</label>
              <textarea
                placeholder="請自由說明本方案內容，內文會直接呈現在前台網站，審核通過後可以預覽編修 （HTML 編輯器）"
                defaultValue={intro} {...register('intro')}
              />
            </div>


          </div>

          <div>
            {/* <div className="contentTitleBlock">
              <h3 className="contentTitle lg">請說明您的服務適合怎樣的客戶</h3>
              <p>
                本站設置有推薦系統，請說明您的解決方案，什麼樣的企業來用，會最符合需求
              </p>
            </div> */}
            <CategorySettings>
              <label>方案可服務能量上限</label>
              <Select
                size={ 'large' }
                id="serviceLimit"
                defaultValue={serviceLimit}
                onChange={(value) => setSelectData({...selectData, serviceLimit: value})}
              >
                <Option value="1">1~10家</Option>
                <Option value="2">11~100家</Option>
                <Option value="3">101~200家</Option>
                <Option value="4">201~300家</Option>
                <Option value="5">301~400家</Option>
                <Option value="6">401~500家</Option>
                <Option value="7">501家以上</Option>
              </Select>
            </CategorySettings>

            <CategorySettings >
              <label>方案適用行業別</label>
              <Select
                mode="multiple"
                id="suitableIndustryList"
                defaultValue={suitableIndustryList}
                onChange={(value) => setSelectData({...selectData, suitableIndustryList: value})}
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
              <input type="text" defaultValue={suitableIndustryO} {...register('suitableIndustryO')} />
            </div>

            <CategorySettings>
              <label>方案適用企業規模</label>
              <Select
                mode="multiple"
                defaultValue={suitableScaleList}
                onChange={(value) => setSelectData({...selectData, suitableScaleList: value})}
              >
                <Option value="1">9人以下</Option>
                <Option value="2">10~20人</Option>
                <Option value="3">21~50人</Option>
                <Option value="4">51~100人</Option>
                <Option value="5">101~200人</Option>
              </Select>
            </CategorySettings>

            <CategorySettings>
              <label>推廣服務區域</label>
              <Select
                mode="multiple"
                defaultValue={serviceAreaList}
                onChange={(value) => setSelectData({...selectData, serviceAreaList: value})}
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
              <input type="text" defaultValue={serviceAreaO} {...register('serviceAreaO')} />
            </div>

            <div className="inputItem">
              <label className="requiredLabel">方案簡要說明</label>
              <textarea
                  defaultValue={solDesc} {...register('solDesc')}
              />
            </div>

            <div className="inputItem">
              <label>功能規格、性能（180 字以內）</label>
              <textarea
                placeholder="請提供本解決方案的功能、使用方式、效能等資訊"
                maxLength="180"
                defaultValue={spec} {...register('spec')}
              />
            </div>

            <div className="inputItem">
              <label>特色（300 字以內）</label>
              <textarea
                placeholder="請提供本解決方案的功能、使用方式、效能等資訊"
                maxLength="300"
                defaultValue={feature} {...register('feature')}
              />
            </div>

            <div className="inputItem">
              <label>成功應用案例（300 字以內）</label>
              <textarea
                placeholder="請用客戶案例說明如何應用方案提升中小微企業營運效率或增加客戶/營收之效益"
                maxLength="300"
                defaultValue={succCase} {...register('succCase')}
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

            <div className="skuBlock">
              {/* <div className="inputItem">
                <label>規格名稱</label>
                <input
                  type="text" defaultValue={specName} {...register('specName')}
                  placeholder="例如：5 個月方案"
                />
              </div> */}
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
                <label>優惠措施（100 字內）</label>
                <textarea
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
              <div className="skuBlock" key={index}>
                <div className="inputItem">
                    <label>規格名稱</label>
                    <input
                      type="text" defaultValue={item.specName} {...register(item.specName)}
                    />
                </div>
                <div className="twoColumn">
                  <div className="inputItem">
                    <label>價格</label>
                    <input
                      type="number" defaultValue={item.price} {...register(item.price)}
                      placeholder="例：45000"
                    />
                  </div>
                  <div className="inputItem">
                    <label>使用期限</label>
                    <div className="oneColumn">
                      <input
                        type="number" defaultValue={item.period} {...register(item.period)}
                        placeholder="例：5"
                      />
                      <span>個月</span>
                    </div>
                  </div>
                </div>
                <div className="twoColumn">
                  <div className="inputItem">
                    <label>資料筆數</label>
                    <input
                      type="number" defaultValue={item.numData} {...register(item.numData)}
                    />
                  </div>
                  <div className="inputItem">
                    <label>使用人數</label>
                    <input
                      type="number" defaultValue={item.numClient} {...register(item.numClient)}
                    />
                  </div>
                </div>             
              </div>
            )) }

            {/* <div className="button" onClick={handleClickCreateSkuBlock}>新增其他規格</div> */}
          </div>

          <div className="skuBlock"/>
          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">方案行銷推廣能量</h3>
          </div>

          <div className="inputItem">
              <label>行銷推廣計畫</label>
              <textarea
                placeholder="例如透過經銷商地推網絡，字數300以內"
                maxLength="300"
                defaultValue={marketingPlan} {...register('marketingPlan')}
              />
          </div>

          <div className="inputItem">
            <label>方案市場實績</label>
            <textarea
              placeholder="請說明此方案有效付費客戶數、客戶性質、銷售額等，字數100以內，並上傳合約或銷售發票影本掃描檔以資證明"
              maxLength="100"
              defaultValue={achievement} {...register('achievement')}
            />
          </div>

          <div className="inputItem">
            <div className="uploadButtonBlock">
              <input
                type="file"
                id="uploadAchievementFile"
                onChange={handleUploadAchievementFileOnChange}
              />
              <label htmlFor="uploadAchievementFile" className="button">
                上傳檔案
              </label>
              &nbsp;&nbsp;
              檔名：{ 
                  achievementFile && achievementFile.name
                    ? <a href="#">{ achievementFile.name }</a> 
                    : <a href={getFileName(achievementFile) ? createSolutionDownloadPath(userInfo.ban, listData.uuid, FILE_TYPE.achievementFile, getFileName(achievementFile)) : '#' }>{ getFileName(achievementFile)}</a> 
                }
            </div>
          </div>

          <div className="skuBlock"/>
          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">方案技術服務能量</h3>
          </div>

          <div className="skuBlock"/>
          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">雲平台架構(IasS/PaaS)</h3>
          </div>
          <div className="inputItem">
            <textarea
              placeholder="請說明雲端方案架構及主機使用說明或上傳圖檔，字數300以內"
              maxLength="300"
              defaultValue={iaasPaas} {...register('iaasPaas')}
            />
          </div>
          <div className="inputItem">
            <div className="uploadButtonBlock">
              <input
                type="file"
                id="uploadIaasPaasFile"
                onChange={handleUploadIaasPaasFileOnChange}
              />
              <label htmlFor="uploadIaasPaasFile" className="button">
                上傳檔案
              </label>
              &nbsp;&nbsp;
              檔名：{ 
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
              defaultValue={portablePlan} {...register('portablePlan')}
            />
          </div>


          <div className="skuBlock"/>
          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">方案操作演示說明影片</h3>
              <p>請填連結網址，影片長度2~5分鐘</p>
              <div className="inputItem">
                <input type="text" defaultValue={demoUrl} {...register('demoUrl')} />
              </div>
          </div>

          <div className="skuBlock"/>
          <div className="contentTitleBlock">
              <h3 className="contentTitle lg">其他附加說明項目</h3>
              <div className="inputItem">
                <textarea
                  placeholder="可附加服務導入說明文字(字數100以內)或影片(連結網址)"
                  maxLength="100"
                  defaultValue={moreInfo} {...register('moreInfo')}
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
            />
            </div>
            <div className="inputItem">
            <label>大量計算</label>
            <p>請說明雲端架構及系統效能規劃，系統能承受多少用戶同時連線運算或處理，字數300以內</p>
            <textarea
              placeholder="請輸入"
              maxLength="300"
              defaultValue={massiveCal} {...register('massiveCal')}
            />
            </div>
            <div className="inputItem">
            <label>資源彈性調度2222</label>
            <p>請說明雲端架構是否具有彈性資源調度功能，當量大時是否增長資源，量小縮減資源，字數300以內</p>
            <textarea
              placeholder="請輸入"
              maxLength="300"
              defaultValue={flexibleScheduling} {...register('flexibleScheduling')}
            />
            </div>
            <div className="inputItem">
            <label>服務不中斷</label>
            <p>請說明雲端架構是否具有服務不中斷功能之偵測、系統故障仍能持續服務之穩定性，字數300以內</p>
            <textarea
              placeholder="請輸入"
              maxLength="300"
              defaultValue={uninterruptedService} {...register('uninterruptedService')}
            />
            </div>
            <div className="inputItem">
            <label>雲端負載機制</label>
            <p>請說明系統於真實網路(三大電信)環境下整體效能表現，並確保負載平衡機制可正常運行並使使用者感受達到SLA水準，字數300以內</p>
            <textarea
              placeholder="請輸入"
              maxLength="300"
              defaultValue={loadBalance} {...register('loadBalance')}
            />
            </div>
            <div className="inputItem">
            <label>資安風險</label>
            <p>請說明下列項目是否無中高度以上資安風險：程式碼檢測、網站弱點掃描、主機弱點掃描、APP資安檢測、滲透測試、第三方開源元件安全及授權，字數500以內</p>
            <textarea
              placeholder="請輸入"
              maxLength="500"
              defaultValue={infoSecurity} {...register('infoSecurity')}
            />
            </div>
          </div>

          <div className="inputItem">
            <label>其他</label>
            <p>如有相關認證請上傳掃描檔案(檔名請標註文件及公司名稱)</p>
            <div className="uploadButtonBlock">
              <input
                type="file"
                id="uploadRecords"
                onChange={handleUploadOtherDocsOnChange}
              />
              <label htmlFor="uploadRecords" className="button">
                上傳檔案
              </label>
              &nbsp;&nbsp;
              檔名：{ 
                  otherDocs && otherDocs.name
                    ? <a href="#">{ otherDocs.name }</a> 
                    : <a href={getFileName(otherDocs) ? createSolutionDownloadPath(userInfo.ban, listData.uuid, FILE_TYPE.otherDocs, getFileName(otherDocs)) : '#' }>{ getFileName(otherDocs)}</a> 
                }
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'flexEnd !important'}}>
            {/* TODO 6320 */}
            <div className="nextStepButton button" onClick={handleSubmit(draft)}>暫存解決方案</div>
            <div className="nextStepButton button" onClick={handleSubmit(review)}>送出審查</div>
            <div className="nextStepButton button" onClick={handleClickCloseDialog}>不儲存離開</div>
          </div>
        </form>
      </SolutionPlanMainContent>
    )
  }

  const renderLoginErr = () => {
    const { errCode, errMsg } = listData;
    return (
      <ListDetailBlock>
        <h3>登入失敗</h3>
        <form>
          <div className="inputItem">
            <label>錯誤代碼: {errCode}</label>
          </div>
          <div className="inputItem">
            <label>錯誤訊息: {errMsg}</label>
          </div>
          <div className="buttons">
            <button
              type="submit"
              className="button"
              onClick={handleClickCloseDialog}
            >確定
            </button>
          </div>
        </form>
      </ListDetailBlock>
    )
  }

  const renderLaunched = () => {
    const { returnCode, returnMsg } = listData;
    return (
      <ListDetailBlock>
        <h3>審核結果</h3>
        <form>
          <div className="inputItem">
            <label>回傳代碼: {returnCode}</label>
          </div>
          <div className="inputItem">
            <label>回傳訊息: {returnMsg}</label>
          </div>
          <div className="buttons">
            <button
              type="submit"
              className="button"
              onClick={handleClickCloseDialog}
            >確定
            </button>
          </div>
        </form>
      </ListDetailBlock>
    )
  }

  const renderRegisterConfirm = () => {
    return (
      <ConfirmBlock>
        <h3>資料將遺失</h3>
        <p>若返回上一步，資料將會遺失，是否確定要回到上一步？</p>

        <div className="buttons">
          <button
            className="button primary"
            onClick={handleClickCloseDialog}
          >取消
          </button>          
          <button
            type="submit"
            className="button"
            onClick={handleClickCloseDialog}
          >確定
          </button>
        </div>
      </ConfirmBlock>
    )
  }

  return (
    <DialogWrapper>
      <DialogContent>
        {
          mode === 'launched'
            ? (
              renderLaunched()
            )
            :
          mode === 'detail'
            ? (
              renderListDetail()
            )
            : 
          mode === 'loginErr'
            ? (
              renderLoginErr()
            )
            :
          mode === 'confirm'
            ? (
              renderRegisterConfirm()
            )
            :(
              <ConfirmBlock>
                <h3>確定要變更聯絡人資料嗎?</h3>
                <p>變更聯絡人資料後，手機號碼與 Email 皆須重新驗證，請問您是否要進行變更？</p>

                <div className="buttons">
                  <button
                    className="button primary"
                    onClick={handleClickCloseDialog}
                  >取消
                  </button>                  
                  <button
                    type="submit"
                    className="button"
                    onClick={handleClickCloseDialog}
                  >確定
                  </button>
                </div>
              </ConfirmBlock>
            )
        }

        <CloseButton onClick={handleClickCloseDialog}>×</CloseButton>
      </DialogContent>
    </DialogWrapper>
  );
};

export default Dialog;
