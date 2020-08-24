import { actions, reducer, State, Visitor } from './reducer';

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

    const state: State = {
        visitors: [initialVisitor],
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
            total: 0,
            payedVisitors: [],
            timer: 0,
        });
    });

    it('should handle VISITOR_DELETE', () => {
        expect(reducer(state, actions.delete(initialVisitor))).toEqual({
            visitors: [],
            modals: {
                payVisitors: false,
            },
            total: 0,
            payedVisitors: [],
            timer: 0,
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
            modals: {
                payVisitors: false,
            },
            payedVisitors: [],
            total: 0,
            timer: 0,
        });
    });
    it('should handle MODAL_PAY_VISITORS_TOGGLE', () => {
        expect(reducer(state, actions.modalPayToggle(true))).toEqual({
            visitors: [initialVisitor],
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
