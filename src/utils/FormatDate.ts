export const TimestampToString = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString().split('.').reverse().join('-');
};
export const StringToTimestamp = (date: string): number => {
    return new Date(date).getTime();
};
