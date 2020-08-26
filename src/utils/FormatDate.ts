export const timestampToString = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString().split('.').reverse().join('-');
};
export const stringToTimestamp = (date: string): number => {
    return new Date(date).getTime();
};
