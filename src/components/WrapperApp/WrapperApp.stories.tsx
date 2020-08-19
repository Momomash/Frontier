import * as React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import { WrapperApp } from './WrapperApp';
import { theme } from '../../utils/initialTheme';

export default {
    title: 'WrapperApp',
};

export const WrapperWithDefaultTheme = () => (
    <Router>
        <WrapperApp />
    </Router>
);
export const WrapperWithInitialTheme = () => (
    <Router>
        <ThemeProvider theme={theme}>
            <WrapperApp />
        </ThemeProvider>
    </Router>
);
