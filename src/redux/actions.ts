import { createAction } from '@reduxjs/toolkit';
import { Dispatch, Action } from 'redux';

import { Visitor, Event, EventUser, Tariff, VisitorsWithTime } from '@/redux/initialState';

export const visitorAdd = createAction<Visitor>('VISITOR_ADD');
export const visitorEdit = createAction<Visitor>('VISITOR_EDIT');
export const visitorDelete = createAction<Visitor>('VISITOR_DELETE');
export const visitorEvent = createAction<Event>('VISITOR_EVENT');
export const visitorsSelectedDelete = createAction<Visitor[]>('VISITORS_SELECTED_DELETE');
export const visitorsSelectedPay = createAction<VisitorsWithTime>('VISITORS_SELECTED_PAY');

export const tariffAdd = createAction<Tariff>('TARIFF_ADD');
export const tariffEdit = createAction<Tariff>('TARIFF_EDIT');
export const tariffDelete = createAction<Tariff>('TARIFF_DELETE');

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
        dispatch(visitorsSelectedPay({ visitors: value, timestamp: Date.now() }));
    };
}
export function addTariff(value: Tariff) {
    return (dispatch: Dispatch<Action<string>>) => {
        value.id = Math.random();
        dispatch(tariffAdd(value));
    };
}
export function editTariff(value: Tariff) {
    return (dispatch: Dispatch<Action<string>>) => {
        dispatch(tariffEdit(value));
    };
}
export function deleteTariff(value: Tariff) {
    return (dispatch: Dispatch<Action<string>>) => {
        dispatch(tariffDelete(value));
    };
}
