import { createReducer } from '@reduxjs/toolkit';
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

import initialState, { Event } from './initialState';
import { calculateCostHelper } from '@/utils';

export const reducer = createReducer(initialState, {
    [visitorAdd.type]: (state, action) => {
        state.visitors.push(action.payload);
    },
    [visitorEdit.type]: (state, action) => {
        const indexVisitor = state.visitors.findIndex(
            (visitor) => visitor.id === action.payload.id,
        );
        state.visitors[indexVisitor] = action.payload;
    },
    [visitorDelete.type]: (state, action) => {
        state.visitors = state.visitors.filter((visitor) => visitor.id !== action.payload.id);
    },
    [visitorEvent.type]: (state, action) => {
        const indexVisitor = state.visitors.findIndex(
            (visitor) => visitor.id === action.payload.id,
        );
        state.visitors[indexVisitor].status = action.payload.status;
        const time: Event = { timestamp: action.payload.timestamp, status: action.payload.status };
        state.visitors[indexVisitor].times.push(time);
    },
    [visitorsSelectedDelete.type]: (state, action) => {
        for (let i = 0; i < action.payload.length; i++) {
            state.visitors = state.visitors.filter(
                (visitor) => visitor.id !== action.payload[i].id,
            );
        }
    },
    [visitorsSelectedPay.type]: (state, action) => {
        for (let i = 0; i < action.payload.visitors.length; i++) {
            const indexVisitor = state.visitors.findIndex(
                (visitor) => visitor.id === action.payload.visitors[i].id,
            );
            state.visitors[indexVisitor].status = 'finished';
            state.visitors[indexVisitor].times.push({
                timestamp: action.payload.timestamp,
                status: 'finished',
            });
        }
        state.total = 0;
        state.payedVisitors = [];
    },
    [tariffAdd.type]: (state, action) => {
        state.tariffs.push(action.payload);
    },
    [tariffEdit.type]: (state, action) => {
        const indexTariff = state.tariffs.findIndex((tariff) => tariff.id === action.payload.id);
        state.tariffs[indexTariff] = action.payload;
    },
    [tariffDelete.type]: (state, action) => {
        state.tariffs = state.tariffs.filter((tariff) => tariff.id !== action.payload.id);
    },
    [modalPayVisitorsToggle.type]: (state, action) => {
        state.modals.payVisitors = action.payload;
    },
    [totalCalculate.type]: (state, action) => {
        let total = 0;
        for (let i = 0; i < action.payload.length; i++) {
            const indexVisitor = state.visitors.findIndex(
                (visitor) => visitor.id === action.payload[i].id,
            );
            total += calculateCostHelper(state.visitors[indexVisitor], state.tariffs);
        }
        state.total = total;
    },
    [payedVisitorsSet.type]: (state, action) => {
        state.payedVisitors = action.payload;
    },
});
