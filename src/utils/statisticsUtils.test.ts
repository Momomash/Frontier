import { rankData } from './statisticsUtils';
import { Visitor } from '@/screens';

describe('StatisticsUtils test', () => {
    const visitors: Visitor[] = [
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
    ];
    it('RankDate to Be two elements', () => {
        expect(rankData(visitors, 1597927148000, 1598099948000)).toStrictEqual(visitors);
    });
    it('RankDate to Be one elements', () => {
        expect(rankData(visitors, 1597927148000, 1597927148000)).toStrictEqual([visitors[0]]);
    });
    it('RankDate to Be zero elements', () => {
        expect(rankData(visitors, 1111111111111, 1111111111111)).toStrictEqual([]);
    });
});
