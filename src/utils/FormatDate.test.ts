import { timestampToString, stringToTimestamp } from '@/utils/FormatDate';

describe('FormatDate test', () => {
    it('TimeStampToString', () => {
        expect(timestampToString(1598354862000)).toBe('2020-08-25');
    });
    it('StringToTimestamp', () => {
        expect(stringToTimestamp('2020-08-25')).toBe(1598313600000);
    });
});
