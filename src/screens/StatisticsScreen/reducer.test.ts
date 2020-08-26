import { actions, reducer } from './reducer';

describe('reducer', () => {
    const state = {
        startDate: '',
        endDate: '',
        statisticsIndicator: '',
    };

    it('should handle UPDATE_START_DATE', () => {
        expect(reducer(state, actions.updateStartDate('25.08.2020'))).toEqual({
            startDate: '25.08.2020',
            endDate: '',
            statisticsIndicator: '',
        });
    });
    it('should handle UPDATE_END_DATE', () => {
        expect(reducer(state, actions.updateEndDate('25.08.2020'))).toEqual({
            startDate: '',
            endDate: '25.08.2020',
            statisticsIndicator: '',
        });
    });
    it('should handle UPDATE_STATISTICS_INDICATOR', () => {
        expect(reducer(state, actions.updateStatisticsIndicator('total'))).toEqual({
            startDate: '',
            endDate: '',
            statisticsIndicator: 'total',
        });
    });
});
