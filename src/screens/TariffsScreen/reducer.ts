import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Tariff = {
    id: number;
    title: string;
    cost: number;
    maxCost: number;
    isDuration: boolean;
};

export const initialState: Tariff[] = [
    {
        id: 1,
        title: '2,5р/мин',
        cost: 2.5,
        maxCost: 600,
        isDuration: true,
    },
    {
        id: 2,
        title: 'Ночефка без буфета',
        cost: 0,
        maxCost: 400,
        isDuration: false,
    },
    {
        id: 3,
        title: 'Ночефка с буфетом',
        cost: 0,
        maxCost: 600,
        isDuration: false,
    },
    {
        id: 4,
        title: 'OneGame',
        cost: 0,
        maxCost: 100,
        isDuration: false,
    },
];

export const TariffsSlice = createSlice({
    name: 'tariffs',
    initialState,
    reducers: {
        add: {
            prepare: (tariff: Tariff) => {
                tariff.id = Date.now();
                return { payload: tariff };
            },
            reducer: (state, { payload }: PayloadAction<Tariff>) => {
                state.push(payload);
            },
        },
        edit: (state, { payload }: PayloadAction<Tariff>) => {
            const indexTariff = state.findIndex((tariff) => tariff.id === payload.id);
            state[indexTariff] = payload;
        },
        delete: (state, { payload }: PayloadAction<Tariff>) => {
            return state.filter((tariff) => tariff.id !== payload.id);
        },
    },
});

export const { reducer, actions } = TariffsSlice;
