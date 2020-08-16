export type Status = 'active' | 'pause' | 'finished';
export type Visitor = {
    id?: number;
    name: string;
    tariffId: number;
    status: Status;
    times: Array<Event>;
};
export type VisitorsWithTime = {
    visitors: Visitor[];
    timestamp: number;
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
export type Tariff = {
    id: number;
    title: string;
    cost: number;
    maxCost: number;
    isDuration: boolean;
};
export type Store = {
    visitors: Array<Visitor>;
    tariffs: Array<Tariff>;
};
const initialState: Store = {
    visitors: [
        {
            id: 1,
            name: 'Франц',
            tariffId: 1,
            status: 'active',
            times: [{ timestamp: 1597246825795, status: 'active' }],
        },
    ],
    tariffs: [
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
    ],
};

export default initialState;
