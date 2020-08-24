import { actions, reducer, VisitorsState, Visitor } from './reducer';

describe('reducer', () => {
    const newVisitor: Visitor = {
        id: 22,
        name: 'test',
        tariffId: 2,
        status: 'active',
        times: [{ timestamp: 1597246825795, status: 'active' }],
    };
    const initialVisitor: Visitor = {
        id: 1,
        name: 'Франц',
        tariffId: 1,
        status: 'active',
        times: [{ timestamp: 1597246825795, status: 'active' }],
    };
    const newTariff: Tariff = {
        id: 1,
        title: 'test',
        cost: 5,
        maxCost: 1000,
        isDuration: false,
    };
    const initialTariff: Tariff = {
        id: 1,
        title: '2,5р/мин',
        cost: 2.5,
        maxCost: 600,
        isDuration: true,
    };
    const event: Event = { timestamp: 111, status: 'finished' };

    const state: VisitorsState = {
        visitors: [initialVisitor],
        historyVisitors: [],
        tariffs: [initialTariff],
        modals: {
            payVisitors: false,
        },
        total: 0,
        payedVisitors: [],
        timer: 0,
    };

    it('should handle VISITOR_ADD', () => {
        expect(reducer(state, actions.add(newVisitor))).toEqual({
            visitors: [initialVisitor, newVisitor],
            modals: {
                payVisitors: false,
            },
            payedVisitors: [],
            timer: 0,
            historyVisitors: [],
            modals: {
                payVisitors: false,
            },
            total: 0,
        });
    });

    it('should handle VISITOR_DELETE', () => {
        expect(reducer(state, actions.delete(initialVisitor))).toEqual({
            visitors: [],
            modals: {
                payVisitors: false,
            },
            total: 0,
            timer: 0,
            historyVisitors: [],
            modals: {
                payVisitors: false,
            },
            payedVisitors: [],
        });
    });
    it('should handle VISITOR_EDIT', () => {
        expect(
            reducer(
                state,
                actions.edit({
                    id: 1,
                    name: 'Франц 1',
                    tariffId: 2,
                    status: 'finished',
                    times: [{ timestamp: 1597246825795, status: 'active' }],
                }),
            ),
        ).toEqual({
            visitors: [
                {
                    id: 1,
                    name: 'Франц 1',
                    tariffId: 2,
                    status: 'finished',
                    times: [{ timestamp: 1597246825795, status: 'active' }],
                },
            ],
            modals: {
                payVisitors: false,
            },
            historyVisitors: [],
            total: 0,
            payedVisitors: [],
            timer: 0,
        });
    });
    it('should handle VISITOR_EVENT', () => {
        expect(
            reducer(state, actions.event({ timestamp: 1597246826000, status: 'pause', id: 1 })),
        ).toEqual({
            visitors: [
                {
                    id: 1,
                    name: 'Франц',
                    tariffId: 1,
                    status: 'pause',
                    times: [
                        { timestamp: 1597246825795, status: 'active' },
                        { timestamp: 1597246826000, status: 'pause' },
                    ],
                },
            ],
            modals: {
                payVisitors: false,
            },
            historyVisitors: [],
            total: 0,
            payedVisitors: [],
            timer: 0,
        });
    });
    it('should handle VISITOR_SELECTED_DELETE', () => {
        expect(
            reducer(
                {
                    visitors: [
                        initialVisitor,
                        {
                            id: 2,
                            name: 'Франц 1',
                            tariffId: 2,
                            status: 'active',
                            times: [{ timestamp: 1597246822295, status: 'active' }],
                        },
                        {
                            id: 3,
                            name: 'Франц 2',
                            tariffId: 3,
                            status: 'active',
                            times: [{ timestamp: 1597246825795, status: 'active' }],
                        },
                    ],
                    historyVisitors: [],
                    tariffs: [initialTariff],
                    modals: {
                        payVisitors: false,
                    },
                    total: 0,
                    payedVisitors: [],
                    timer: 0,
                },
                actions.selectedDelete([
                    initialVisitor,
                    {
                        id: 3,
                        name: 'Франц 2',
                        tariffId: 3,
                        status: 'active',
                        times: [{ timestamp: 1597246825795, status: 'active' }],
                    },
                ]),
            ),
        ).toEqual({
            visitors: [
                {
                    id: 2,
                    name: 'Франц 1',
                    tariffId: 2,
                    status: 'active',
                    times: [{ timestamp: 1597246822295, status: 'active' }],
                },
            ],
            historyVisitors: [],
            modals: {
                payVisitors: false,
            },
            total: 0,
            payedVisitors: [],
            timer: 0,
        });
    });
    it('should handle VISITOR_SELECTED_PAY', () => {
        expect(
            reducer(
                {
                    visitors: [
                        initialVisitor,
                        {
                            id: 2,
                            name: 'Франц 1',
                            tariffId: 2,
                            status: 'active',
                            times: [{ timestamp: 1597246822295, status: 'active' }],
                        },
                        {
                            id: 3,
                            name: 'Франц 2',
                            tariffId: 3,
                            status: 'active',
                            times: [{ timestamp: 1597246825795, status: 'active' }],
                        },
                    ],
                    historyVisitors: [],
                    modals: {
                        payVisitors: false,
                    },
                    total: 0,
                    payedVisitors: [],
                    timer: 0,
                },
                actions.selectedPay({
                    visitors: [
                        initialVisitor,
                        {
                            id: 3,
                            name: 'Франц 2',
                            tariffId: 3,
                            status: 'active',
                            times: [{ timestamp: 1597246825795, status: 'active' }],
                        },
                    ],
                    timestamp: 1111111111111,
                }),
            ),
        ).toEqual({
            visitors: [
                {
                    id: 1,
                    name: 'Франц',
                    tariffId: 1,
                    status: 'finished',
                    times: [
                        { timestamp: 1597246825795, status: 'active' },
                        { timestamp: 1111111111111, status: 'finished' },
                    ],
                },
                {
                    id: 2,
                    name: 'Франц 1',
                    tariffId: 2,
                    status: 'active',
                    times: [{ timestamp: 1597246822295, status: 'active' }],
                },
                {
                    id: 3,
                    name: 'Франц 2',
                    tariffId: 3,
                    status: 'finished',
                    times: [
                        { timestamp: 1597246825795, status: 'active' },
                        { timestamp: 1111111111111, status: 'finished' },
                    ],
                },
            ],
            historyVisitors: [],
            modals: {
                payVisitors: false,
            },
            payedVisitors: [],
            total: 0,
            payedVisitors: [],
        });
    });
    it('should handle VISITORS_HISTORY_PUT', () => {
        expect(
            reducer(
                {
                    visitors: [
                        initialVisitor,
                        {
                            id: 2,
                            name: 'Франц 1',
                            tariffId: 2,
                            status: 'active',
                            times: [{ timestamp: 1597246822295, status: 'active' }],
                        },
                        {
                            id: 3,
                            name: 'Франц 2',
                            tariffId: 3,
                            status: 'active',
                            times: [{ timestamp: 1597246825795, status: 'active' }],
                        },
                    ],
                    historyVisitors: [],
                    tariffs: [initialTariff],
                    modals: {
                        payVisitors: false,
                    },
                    total: 0,
                    payedVisitors: [],
                },
                {
                    type: visitorsHistoryPut,
                },
            ),
        ).toEqual({
            visitors: [],
            historyVisitors: [
                initialVisitor,
                {
                    id: 2,
                    name: 'Франц 1',
                    tariffId: 2,
                    status: 'active',
                    times: [{ timestamp: 1597246822295, status: 'active' }],
                },
                {
                    id: 3,
                    name: 'Франц 2',
                    tariffId: 3,
                    status: 'active',
                    times: [{ timestamp: 1597246825795, status: 'active' }],
                },
            ],
            modals: {
                payVisitors: false,
            },
            payedVisitors: [],
            tariffs: [initialTariff],
            total: 0,
        });
    });
    it('should handle VISITORS_HISTORY_CLEAN', () => {
        expect(
            reducer(
                {
                    visitors: [initialVisitor],
                    historyVisitors: [
                        {
                            id: 2,
                            name: 'Франц 1',
                            tariffId: 2,
                            status: 'active',
                            times: [{ timestamp: 1597246822295, status: 'active' }],
                        },
                        {
                            id: 3,
                            name: 'Франц 2',
                            tariffId: 3,
                            status: 'active',
                            times: [{ timestamp: 1597246825795, status: 'active' }],
                        },
                    ],
                    tariffs: [initialTariff],
                    modals: {
                        payVisitors: false,
                    },
                    total: 0,
                    payedVisitors: [],
                },
                {
                    type: visitorsHistoryClean,
                },
            ),
        ).toEqual({
            visitors: [initialVisitor],
            historyVisitors: [],
            tariffs: [initialTariff],
            modals: {
                payVisitors: false,
            },
            total: 0,
            timer: 0,
        });
    });
    it('should handle MODAL_PAY_VISITORS_TOGGLE', () => {
        expect(reducer(state, actions.modalPayToggle(true))).toEqual({
            visitors: [initialVisitor],
            historyVisitors: [],
            modals: {
                payVisitors: true,
            },
            total: 0,
            payedVisitors: [],
            timer: 0,
        });
    });
    it('should handle TOTAL_CALCULATE', () => {
        expect(reducer(state, actions.totalCalculate(400))).toEqual({
            visitors: [initialVisitor],
            modals: {
                payVisitors: false,
            },
            total: 400,
            payedVisitors: [],
            timer: 0,
        });
    });
    it('should handle PAYED_VISITORS_SET', () => {
        expect(
            reducer(
                {
                    visitors: [
                        initialVisitor,
                        {
                            id: 2,
                            name: 'Франц 1',
                            tariffId: 2,
                            status: 'active',
                            times: [{ timestamp: 1597246822295, status: 'active' }],
                        },
                        {
                            id: 3,
                            name: 'Франц 2',
                            tariffId: 3,
                            status: 'active',
                            times: [{ timestamp: 1597246825795, status: 'active' }],
                        },
                    ],
                    historyVisitors: [],
                    modals: {
                        payVisitors: false,
                    },
                    total: 0,
                    payedVisitors: [],
                    timer: 0,
                },
                actions.payedVisitorsSet([
                    initialVisitor,
                    {
                        id: 3,
                        name: 'Франц 2',
                        tariffId: 3,
                        status: 'active',
                        times: [{ timestamp: 1597246825795, status: 'active' }],
                    },
                ]),
            ),
        ).toEqual({
            visitors: [
                initialVisitor,
                {
                    id: 2,
                    name: 'Франц 1',
                    tariffId: 2,
                    status: 'active',
                    times: [{ timestamp: 1597246822295, status: 'active' }],
                },
                {
                    id: 3,
                    name: 'Франц 2',
                    tariffId: 3,
                    status: 'active',
                    times: [{ timestamp: 1597246825795, status: 'active' }],
                },
            ],
            historyVisitors: [],
            total: 0,
            modals: {
                payVisitors: false,
            },
            payedVisitors: [
                initialVisitor,
                {
                    id: 3,
                    name: 'Франц 2',
                    tariffId: 3,
                    status: 'active',
                    times: [{ timestamp: 1597246825795, status: 'active' }],
                },
            ],
            timer: 0,
        });
    });
    it('should handle TIMER_UPDATE', () => {
        expect(reducer(state, actions.timerUpdate(1))).toEqual({
            visitors: [initialVisitor],
            modals: {
                payVisitors: false,
            },
            total: 0,
            payedVisitors: [],
            timer: 1,
        });
    });
});
