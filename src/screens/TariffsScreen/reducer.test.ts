import { actions, reducer, State, Tariff } from './reducer';

describe('reducer', () => {
    const newTariff: Tariff = {
        id: 1,
        title: 'test',
        cost: 5,
        maxCost: 1000,
        isDuration: false,
    };
    const initialTariff: Tariff = {
        id: 1,
        title: '2,5р/мин',
        cost: 2.5,
        maxCost: 600,
        isDuration: true,
    };

    const state: State = {
        tariffs: [initialTariff],
    };

    it('should handle TARIFF_ADD', () => {
        expect(reducer(state, actions.add(newTariff))).toEqual({
            tariffs: [initialTariff, newTariff],
        });
    });
    it('should handle TARIFF_DELETE', () => {
        expect(reducer(state, actions.delete(initialTariff))).toEqual({
            tariffs: [],
        });
    });
    it('should handle TARIFF_EDIT', () => {
        expect(
            reducer(
                state,
                actions.edit({
                    id: 1,
                    title: '4р/мин',
                    cost: 4,
                    maxCost: 1000,
                    isDuration: false,
                }),
            ),
        ).toEqual({
            tariffs: [
                {
                    id: 1,
                    title: '4р/мин',
                    cost: 4,
                    maxCost: 1000,
                    isDuration: false,
                },
            ],
        });
    });
});
