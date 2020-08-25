import { TimestampToString, StringToTimestamp } from '@/utils/FormatDate';

describe('FormatDate test', () => {
    it('TimeStampToString', () => {
        expect(TimestampToString(1598354862000)).toBe('2020-8-25');
    });
    it('StringToTimestamp', () => {
        expect(StringToTimestamp('2020-8-25')).toBe(1598302800000);
    });
});
