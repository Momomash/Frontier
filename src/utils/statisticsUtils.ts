import { Visitor } from '@/screens';
import { TimestampToString } from './FormatDate';

type SortedData = { [key: string]: Array<Visitor> };

export const rankData = (
    data: Array<Visitor>,
    startDate: number,
    endDate: number,
): Array<Visitor> => {
    return data.filter((item) => {
        const lastTimestamp = item.times[item.times.length - 1].timestamp;
        return startDate <= lastTimestamp && lastTimestamp <= endDate;
    });
};

export const sortData = (data: Array<Visitor>): SortedData => {
    return data.reduce((sortedData: SortedData, visitor: Visitor) => {
        const lastTimestamp = TimestampToString(visitor.times[visitor.times.length - 1].timestamp);
        if (sortedData[lastTimestamp] !== undefined) {
            sortedData[lastTimestamp].push(visitor);
        } else {
            sortedData[lastTimestamp] = [visitor];
        }
        return sortedData;
    }, {});
};
