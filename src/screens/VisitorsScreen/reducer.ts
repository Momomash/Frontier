import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tariff } from '@/screens';

export type Status = 'active' | 'pause' | 'finished';
export type Visitor = {
    id?: number;
    name: string;
    tariffId: number;
    status: Status;
    times: Array<Event>;
};
export type Event = {
    timestamp: number;
    status: Status;
};
export type EventUser = {
    timestamp: number;
    status: Status;
    id?: number;
};
export type VisitorsWithTimestamp = {
    visitors: Visitor[];
    timestamp: number;
};
export type State = {
    visitors: Array<Visitor>;
    modals: {
        payVisitors: boolean;
    };
    total: number;
    payedVisitors: Array<Visitor>;
    timer: number;
};
export const initialState: State = {
    visitors: [
        {
            id: 1,
            name: 'Франц',
            tariffId: 1,
            status: 'active',
            times: [{ timestamp: 1597246825795, status: 'active' }],
        },
    ],
    modals: {
        payVisitors: false,
    },
    total: 0,
    payedVisitors: [],
    timer: 0,
};

export const VisitorsSlice = createSlice({
    name: 'visitors',
    initialState,
    reducers: {
        add: {
            prepare: (visitor: Visitor) => {
                const newTime = Date.now();
                visitor.id = newTime;
                visitor.status = 'active';
                visitor.times = [{ timestamp: newTime, status: 'active' }];
                return { payload: visitor };
            },
            reducer: (state, { payload }: PayloadAction<Visitor>) => {
                state.visitors.push(payload);
            },
        },
        edit: (state, { payload }: PayloadAction<Visitor>) => {
            const indexVisitor = state.visitors.findIndex((visitor) => visitor.id === payload.id);
            state.visitors[indexVisitor] = payload;
        },
        delete: (state, { payload }: PayloadAction<Visitor>) => {
            state.visitors = state.visitors.filter((visitor) => visitor.id !== payload.id);
        },
        event: (state, { payload }: PayloadAction<EventUser>) => {
            const indexVisitor = state.visitors.findIndex((visitor) => visitor.id === payload.id);
            state.visitors[indexVisitor].status = payload.status;
            state.visitors[indexVisitor].times.push({
                timestamp: payload.timestamp,
                status: payload.status,
            });
        },
        selectedDelete: (state, { payload }: PayloadAction<Visitor[]>) => {
            for (let i = 0; i < payload.length; i++) {
                state.visitors = state.visitors.filter((visitor) => visitor.id !== payload[i].id);
            }
        },
        selectedPay: {
            prepare: (visitors: VisitorsWithTimestamp) => {
                visitors.timestamp = Date.now();
                return { payload: visitors };
            },
            reducer: (state, { payload }: PayloadAction<VisitorsWithTimestamp>) => {
                for (let i = 0; i < payload.visitors.length; i++) {
                    const indexVisitor = state.visitors.findIndex(
                        (visitor) => visitor.id === payload.visitors[i].id,
                    );
                    state.visitors[indexVisitor].status = 'finished';
                    state.visitors[indexVisitor].times.push({
                        timestamp: payload.timestamp,
                        status: 'finished',
                    });
                }
                state.total = 0;
                state.payedVisitors = [];
            },
        },
        modalPayToggle: (state, { payload }: PayloadAction<boolean>) => {
            state.modals.payVisitors = payload;
        },
        totalCalculate: (state, { payload }: PayloadAction<number>) => {
            state.total = payload;
        },
        payedVisitorsSet: (state, { payload }: PayloadAction<Visitor[]>) => {
            state.payedVisitors = payload;
        },
        timerUpdate: (state, { payload }: PayloadAction<number>) => {
            state.timer = payload;
        },
    },
});

export const { reducer, actions } = VisitorsSlice;
