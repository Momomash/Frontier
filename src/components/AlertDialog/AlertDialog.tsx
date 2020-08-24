import React, { FunctionComponent } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

type Props = {
    dialogTitle: string;
    dialogContent: string;
    agreeButtonText: string;
    disagreeButtonText: string;
    agreeOnClick: () => void;
    close: () => void;
    isOpen: boolean;
};
export const AlertDialog: FunctionComponent<Props> = ({
    dialogTitle,
    dialogContent,
    agreeButtonText,
    disagreeButtonText,
    agreeOnClick,
    close,
    isOpen,
}) => {
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
