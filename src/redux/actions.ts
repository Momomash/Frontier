import { createAction } from '@reduxjs/toolkit';
import { Dispatch, Action } from 'redux';

import { Visitor, Event, EventUser, Tariff, VisitorsWithTime } from '@/redux/initialState';

export const visitorAdd = createAction<Visitor>('VISITOR_ADD');
export const visitorEdit = createAction<Visitor>('VISITOR_EDIT');
export const visitorDelete = createAction<Visitor>('VISITOR_DELETE');
export const visitorEvent = createAction<Event>('VISITOR_EVENT');
export const visitorsSelectedDelete = createAction<Visitor[]>('VISITORS_SELECTED_DELETE');
export const visitorsSelectedPay = createAction<VisitorsWithTime>('VISITORS_SELECTED_PAY');
export const visitorsHistoryPut = createAction('VISITORS_HISTORY_PUT');
export const visitorsHistoryClean = createAction('VISITORS_HISTORY_CLEAN');

export const tariffAdd = createAction<Tariff>('TARIFF_ADD');
export const tariffEdit = createAction<Tariff>('TARIFF_EDIT');
export const tariffDelete = createAction<Tariff>('TARIFF_DELETE');

export const modalPayVisitorsToggle = createAction<boolean>('MODAL_PAY_VISITORS_TOGGLE');
export const totalCalculate = createAction<Visitor[]>('TOTAL_CALCULATE');
export const payedVisitorsSet = createAction<Visitor[]>('PAYED_VISITORS_SET');

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
export function putVisitorsHistory() {
    return (dispatch: Dispatch<Action<string>>) => {
        dispatch(visitorsHistoryPut());
    };
}
export function cleanVisitorsHistory() {
    return (dispatch: Dispatch<Action<string>>) => {
        dispatch(visitorsHistoryClean());
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
export function toggleModalPayVisitors(value: boolean) {
    return (dispatch: Dispatch<Action<string>>) => {
        dispatch(modalPayVisitorsToggle(value));
    };
}
export function calculateTotal(value: Visitor[]) {
    return (dispatch: Dispatch<Action<string>>) => {
        dispatch(totalCalculate(value));
    };
}
export function setPayedVisitors(value: Visitor[]) {
    return (dispatch: Dispatch<Action<string>>) => {
        dispatch(payedVisitorsSet(value));
    };
}
