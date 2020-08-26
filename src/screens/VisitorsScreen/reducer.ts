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
    historyVisitors: [
        {
            id: 1,
            name: 'Франц',
            tariffId: 1,
            status: Status.finished,
            times: [
                { timestamp: 1597833600000, status: Status.active },
                { timestamp: 1597847340000, status: Status.finished },
            ],
        },
        {
            id: 2,
            name: 'Франц 2',
            tariffId: 2,
            status: Status.finished,
            times: [
                { timestamp: 1597836180000, status: Status.active },
                { timestamp: 1597847340000, status: Status.finished },
            ],
        },
        {
            id: 3,
            name: 'Франц 3',
            tariffId: 3,
            status: Status.finished,
            times: [
                { timestamp: 1597924800000, status: Status.active },
                { timestamp: 1597938000000, status: Status.finished },
            ],
        },
        {
            id: 4,
            name: 'Франц 4',
            tariffId: 2,
            status: Status.finished,
            times: [
                { timestamp: 1597929600000, status: Status.active },
                { timestamp: 1597953360000, status: Status.finished },
            ],
        },
        {
            id: 5,
            name: 'Франц 5',
            tariffId: 4,
            status: Status.finished,
            times: [
                { timestamp: 1598098200000, status: Status.active },
                { timestamp: 1598120400000, status: Status.finished },
            ],
        },
        {
            id: 6,
            name: 'Франц 6',
            tariffId: 1,
            status: Status.finished,
            times: [
                { timestamp: 1598184000000, status: Status.active },
                { timestamp: 1598209200000, status: Status.finished },
            ],
        },
        {
            id: 7,
            name: 'Франц 7',
            tariffId: 2,
            status: Status.finished,
            times: [
                { timestamp: 1598199600000, status: Status.active },
                { timestamp: 1598219100000, status: Status.finished },
            ],
        },
    ],
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
            prepare: (visitor: Visitor) => {
                const newTime = Date.now();
                visitor.id = newTime;
                visitor.status = Status.active;
                visitor.times = [{ timestamp: newTime, status: Status.active }];
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
