import { Tariff, Visitor } from '@/screens';
import { TimestampToString } from './FormatDate';
import { calculateCostHelper } from '@/utils/calculateCostHelper';
import { calculateDuration } from '@/utils/calculateDuration';

type SortedData = { [key: string]: Array<Visitor> };

type StatisticsData = {
    title: string;
    value: number;
};
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

export const calculateTotalStatistics = (
    data: SortedData,
    tariffs: Array<Tariff>,
): Array<StatisticsData> => {
    return Object.keys(data).map((key: string) => {
        const total = data[key].reduce((result: number, visitor: Visitor) => {
            return result + calculateCostHelper(visitor, tariffs);
        }, 0);
        return { title: key, value: total };
    });
};
export const calculateAverageCostStatistics = (
    data: SortedData,
    tariffs: Array<Tariff>,
): Array<StatisticsData> => {
    const total = calculateTotalStatistics(data, tariffs);
    return total.map((item) => ({
        title: item.title,
        value: item.value / data[item.title].length,
    }));
};
export const calculateAverageDurationStatistics = (data: SortedData): Array<StatisticsData> => {
    return Object.keys(data).map((key: string) => {
        const total = data[key].reduce((result: number, visitor: Visitor) => {
            return result + Math.round(calculateDuration(visitor.times) / 60);
        }, 0);
        return { title: key, value: total / data[key].length };
    });
};
export const calculateQuantityVisitorsStatistics = (data: SortedData): Array<StatisticsData> => {
    return Object.keys(data).map((key: string) => {
        const total = data[key].length;
        return { title: key, value: total };
    });
};
