import { Tariff, Visitor } from '@/redux/initialState';
import { calculateCost } from '@/utils/calculateCost';
import { calculateDuration } from '@/utils/calculateDuration';

export const calculateCostHelper = (data: Visitor, tariffs: Array<Tariff>) => {
    const tariffId = +data.tariffId;
    const tariffMaxCost = (tariffs.find((tariff) => tariff.id === tariffId) as Tariff).maxCost;
    const tariffCost = (tariffs.find((tariff) => tariff.id === tariffId) as Tariff).cost;
    const tariffIsDuration = (tariffs.find((tariff) => tariff.id === tariffId) as Tariff)
        .isDuration;
    return calculateCost(
        tariffCost,
        tariffMaxCost,
        calculateDuration(data.times),
        tariffIsDuration,
    );
};
