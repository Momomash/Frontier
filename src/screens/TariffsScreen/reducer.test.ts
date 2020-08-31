import { actions, reducer, Status, Tariff } from './reducer';

describe('reducer', () => {
    const newTariff: Tariff = {
        id: 1,
        title: 'test',
        cost: 5,
        maxCost: 1000,
        isDuration: false,
        status: Status.active,
    };
    const initialTariff: Tariff = {
        id: 1,
        title: '2,5р/мин',
        cost: 2.5,
        maxCost: 600,
        isDuration: true,
        status: Status.active,
    };

    const state = [initialTariff];

    it('should handle TARIFF_ADD', () => {
        expect(reducer(state, actions.add(newTariff))).toEqual([initialTariff, newTariff]);
    });
    it('should handle TARIFF_DELETE', () => {
        expect(reducer(state, actions.delete(initialTariff))).toEqual([
            {
                id: 1,
                title: '2,5р/мин',
                cost: 2.5,
                maxCost: 600,
                isDuration: true,
                status: Status.deleted,
            },
        ]);
    });
});
