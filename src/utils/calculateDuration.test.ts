import { calculateDuration } from '@/utils/calculateDuration';
import { Status } from '@/screens';

describe('calculateDuration test', () => {
    it('active and pause', () => {
        expect(
            calculateDuration([
                { timestamp: 1597327200000, status: Status.active },
                { timestamp: 1597328400000, status: Status.pause },
            ]),
        ).toBe(20);
    });
    it('any status', () => {
        expect(
            calculateDuration([
                { timestamp: 1597320000000, status: Status.active },
                { timestamp: 1597320600000, status: Status.pause },
                { timestamp: 1597321500000, status: Status.active },
                { timestamp: 1597322580000, status: Status.finished },
            ]),
        ).toBe(28);
    });
});
