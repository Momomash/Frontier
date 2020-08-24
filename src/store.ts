import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { VisitorsSlice, TariffsSlice } from '@/screens';

const reducer = combineReducers({
    visitors: VisitorsSlice.reducer,
    tariffs: TariffsSlice.reducer,
});
export type Store = ReturnType<typeof reducer>;

export const store = configureStore<Store>({
    reducer: reducer,
    devTools: process.env.NODE_ENV !== 'production',
});
