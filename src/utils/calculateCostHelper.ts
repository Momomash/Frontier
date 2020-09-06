import { Tariff, Visitor } from '@/screens';
import { calculateCost } from '@/utils/calculateCost';
import { calculateDuration } from '@/utils/calculateDuration';

const MIN_COST = 100;

export const calculateCostHelper = (data: Visitor | Visitor[], tariffs: Array<Tariff>) => {
    data = Array.isArray(data) ? data : [data];
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        const tariffId = +data[i].tariffId;
        const tariffMaxCost = (tariffs.find((tariff) => tariff.id === tariffId) as Tariff).maxCost;
        const tariffCost = (tariffs.find((tariff) => tariff.id === tariffId) as Tariff).cost;
        const tariffIsDuration = (tariffs.find((tariff) => tariff.id === tariffId) as Tariff)
            .isDuration;
        const cost = calculateCost(
            tariffCost,
            tariffMaxCost,
            calculateDuration(data[i].times),
            tariffIsDuration,
        );
        const discountedCost = (cost * (100 - data[i].discount)) / 100;
        total += discountedCost < MIN_COST ? MIN_COST : discountedCost;
    }
    return total;
};
