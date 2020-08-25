import { Tariff, Visitor } from '@/screens';
import { calculateCost } from '@/utils/calculateCost';
import { calculateDuration } from '@/utils/calculateDuration';

export const calculateCostHelper = (data: Visitor | Visitor[], tariffs: Array<Tariff>) => {
    data = Array.isArray(data) ? data : [data];
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        const tariffId = +data[i].tariffId;
        const tariffMaxCost = (tariffs.find((tariff) => tariff.id === tariffId) as Tariff).maxCost;
        const tariffCost = (tariffs.find((tariff) => tariff.id === tariffId) as Tariff).cost;
        const tariffIsDuration = (tariffs.find((tariff) => tariff.id === tariffId) as Tariff)
            .isDuration;
        total += calculateCost(
            tariffCost,
            tariffMaxCost,
            calculateDuration(data[i].times),
            tariffIsDuration,
        );
    }
    return total;
};
