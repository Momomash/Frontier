import {
    rankData,
    sortData,
    calculateTotalStatistics,
    calculateAverageCostStatistics,
    calculateAverageDurationStatistics,
    calculateQuantityVisitorsStatistics,
} from './statisticsUtils';
import { Visitor, Tariff } from '@/screens';

describe('StatisticsUtils test', () => {
    const visitors: Array<Visitor> = [
        {
            id: 1,
            name: 'Франц',
            tariffId: 1,
            status: 'finished',
            times: [
                { timestamp: 1597246825795, status: 'active' },
                { timestamp: 1597927148000, status: 'finished' },
                //20 августа 2020
            ],
        },
        {
            id: 2,
            name: 'Франц 2',
            tariffId: 2,
            status: 'finished',
            times: [
                { timestamp: 1597246825795, status: 'active' },
                { timestamp: 1598099948000, status: 'finished' },
                //22 августа 2020
            ],
        },
        {
            id: 3,
            name: 'Франц 3',
            tariffId: 3,
            status: 'finished',
            times: [
                { timestamp: 1597246825795, status: 'active' },
                { timestamp: 1598099948000, status: 'finished' },
                //22 августа 2020
            ],
        },
    ];
    const tariffs: Array<Tariff> = [
        {
            id: 1,
            title: '2,5р/мин',
            cost: 2.5,
            maxCost: 600,
            isDuration: true,
        },
        {
            id: 2,
            title: 'Ночефка без буфета',
            cost: 0,
            maxCost: 400,
            isDuration: false,
        },
        {
            id: 3,
            title: 'Ночефка с буфетом',
            cost: 0,
            maxCost: 600,
            isDuration: false,
        },
        {
            id: 4,
            title: 'OneGame',
            cost: 0,
            maxCost: 100,
            isDuration: false,
        },
    ];
    it('RankDate to Be three elements', () => {
        expect(rankData(visitors, 1597927148000, 1598099948000)).toStrictEqual(visitors);
    });
    it('RankDate to Be one elements', () => {
        expect(rankData(visitors, 1597927148000, 1597927148000)).toStrictEqual([visitors[0]]);
    });
    it('RankDate to Be zero elements', () => {
        expect(rankData(visitors, 1111111111111, 1111111111111)).toStrictEqual([]);
    });
    it('SortData', () => {
        expect(sortData(visitors)).toEqual({
            '2020-8-20': [visitors[0]],
            '2020-8-22': [visitors[1], visitors[2]],
        });
    });
    it('CalculateTotalStatistics', () => {
        expect(calculateTotalStatistics(sortData(visitors), tariffs)).toEqual([
            {
                title: '2020-8-20',
                value: 600,
            },
            {
                title: '2020-8-22',
                value: 1000,
            },
        ]);
    });
    it('calculateAverageCostStatistics', () => {
        expect(calculateAverageCostStatistics(sortData(visitors), tariffs)).toEqual([
            {
                title: '2020-8-20',
                value: 600,
            },
            {
                title: '2020-8-22',
                value: 500,
            },
        ]);
    });
    it('calculateAverageDurationStatistics', () => {
        expect(calculateAverageDurationStatistics(sortData(visitors))).toEqual([
            {
                title: '2020-8-20',
                value: 11338,
            },
            {
                title: '2020-8-22',
                value: 14218,
            },
        ]);
    });
    it('calculateQuatityVisitorsStatistics', () => {
        expect(calculateQuantityVisitorsStatistics(sortData(visitors))).toEqual([
            {
                title: '2020-8-20',
                value: 1,
            },
            {
                title: '2020-8-22',
                value: 2,
            },
        ]);
    });
});
