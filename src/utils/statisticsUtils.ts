import { Visitor } from '@/screens';

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
