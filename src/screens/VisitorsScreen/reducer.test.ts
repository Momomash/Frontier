import { actions, reducer, Status, Visitor, VisitorsState } from './reducer';

describe('reducer', () => {
    const newVisitor: Visitor = {
        id: 22,
        name: 'test',
        tariffId: 2,
        status: Status.active,
        times: [{ timestamp: 1597246825795, status: Status.active }],
        discount: 0,
    };
    const initialVisitor: Visitor = {
        id: 1,
        name: 'Франц',
        tariffId: 1,
        status: Status.active,
        times: [{ timestamp: 1597246825795, status: Status.active }],
        discount: 0,
    };

    const state: VisitorsState = {
        visitors: [initialVisitor],
        historyVisitors: [],
        modals: {
            payVisitors: false,
            historyVisitors: false,
        },
        total: 0,
        payedVisitors: [],
        timer: 0,
    };

    it('should handle VISITOR_ADD', () => {
        expect(reducer(state, actions.add(newVisitor))).toEqual({
            visitors: [initialVisitor, newVisitor],
            payedVisitors: [],
            timer: 0,
            historyVisitors: [],
            modals: {
                payVisitors: false,
                historyVisitors: false,
            },
            total: 0,
        });
    });

    it('should handle VISITOR_DELETE', () => {
        expect(reducer(state, actions.delete(initialVisitor))).toEqual({
            visitors: [],
            total: 0,
            timer: 0,
            historyVisitors: [],
            modals: {
                payVisitors: false,
                historyVisitors: false,
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
                    status: Status.finished,
                    times: [{ timestamp: 1597246825795, status: Status.active }],
                    discount: 0,
                }),
            ),
        ).toEqual({
            visitors: [
                {
                    id: 1,
                    name: 'Франц 1',
                    tariffId: 2,
                    status: Status.finished,
                    times: [{ timestamp: 1597246825795, status: Status.active }],
                    discount: 0,
                },
            ],
            modals: {
                payVisitors: false,
                historyVisitors: false,
            },
            historyVisitors: [],
            total: 0,
            payedVisitors: [],
            timer: 0,
        });
    });
    it('should handle VISITOR_EVENT', () => {
        expect(
            reducer(
                state,
                actions.event({ timestamp: 1597246826000, status: Status.pause, id: 1 }),
            ),
        ).toEqual({
            visitors: [
                {
                    id: 1,
                    name: 'Франц',
                    tariffId: 1,
                    status: Status.pause,
                    times: [
                        { timestamp: 1597246825795, status: Status.active },
                        { timestamp: 1597246826000, status: Status.pause },
                    ],
                    discount: 0,
                },
            ],
            modals: {
                payVisitors: false,
                historyVisitors: false,
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
                            status: Status.active,
                            times: [{ timestamp: 1597246822295, status: Status.active }],
                            discount: 0,
                        },
                        {
                            id: 3,
                            name: 'Франц 2',
                            tariffId: 3,
                            status: Status.active,
                            times: [{ timestamp: 1597246825795, status: Status.active }],
                            discount: 0,
                        },
                    ],
                    historyVisitors: [],
                    modals: {
                        payVisitors: false,
                        historyVisitors: false,
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
                        status: Status.active,
                        times: [{ timestamp: 1597246825795, status: Status.active }],
                        discount: 0,
                    },
                ]),
            ),
        ).toEqual({
            visitors: [
                {
                    id: 2,
                    name: 'Франц 1',
                    tariffId: 2,
                    status: Status.active,
                    times: [{ timestamp: 1597246822295, status: Status.active }],
                    discount: 0,
                },
            ],
            historyVisitors: [],
            modals: {
                payVisitors: false,
                historyVisitors: false,
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
                            status: Status.active,
                            times: [{ timestamp: 1597246822295, status: Status.active }],
                            discount: 0,
                        },
                        {
                            id: 3,
                            name: 'Франц 2',
                            tariffId: 3,
                            status: Status.active,
                            times: [{ timestamp: 1597246825795, status: Status.active }],
                            discount: 0,
                        },
                    ],
                    historyVisitors: [],
                    modals: {
                        payVisitors: false,
                        historyVisitors: false,
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
                            status: Status.active,
                            times: [{ timestamp: 1597246825795, status: Status.active }],
                            discount: 0,
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
                    status: Status.finished,
                    times: [
                        { timestamp: 1597246825795, status: Status.active },
                        { timestamp: 1111111111111, status: Status.finished },
                    ],
                    discount: 0,
                },
                {
                    id: 2,
                    name: 'Франц 1',
                    tariffId: 2,
                    status: Status.active,
                    times: [{ timestamp: 1597246822295, status: Status.active }],
                    discount: 0,
                },
                {
                    id: 3,
                    name: 'Франц 2',
                    tariffId: 3,
                    status: Status.finished,
                    times: [
                        { timestamp: 1597246825795, status: Status.active },
                        { timestamp: 1111111111111, status: Status.finished },
                    ],
                    discount: 0,
                },
            ],
            historyVisitors: [],
            modals: {
                payVisitors: false,
                historyVisitors: false,
            },
            payedVisitors: [],
            total: 0,
            timer: 0,
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
                            status: Status.active,
                            times: [{ timestamp: 1597246822295, status: Status.active }],
                            discount: 0,
                        },
                        {
                            id: 3,
                            name: 'Франц 2',
                            tariffId: 3,
                            status: Status.active,
                            times: [{ timestamp: 1597246825795, status: Status.active }],
                            discount: 0,
                        },
                    ],
                    historyVisitors: [],
                    modals: {
                        payVisitors: false,
                        historyVisitors: false,
                    },
                    total: 0,
                    payedVisitors: [],
                    timer: 0,
                },
                actions.historyPut(),
            ),
        ).toEqual({
            visitors: [],
            historyVisitors: [
                initialVisitor,
                {
                    id: 2,
                    name: 'Франц 1',
                    tariffId: 2,
                    status: Status.active,
                    times: [{ timestamp: 1597246822295, status: Status.active }],
                    discount: 0,
                },
                {
                    id: 3,
                    name: 'Франц 2',
                    tariffId: 3,
                    status: Status.active,
                    times: [{ timestamp: 1597246825795, status: Status.active }],
                    discount: 0,
                },
            ],
            modals: {
                payVisitors: false,
                historyVisitors: false,
            },
            payedVisitors: [],
            total: 0,
            timer: 0,
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
                            status: Status.active,
                            times: [{ timestamp: 1597246822295, status: Status.active }],
                            discount: 0,
                        },
                        {
                            id: 3,
                            name: 'Франц 2',
                            tariffId: 3,
                            status: Status.active,
                            times: [{ timestamp: 1597246825795, status: Status.active }],
                            discount: 0,
                        },
                    ],
                    modals: {
                        payVisitors: false,
                        historyVisitors: false,
                    },
                    total: 0,
                    payedVisitors: [],
                    timer: 0,
                },
                actions.historyClean,
            ),
        ).toEqual({
            visitors: [initialVisitor],
            historyVisitors: [],
            modals: {
                payVisitors: false,
                historyVisitors: false,
            },
            payedVisitors: [],
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
                historyVisitors: false,
            },
            total: 0,
            payedVisitors: [],
            timer: 0,
        });
    });
    it('should handle MODAL_PAY_VISITORS_TOGGLE', () => {
        expect(reducer(state, actions.modalHistoryToggle(true))).toEqual({
            visitors: [initialVisitor],
            historyVisitors: [],
            modals: {
                payVisitors: false,
                historyVisitors: true,
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
                historyVisitors: false,
            },
            total: 400,
            payedVisitors: [],
            timer: 0,
            historyVisitors: [],
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
                            status: Status.active,
                            times: [{ timestamp: 1597246822295, status: Status.active }],
                            discount: 0,
                        },
                        {
                            id: 3,
                            name: 'Франц 2',
                            tariffId: 3,
                            status: Status.active,
                            times: [{ timestamp: 1597246825795, status: Status.active }],
                            discount: 0,
                        },
                    ],
                    historyVisitors: [],
                    modals: {
                        payVisitors: false,
                        historyVisitors: false,
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
                        status: Status.active,
                        times: [{ timestamp: 1597246825795, status: Status.active }],
                        discount: 0,
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
                    status: Status.active,
                    times: [{ timestamp: 1597246822295, status: Status.active }],
                    discount: 0,
                },
                {
                    id: 3,
                    name: 'Франц 2',
                    tariffId: 3,
                    status: Status.active,
                    times: [{ timestamp: 1597246825795, status: Status.active }],
                    discount: 0,
                },
            ],
            historyVisitors: [],
            total: 0,
            modals: {
                payVisitors: false,
                historyVisitors: false,
            },
            payedVisitors: [
                initialVisitor,
                {
                    id: 3,
                    name: 'Франц 2',
                    tariffId: 3,
                    status: Status.active,
                    times: [{ timestamp: 1597246825795, status: Status.active }],
                    discount: 0,
                },
            ],
            timer: 0,
        });
    });
    it('should handle TIMER_UPDATE', () => {
        expect(reducer(state, actions.timerUpdate(1))).toEqual({
            visitors: [initialVisitor],
            historyVisitors: [],
            modals: {
                payVisitors: false,
                historyVisitors: false,
            },
            total: 0,
            payedVisitors: [],
            timer: 1,
        });
    });
});
