import {
    calculateAverageCostStatistics,
    calculateAverageDurationStatistics,
    calculateQuantityVisitorsStatistics,
    calculateTotalStatistics,
    rankData,
    sortData,
} from './statisticsUtils';
import { Status, Tariff, Visitor } from '@/screens';

describe('StatisticsUtils test', () => {
    const visitors: Array<Visitor> = [
        {
            id: 1,
            name: 'Франц',
            tariffId: 1,
            status: Status.finished,
            times: [
                { timestamp: 1597246825795, status: Status.active },
                { timestamp: 1597927148000, status: Status.finished },
            ],
        },
        {
            id: 2,
            name: 'Франц 2',
            tariffId: 2,
            status: Status.finished,
            times: [
                { timestamp: 1597246825795, status: Status.active },
                { timestamp: 1598099948000, status: Status.finished },
            ],
        },
        {
            id: 3,
            name: 'Франц 3',
            tariffId: 3,
            status: Status.finished,
            times: [
                { timestamp: 1597246825795, status: Status.active },
                { timestamp: 1598099948000, status: Status.finished },
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
            '2020-08-20': [visitors[0]],
            '2020-08-22': [visitors[1], visitors[2]],
        });
    });
    it('CalculateTotalStatistics', () => {
        expect(calculateTotalStatistics(sortData(visitors), tariffs)).toEqual([
            {
                title: '2020-08-20',
                value: 600,
            },
            {
                title: '2020-08-22',
                value: 1000,
            },
        ]);
    });
    it('calculateAverageCostStatistics', () => {
        expect(calculateAverageCostStatistics(sortData(visitors), tariffs)).toEqual([
            {
                title: '2020-08-20',
                value: 600,
            },
            {
                title: '2020-08-22',
                value: 500,
            },
        ]);
    });
    it('calculateAverageDurationStatistics', () => {
        expect(calculateAverageDurationStatistics(sortData(visitors))).toEqual([
            {
                title: '2020-08-20',
                value: 189,
            },
            {
                title: '2020-08-22',
                value: 237,
            },
        ]);
    });
    it('calculateQuantityVisitorsStatistics', () => {
        expect(calculateQuantityVisitorsStatistics(sortData(visitors))).toEqual([
            {
                title: '2020-08-20',
                value: 1,
            },
            {
                title: '2020-08-22',
                value: 2,
            },
        ]);
    });
});
