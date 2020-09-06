import { actions, reducer, Status, Tariff, TariffsState } from './reducer';

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

    const state: TariffsState = {
        defaultTariff: 1,
        tariffs: [initialTariff],
    };

    it('should handle TARIFF_ADD', () => {
        expect(reducer(state, actions.addTariff(newTariff))).toEqual({
            defaultTariff: 1,
            tariffs: [initialTariff, newTariff],
        });
    });
    it('should handle TARIFF_DELETE', () => {
        expect(reducer(state, actions.deleteTariff(initialTariff))).toEqual({
            defaultTariff: 1,
            tariffs: [
                {
                    id: 1,
                    title: '2,5р/мин',
                    cost: 2.5,
                    maxCost: 600,
                    isDuration: true,
                    status: Status.deleted,
                },
            ],
        });
    });
    it('should handle TOGGLE_DEFAULT_TARIFF', () => {
        expect(reducer(state, actions.toggleDefaultTariff(2))).toEqual({
            defaultTariff: 2,
            tariffs: [initialTariff],
        });
    });
});
