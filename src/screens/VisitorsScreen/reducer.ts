import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export enum Status {
    active,
    pause,
    finished,
}
export type Visitor = {
    id?: number;
    name: string;
    tariffId: number;
    status: Status;
    times: Array<Event>;
    discount: number;
};
export type NewVisitor = {
    id?: number;
    name: string;
    tariffId: number;
    status?: Status;
    times?: Array<Event>;
    discount?: number;
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
export type VisitorsState = {
    visitors: Array<Visitor>;
    historyVisitors: Array<Visitor>;
    modals: {
        payVisitors: boolean;
        historyVisitors: boolean;
    };
    total: number;
    payedVisitors: Array<Visitor>;
    timer: number;
};
export const initialState: VisitorsState = {
    visitors: [],
    historyVisitors: [],
    modals: {
        payVisitors: false,
        historyVisitors: false,
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
            prepare: (visitor: NewVisitor): { payload: Visitor } => {
                const newTime = Date.now();
                visitor.id = newTime;
                visitor.status = Status.active;
                visitor.times = [{ timestamp: newTime, status: Status.active }];
                return { payload: visitor as Visitor };
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
        selectedPay: (state, { payload }: PayloadAction<VisitorsWithTimestamp>) => {
            for (let i = 0; i < payload.visitors.length; i++) {
                const indexVisitor = state.visitors.findIndex(
                    (visitor) => visitor.id === payload.visitors[i].id,
                );
                state.visitors[indexVisitor].status = Status.finished;
                state.visitors[indexVisitor].times.push({
                    timestamp: payload.timestamp,
                    status: Status.finished,
                });
            }
            state.total = 0;
            state.payedVisitors = [];
        },
        modalPayToggle: (state, { payload }: PayloadAction<boolean>) => {
            state.modals.payVisitors = payload;
        },
        modalHistoryToggle: (state, { payload }: PayloadAction<boolean>) => {
            state.modals.historyVisitors = payload;
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
        historyPut: (state) => {
            Array.prototype.push.apply(state.historyVisitors, state.visitors);
            state.visitors = [];
        },
        historyClean: (state) => {
            state.historyVisitors = [];
        },
    },
});

export const { reducer, actions } = VisitorsSlice;
