import { createAction } from '@reduxjs/toolkit';
import { Dispatch, Action } from 'redux';

import { Visitor, Event, EventUser } from '@/redux/initialState';

export const visitorAdd = createAction<Visitor>('VISITOR_ADD');
export const visitorEdit = createAction<Visitor>('VISITOR_EDIT');
export const visitorDelete = createAction<Visitor>('VISITOR_DELETE');
export const visitorEvent = createAction<Event>('VISITOR_EVENT');
export const visitorsSelectedDelete = createAction<Visitor[]>('VESITORS_SELECTED_DELETE');
export const visitorsSelectedPay = createAction<Visitor[]>('VISITORS_SELECTED_PAY');

export function addVisitor(value: Visitor) {
    return (dispatch: Dispatch<Action<string>>) => {
        value.id = Math.random();
        value.status = 'active';
        value.times = [{ timestamp: Date.now(), status: 'active' }];
        dispatch(visitorAdd(value));
    };
}
export function editVisitor(value: Visitor) {
    return (dispatch: Dispatch<Action<string>>) => {
        dispatch(visitorEdit(value));
    };
}
export function deleteVisitor(value: Visitor) {
    return (dispatch: Dispatch<Action<string>>) => {
        dispatch(visitorDelete(value));
    };
}
export function eventVisitor(value: EventUser) {
    return (dispatch: Dispatch<Action<string>>) => {
        dispatch(visitorEvent(value));
    };
}
export function deleteSelectedVisitors(value: Visitor[]) {
    return (dispatch: Dispatch<Action<string>>) => {
        dispatch(visitorsSelectedDelete(value));
    };
}
export function paySelectedVisitors(value: Visitor[]) {
    return (dispatch: Dispatch<Action<string>>) => {
        dispatch(visitorsSelectedPay(value));
    };
}

//
// export const tariffAdd = createAction('TARIFF_ADD');
// export const tariffEdit = createAction('TARIFF_EDIT');
// export const tariffDelete = createAction('TARIFF_DELETE');
// export const tariffsSelectedDelete = createAction('TARIFFS_SELECTED_DELETE');
// export const tariffsSelectedPay = createAction('TARIFFS_SELECTED_PAY');
