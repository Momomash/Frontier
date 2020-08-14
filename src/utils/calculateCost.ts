export const calculateCost = (
    cost: number,
    maxCost: number,
    duration: number,
    isDuration: boolean,
): number => {
    const value = cost * duration;
    return isDuration && value < maxCost ? value : maxCost;
};
