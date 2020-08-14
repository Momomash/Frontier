import { createReducer } from '@reduxjs/toolkit';
import {
    visitorAdd,
    visitorDelete,
    visitorEdit,
    visitorEvent,
    visitorsSelectedDelete,
    visitorsSelectedPay,
} from '@/redux/actions';

import initialState, { Event } from './initialState';

export const visitorReducer = createReducer(initialState, {
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
        for (let i = 0; i < action.payload.length; i++) {
            const indexVisitor = state.visitors.findIndex(
                (visitor) => visitor.id === action.payload[i].id,
            );
            state.visitors[indexVisitor].status = 'finished';
            state.visitors[indexVisitor].times.push({ timestamp: Date.now(), status: 'finished' });
        }
    },
});
