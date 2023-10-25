/* Styles */
import {
    DialogWrapper,
    DialogContent,
    CloseButton,
    ListDetailBlock,
    
} from './dialog.style';
import { Spin } from 'antd';


const ConfirmDialog = ({
    title="",
    message="",
    msgColor,
    customContent,
    onConfirm,
    onCancel,
    isShow,
    isLoading=false,
    loadingTip,
    loadingSize="default" // small, default, large
}) => {
    const titleWihtBreakLine = title ? title.split(/<\/?br\/?>/i) : [];
    const messageWithBreakLine = message ? message.split(/<\/?br\/?>/i) : [];
    const mColor = msgColor ? msgColor : "Navy"; 
    return (
        isShow && 
        <DialogWrapper>
            <DialogContent>
                <ListDetailBlock>
                    <Spin spinning={isLoading} tip={loadingTip} size={loadingSize} >
                        {customContent ? (
                            customContent()
                        ) : (
                            <>
                                <h3>{titleWihtBreakLine.map(text => {
                                    return (<>{text}<br/></>)
                                })}
                                </h3>
                                <div className="inputItem">
                                    <label style={{color: mColor }} >
                                        {messageWithBreakLine.map(text => {
                                            return (<>{text}<br/></>)
                                        })}
                                    </label>
                                </div>
                                <form>
                                    <div className="buttons">
                                        <button
                                            type="button"
                                            className="button primary"
                                            onClick={onCancel}
                                        >
                                            取消
                                        </button>                                    
                                        <button
                                            type="button"
                                            className="button"
                                            onClick={onConfirm}
                                        >
                                            確定
                                        </button>
                                    </div>
                                </form>                            
                            </>
                        )}
                    </Spin>
                </ListDetailBlock>
                <CloseButton onClick={onCancel}>×</CloseButton>
            </DialogContent>
        </DialogWrapper>
    );
};
export default ConfirmDialog;
