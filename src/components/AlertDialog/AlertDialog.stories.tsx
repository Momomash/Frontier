import * as React from 'react';
import { action } from '@storybook/addon-actions';

import { AlertDialog } from '@/components';

export default {
    title: 'AlertDialog',
};

export const ALertDialog = () => (
    <AlertDialog
        dialogTitle="Example Dialog title"
        dialogContent="Example dialog content"
        agreeOnClick={action('Agree Click')}
        agreeButtonText="Agree"
        close={action('Close Alert click')}
        disagreeButtonText="Disagree"
        isOpen={true}
    />
);
