import React, { FunctionComponent } from 'react';
import { BrowserRouter as HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { store, persistor } from './store';
import { WrapperApp } from '@/components';
import { VisitorsScreen, TariffsScreen, StatisticsScreen, NotFoundScreen } from '@/screens';
import { theme } from '@/utils';
import { ThemeProvider } from '@material-ui/styles';

export const App: FunctionComponent<{}> = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <HashRouter basename="/">
                    <ThemeProvider theme={theme}>
                        <WrapperApp>
                            <Switch>
                                <Route path="/" component={VisitorsScreen} exact />
                                <Route path="/tariffs" component={TariffsScreen} />
                                <Route path="/statistics" component={StatisticsScreen} />
                                <Route path="*">
                                    <NotFoundScreen />
                                </Route>
                            </Switch>
                        </WrapperApp>
                    </ThemeProvider>
                </HashRouter>
            </PersistGate>
        </Provider>
    );
};
