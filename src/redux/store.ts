import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { visitorReducer } from './reducers';

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
});

export const store = configureStore({
    reducer: visitorReducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});
