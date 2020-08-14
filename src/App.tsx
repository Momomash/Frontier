import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { WrapperApp } from '@/components';
import { VisitorsScreen, SettingsScreen, StatisticsScreen, NotFoundScreen } from '@/screens';
import { theme } from '@/utils/initialTheme';
import { ThemeProvider } from '@material-ui/styles';

export const App: FunctionComponent<{}> = () => {
    return (
        <Provider store={store}>
            <Router>
                <ThemeProvider theme={theme}>
                    <WrapperApp>
                        <Switch>
                            <Route path="/" component={VisitorsScreen} exact />
                            <Route path="/settings" component={SettingsScreen} />
                            <Route path="/statistics" component={StatisticsScreen} />
                            <Route path="*">
                                <NotFoundScreen />
                            </Route>
                        </Switch>
                    </WrapperApp>
                </ThemeProvider>
            </Router>
        </Provider>
    );
};
