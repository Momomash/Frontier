import { reducer } from './reducers';
import {
    visitorAdd,
    visitorDelete,
    visitorEdit,
    visitorEvent,
    visitorsSelectedDelete,
    visitorsSelectedPay,
    tariffAdd,
    tariffDelete,
    tariffEdit,
    modalPayVisitorsToggle,
    totalCalculate,
    payedVisitorsSet,
} from '@/redux/actions';
import { Event, Store, Tariff, Visitor } from '@/redux/initialState';

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

    const state: Store = {
        visitors: [initialVisitor],
        tariffs: [initialTariff],
        modals: {
            payVisitors: false,
        },
        total: 0,
        payedVisitors: [],
    };

    it('should handle VISITOR_ADD', () => {
        expect(
            reducer(state, {
                type: visitorAdd,
                payload: newVisitor,
            }),
        ).toEqual({
            visitors: [initialVisitor, newVisitor],
            tariffs: [initialTariff],
        });
    });

    it('should handle VISITOR_DELETE', () => {
        expect(
            reducer(state, {
                type: visitorDelete,
                payload: initialVisitor,
            }),
        ).toEqual({
            visitors: [],
            tariffs: [initialTariff],
        });
    });
    it('should handle VISITOR_EDIT', () => {
        expect(
            reducer(state, {
                type: visitorEdit,
                payload: {
                    id: 1,
                    name: 'Франц 1',
                    tariffId: 2,
                    status: 'finished',
                    times: [{ timestamp: 1597246825795, status: 'active' }],
                },
            }),
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
            tariffs: [initialTariff],
        });
    });
    it('should handle VISITOR_EVENT', () => {
        expect(
            reducer(state, {
                type: visitorEvent,
                payload: { timestamp: 1597246826000, status: 'pause', id: 1 },
            }),
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
            tariffs: [initialTariff],
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
                    tariffs: [initialTariff],
                    modals: {
                        payVisitors: false,
                    },
                    total: 0,
                    payedVisitors: [],
                },
                {
                    type: visitorsSelectedDelete,
                    payload: [
                        initialVisitor,
                        {
                            id: 3,
                            name: 'Франц 2',
                            tariffId: 3,
                            status: 'active',
                            times: [{ timestamp: 1597246825795, status: 'active' }],
                        },
                    ],
                },
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
            tariffs: [initialTariff],
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
                    tariffs: [initialTariff],
                    modals: {
                        payVisitors: false,
                    },
                    total: 0,
                    payedVisitors: [],
                },
                {
                    type: visitorsSelectedPay,
                    payload: {
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
                    },
                },
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
            tariffs: [initialTariff],
            total: 0,
        });
    });
    it('should handle TARIFF_ADD', () => {
        expect(
            reducer(state, {
                type: tariffAdd,
                payload: newTariff,
            }),
        ).toEqual({
            visitors: [initialVisitor],
            tariffs: [initialTariff, newTariff],
        });
    });
    it('should handle TARIFF_DELETE', () => {
        expect(
            reducer(state, {
                type: tariffDelete,
                payload: initialTariff,
            }),
        ).toEqual({
            visitors: [initialVisitor],
            tariffs: [],
        });
    });
    it('should handle TARIFF_EDIT', () => {
        expect(
            reducer(state, {
                type: tariffEdit,
                payload: {
                    id: 1,
                    title: '4р/мин',
                    cost: 4,
                    maxCost: 1000,
                    isDuration: false,
                },
            }),
        ).toEqual({
            visitors: [initialVisitor],
            tariffs: [
                {
                    id: 1,
                    title: '4р/мин',
                    cost: 4,
                    maxCost: 1000,
                    isDuration: false,
                },
            ],
        });
    });
    it('should handle MODAL_PAY_VISITORS_TOGGLE', () => {
        expect(
            reducer(state, {
                type: modalPayVisitorsToggle,
                payload: true,
            }),
        ).toEqual({
            visitors: [initialVisitor],
            tariffs: [initialTariff],
            modals: {
                payVisitors: true,
            },
        });
    });
    it('should handle TOTAL_CALCULATE', () => {
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
                    tariffs: [initialTariff],
                    modals: {
                        payVisitors: false,
                    },
                    total: 0,
                    payedVisitors: [],
                },
                {
                    type: totalCalculate,
                    payload: {
                        visitors: [initialVisitor],
                    },
                },
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
            tariffs: [initialTariff],
            modals: {
                payVisitors: false,
            },
            total: 600,
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
                    tariffs: [initialTariff],
                    modals: {
                        payVisitors: false,
                    },
                    total: 0,
                    payedVisitors: [],
                },
                {
                    type: payedVisitorsSet,
                    payload: [
                        initialVisitor,
                        {
                            id: 3,
                            name: 'Франц 2',
                            tariffId: 3,
                            status: 'active',
                            times: [{ timestamp: 1597246825795, status: 'active' }],
                        },
                    ],
                },
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
            tariffs: [initialTariff],
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
        });
    });
});
