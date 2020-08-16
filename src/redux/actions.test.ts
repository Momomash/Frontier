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
} from '@/redux/actions';

import { Visitor, Event, Tariff } from './initialState';

describe('actions', () => {
    const visitor: Visitor = {
        id: 22,
        name: 'test',
        tariffId: 2,
        status: 'active',
        times: [{ timestamp: 1597246825795, status: 'active' }],
    };
    const tariff: Tariff = {
        id: 1,
        title: 'test',
        cost: 5,
        maxCost: 1000,
        isDuration: false,
    };
    const event: Event = { timestamp: 111, status: 'finished' };
    it('should create an action to VISITOR_ADD', () => {
        const action = visitorAdd(visitor);
        expect(action).toEqual({
            payload: visitor,
            type: 'VISITOR_ADD',
        });
    });
    it('should create an action to VISITOR_DELETE', () => {
        const action = visitorDelete(visitor);
        expect(action).toEqual({
            payload: visitor,
            type: 'VISITOR_DELETE',
        });
    });
    it('should create an action to VISITOR_EDIT', () => {
        const action = visitorEdit(visitor);
        expect(action).toEqual({
            payload: visitor,
            type: 'VISITOR_EDIT',
        });
    });
    it('should create an action to VISITOR_EVENT', () => {
        const action = visitorEvent(event);
        expect(action).toEqual({
            payload: event,
            type: 'VISITOR_EVENT',
        });
    });
    it('should create an action to VISITORS_SELECTED_DELETE', () => {
        const action = visitorsSelectedDelete([visitor, visitor]);
        expect(action).toEqual({
            payload: [visitor, visitor],
            type: 'VISITORS_SELECTED_DELETE',
        });
    });
    it('should create an action to VISITORS_SELECTED_PAY', () => {
        const action = visitorsSelectedPay({
            visitors: [visitor, visitor],
            timestamp: 1111111111111,
        });
        expect(action).toEqual({
            payload: {
                visitors: [visitor, visitor],
                timestamp: 1111111111111,
            },
            type: 'VISITORS_SELECTED_PAY',
        });
    });
    it('should create an action to TARIFF_ADD', () => {
        const action = tariffAdd(tariff);
        expect(action).toEqual({
            payload: tariff,
            type: 'TARIFF_ADD',
        });
    });
    it('should create an action to TARIFF_EDIT', () => {
        const action = tariffEdit(tariff);
        expect(action).toEqual({
            payload: tariff,
            type: 'TARIFF_EDIT',
        });
    });
    it('should create an action to TARIFF_DELETE', () => {
        const action = tariffDelete(tariff);
        expect(action).toEqual({
            payload: tariff,
            type: 'TARIFF_DELETE',
        });
    });
});
