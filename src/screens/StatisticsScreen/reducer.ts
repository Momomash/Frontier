import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StatisticsState = {
    startDate: string;
    endDate: string;
    statisticsIndicator: string;
};

export const initialState: StatisticsState = {
    startDate: '',
    endDate: '',
    statisticsIndicator: '',
};

export const StatisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
        updateStartDate: (state, { payload }: PayloadAction<string>) => {
            state.startDate = payload;
        },
        updateEndDate: (state, { payload }: PayloadAction<string>) => {
            state.endDate = payload;
        },
        updateStatisticsIndicator: (state, { payload }: PayloadAction<string>) => {
            state.statisticsIndicator = payload;
        },
    },
});

export const { reducer, actions } = StatisticsSlice;
