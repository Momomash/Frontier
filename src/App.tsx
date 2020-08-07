import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { WrapperApp } from '@/components';
import { SettingsScreen, StatisticsScreen, VisitorsScreen, NotFoundScreen } from '@/screens';
import { theme } from '@/utils/initialTheme';
import { ThemeProvider } from '@material-ui/styles';

export const App: FunctionComponent<{}> = () => {
    return (
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
    );
};
