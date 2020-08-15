import * as React from 'react';

import { AlertDialog } from './AlertDialog';

export default {
    title: 'AlertDialog',
};

export const ALertDialog = () => (
    <AlertDialog
        dialogTitle="Example Dialog title"
        dialogContent="Example dialog content"
        agreeOnClick={() => undefined}
        agreeButtonText="Agree"
        close={() => undefined}
        disagreeButtonText="Disagree"
        isOpen={true}
    />
);
