import {React, useState} from 'react';
import { useForm , watch} from 'react-hook-form';
import {doPlListConditionDownload} from '../../apis/doDownloadPfgApi'; 
import { downloadFile } from '../../utilities/fileUtils';
import "bootstrap/dist/css/bootstrap.css";
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import { Helmet } from 'react-helmet';


const LotRewardsPrint = () => {

  const [isLoading , setIsLoading] = useState(false);

  const customModalStyles = {
    modalDialog: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      transform: 'translate(0, 0)',
    },
    modalContent: {}, // 聲明一個空對象，沒有任何CSS屬性
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {

    // 打包表單數據成JSON
    //const sentData = JSON.stringify(data);
    // 調用後端API
    //let response = await doPostLogin(sentData);
    // 其他處理邏輯...
    if(!data.showSecretDetail){
      data.showSecretDetail = "N";
    }

      setIsLoading(true);
      const response = await doPlListConditionDownload(data);
      setIsLoading(false);
      if (response) {
          let fileName = response.headers['Content-Disposition'] ? response.headers['Content-Disposition'] : response.headers['Content-disposition'];
          if (fileName)
              fileName = fileName.replace("inline; filename=","");
          else
              fileName = '匯出結果.zip'; 
          downloadFile(response.data, 'application/octet-stream', fileName);
      } else {
          alert('檔案下載失敗，請稍後再試');
      }

  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal show={isLoading} backdrop="static" keyboard={false}  style={customModalStyles.modalDialog} >
          <Modal.Body >
          <Helmet>
            <style>{`
              .modal-content {
                background-color: rgba(0, 0, 0, 0);
                border : 0;
              }
            `}</style>
         </Helmet>            
              <Spinner animation="border" variant="light" role="status" style={{ width: '20rem', height: '20rem'}}>
              </Spinner>
            </Modal.Body>
        </Modal>  
        <div className="form-group">
          <label>獎項：</label>
          <div className="form-check d-inline-block mr-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="rewardCds"
              defaultChecked
              value="G01"
              {...register('rewardCds', { required: true })}
            />
            <label className="form-check-label">網路報稅獎</label>
          </div>
          <div className="form-check d-inline-block mr-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="rewardCds"
              defaultChecked
              value="G02"
              {...register('rewardCds', { required: true })}
            />
            <label className="form-check-label">手機報稅加碼獎</label>
          </div>
          <div className="form-check d-inline-block mr-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="rewardCds"
              defaultChecked
              value="G03"
              {...register('rewardCds', { required: true })}
            />
            <label className="form-check-label">E化繳退稅加碼獎</label>
          </div>
          {errors.rewardCd && <p className="text-danger">至少要勾選一項</p>}
        </div>

        <div className="form-group">
          <label>國稅局：</label>
          <div className="form-check d-inline-block mr-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="orgMains"
              value="A05"
              {...register('orgMains', { required: true })}
            />
            <label className="form-check-label">北國</label>
          </div>
          <div className="form-check d-inline-block mr-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="orgMains"
              value="E01"
              {...register('orgMains', { required: true })}
            />
            <label className="form-check-label">高國</label>
          </div>
          <div className="form-check d-inline-block mr-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="orgMains"
              value="H01"
              {...register('orgMains', { required: true })}
            />
            <label className="form-check-label">北區</label>
          </div>
          <div className="form-check d-inline-block mr-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="orgMains"
              value="B01"
              {...register('orgMains', { required: true })}
            />
            <label className="form-check-label">中區</label>
          </div>
          <div className="form-check d-inline-block">
            <input
              className="form-check-input"
              type="checkbox"
              name="orgMains"
              value="D01"
              {...register('orgMains', { required: true })}
            />
            <label className="form-check-label">南區</label>
          </div>
          {errors.orgMains && <p className="text-danger">至少要勾選一項</p>}
        </div>


        <div className="form-group">
          <label>檔案類型：</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="downLoadFileType"
              value="CSV"
              {...register('downLoadFileType')}
              defaultChecked
            />
            <label className="form-check-label">CSV檔案下載</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="downLoadFileType"
              value="PDF"
              {...register('downLoadFileType')}
            />
            <label className="form-check-label">PDF檔案下載</label>
          </div>
        </div>

        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="showSecretDetail"
              {...register('showSecretDetail')}
              value={watch('showSecretDetail') ? 'Y' : 'N'}
            />
            <label className="form-check-label">顯示明碼</label>
          </div>
        </div>

        <div className="form-group">
          <label>設定密碼：</label>
          <input
            className="form-control"
            type="password"
            name="settingPassword"
            {...register('settingPassword', {
              validate: (value, { showSecretDetail }) => {
                if (showSecretDetail && !value) {
                  return '密碼為必填欄位';
                }
                return true;
              }
            })}
          />
          {errors.settingPassword && <p className="text-danger">顯示明碼時密碼為必填欄位</p>}
        </div>

        <div className="form-group">
          <button className="btn btn-primary" type="submit">檔案下載</button>
        </div>
      </form>
    </>
  );
}

export default LotRewardsPrint;


