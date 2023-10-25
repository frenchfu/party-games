import { useSelector, useDispatch } from 'react-redux';
import { actions } from './stores';
/* Styles */
import {
    DialogWrapper,
    DialogContent,
    CloseButton,
    ListDetailBlock
} from './dialog.style';

const NotifyDialog = () => {
    var notifyDialog = useSelector(({ notifyDialog }) => notifyDialog) || {};
    const dispatch = useDispatch();
    /* --------- Ant Select Data --------- */
    const handleClickCloseDialog = () => {
        dispatch(actions.closeDialog());
    };

    const titleWithBreakLine = notifyDialog.title ? notifyDialog.title.split(/<\/?br\/?>/i) : [];
    const messageWithBreakLine = notifyDialog.message ? notifyDialog.message.split(/<\/?br\/?>/i) : [];

    return (
        <DialogWrapper>
            <DialogContent>
                <ListDetailBlock>
                    <h3>
                        {titleWithBreakLine.map(text => {
                            return (<>{text}<br/></>)
                        })}
                    </h3>
                    <form>
                        {/* <div className="inputItem">
                            <label>回傳代碼: {returnCode}</label>
                        </div> */}
                        <div className="inputItem">
                            <label>
                                {messageWithBreakLine.map(text => {
                                    return (<>{text}<br/></>)
                                })}
                            </label>
                        </div>
                        <div className="buttons">
                            <button
                                type="submit"
                                className="button"
                                onClick={handleClickCloseDialog}
                            >
                                確定
                            </button>
                        </div>
                    </form>
                </ListDetailBlock>
                <CloseButton onClick={handleClickCloseDialog}>×</CloseButton>
            </DialogContent>
        </DialogWrapper>
    );
};
export default NotifyDialog;
