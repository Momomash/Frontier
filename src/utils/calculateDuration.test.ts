import { calculateDuration } from '@/utils/calculateDuration';

describe('calculateDuration test', () => {
    it('active and pause', () => {
        expect(
            calculateDuration([
                { timestamp: 1597327200000, status: 'active' },
                { timestamp: 1597328400000, status: 'pause' },
            ]),
        ).toBe(20);
    });
    it('any status', () => {
        expect(
            calculateDuration([
                { timestamp: 1597320000000, status: 'active' },
                { timestamp: 1597320600000, status: 'pause' },
                { timestamp: 1597321500000, status: 'active' },
                { timestamp: 1597322580000, status: 'finished' },
            ]),
        ).toBe(28);
    });
});
