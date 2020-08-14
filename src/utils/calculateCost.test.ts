import { calculateCost } from '@/utils/calculateCost';

describe('calculateCost test', () => {
    it('isDuration === true, cost < maxCost', () => {
        expect(calculateCost(2, 500, 100, true)).toBe(200);
    });
    it('isDuration === true, cost > maxCost', () => {
        expect(calculateCost(2, 500, 300, true)).toBe(500);
    });
    it('isDuration === true, cost === maxCost', () => {
        expect(calculateCost(2, 400, 200, true)).toBe(400);
    });
    it('isDuration === false, cost < maxCost', () => {
        expect(calculateCost(2, 600, 200, false)).toBe(600);
    });
    it('isDuration === false, cost > maxCost', () => {
        expect(calculateCost(2, 400, 300, false)).toBe(400);
    });
});
