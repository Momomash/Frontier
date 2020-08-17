import { calculateCostHelper } from './calculateCostHelper';
import { Tariff, Visitor } from '@/redux/initialState';

describe('calculateTariffHelper test', () => {
    const visitors: Array<Visitor> = [
        {
            id: 1,
            name: 'Франц',
            tariffId: 1,
            status: 'pause',
            times: [
                { timestamp: 1597665600000, status: 'active' },
                { timestamp: 1597666800000, status: 'pause' },
            ],
        },
        {
            id: 2,
            name: 'Франц 2',
            tariffId: 2,
            status: 'active',
            times: [
                { timestamp: 1597665600000, status: 'active' },
                { timestamp: 1597666800000, status: 'pause' },
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

    it('1 visitor: duration < maxDuration', () => {
        expect(calculateCostHelper(visitors[0], tariffs)).toBe(50);
    });
    it('1 visitors: is duration: false', () => {
        expect(calculateCostHelper(visitors[1], tariffs)).toBe(400);
    });
});
