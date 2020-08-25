import { calculateCost } from './calculateCost';
import { calculateDuration } from './calculateDuration';
import { calculateCostHelper } from './calculateCostHelper';
import { theme, useStyles, drawerWidth } from './initialTheme';
import { localizationMaterialTable } from './localizationMaterialTable';
import { TimestampToString, StringToTimestamp } from './FormatDate';
import {
    rankData,
    sortData,
    calculateTotalStatistics,
    calculateAverageCostStatistics,
    calculateAverageDurationStatistics,
    calculateQuantityVisitorsStatistics,
} from './statisticsUtils';

export {
    calculateCost,
    calculateDuration,
    calculateCostHelper,
    theme,
    useStyles,
    drawerWidth,
    localizationMaterialTable,
    TimestampToString,
    StringToTimestamp,
    rankData,
    sortData,
    calculateTotalStatistics,
    calculateAverageCostStatistics,
    calculateAverageDurationStatistics,
    calculateQuantityVisitorsStatistics,
};
