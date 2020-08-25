import { calculateCostHelper } from './calculateCostHelper';
import { Status, Tariff, Visitor } from '@/screens';

describe('calculateTariffHelper test', () => {
    const visitors: Array<Visitor> = [
        {
            id: 1,
            name: 'Франц',
            tariffId: 1,
            status: Status.pause,
            times: [
                { timestamp: 1597665600000, status: Status.active },
                { timestamp: 1597666800000, status: Status.pause },
            ],
        },
        {
            id: 2,
            name: 'Франц 2',
            tariffId: 2,
            status: Status.pause,
            times: [
                { timestamp: 1597665600000, status: Status.active },
                { timestamp: 1597666800000, status: Status.pause },
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

    it('1 visitor', () => {
        expect(calculateCostHelper(visitors[0], tariffs)).toBe(50);
    });
    it('Array visitors', () => {
        expect(calculateCostHelper(visitors, tariffs)).toBe(450);
    });
});
