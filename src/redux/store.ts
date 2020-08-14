import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { reducer } from './reducers';

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
});

export const store = configureStore({
    reducer: reducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});
