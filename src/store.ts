import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';

import {
    VisitorsSlice,
    TariffsSlice,
    StatisticsSlice,
    VisitorsState,
    StatisticsState,
    TariffsState,
} from '@/screens';

const reducer = combineReducers({
    visitors: VisitorsSlice.reducer,
    tariffs: TariffsSlice.reducer,
    statistics: StatisticsSlice.reducer,
});
const persistConfig = {
    key: 'root',
    storage: storage('myDB'),
};
const persistedReducer = persistReducer(persistConfig, reducer);

export type Store = {
    visitors: VisitorsState;
    tariffs: TariffsState;
    statistics: StatisticsState;
};
export const createStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
        devTools: process.env.NODE_ENV !== 'production',
    });
};
export const store = createStore();
export const persistor = persistStore(store);
