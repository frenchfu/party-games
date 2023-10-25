import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { actions } from './stores';
import { useHistory } from 'react-router-dom';
/* Styles */
import {
  DialogWrapper,
  DialogContent,
  ConfirmBlock,
  CloseButton
} from './dialog.style';

const MessageDialog = () => {
  var listData = useSelector(({messageDialog}) => messageDialog.listData);
  const mode = useSelector(({messageDialog}) => messageDialog.mode);
  const dispatch = useDispatch();
  const history = useHistory();
  /* --------- Ant Select Data --------- */
  const {     
    formState: {errors}, 
  } = useForm();
  const handleClickCloseDialog = () => {
    dispatch (actions.closeDialog());
  };
  const handleBackStepDialog = () => {
    // history.goBack();
    history.push('/register/dataConsentForm');
    dispatch (actions.closeDialog());

  };


  /* ----- render blocks ----- */
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
            onClick={handleBackStepDialog}
          >確定
          </button>
        </div>
      </ConfirmBlock>
    )
  }

  const renderCommon = () => {
    const { msg } = listData;
    return (
      <ConfirmBlock>
        <h3>系統訊息</h3>
        <p>{msg}</p>
        <div className="buttons">
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
          mode === 'confirm'
            ? (
              renderRegisterConfirm()
            )
            :
          mode === 'common'
            ? (
              renderCommon()
            )
            :  ("")
        }
        <CloseButton onClick={handleClickCloseDialog}>×</CloseButton>
      </DialogContent>
    </DialogWrapper>
  );
};
export default MessageDialog;
