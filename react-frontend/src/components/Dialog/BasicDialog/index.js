import {
    DialogWrapper,
    DialogContent,
    CloseButton,
    ListDetailBlock,
} from '../dialog.style';

const BasicDialog = ({ isShow, onCancel, children }) => {
    return (
            isShow && 
            <DialogWrapper>
                <DialogContent>
                    <ListDetailBlock>{children}</ListDetailBlock>
                    <CloseButton onClick={onCancel}>×</CloseButton>
                </DialogContent>
            </DialogWrapper>
    );
};

export default BasicDialog;
