import React, { FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
    dialogTitle: string;
    dialogContent: string;
    agreeButtonText: string;
    disagreeButtonText: string;
    agreeOnClick: () => void;
    close: () => void;
    isOpen: boolean;
};
export const AlertDialog: FunctionComponent<Props> = (props: Props) => {
    const {
        dialogTitle,
        dialogContent,
        agreeButtonText,
        disagreeButtonText,
        agreeOnClick,
        close,
        isOpen,
    } = props;
    return (
        <div>
            <Dialog open={isOpen} onClose={close}>
                <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="primary">
                        {disagreeButtonText}
                    </Button>
                    <Button onClick={agreeOnClick} color="primary" autoFocus>
                        {agreeButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
