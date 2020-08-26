import React, { FunctionComponent, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import { Store } from '@/store';
import { actions } from './reducer';
import { Visitor, Tariff } from '@/screens';
import {
    TimestampToString,
    StringToTimestamp,
    rankData,
    sortData,
    calculateTotalStatistics,
    calculateAverageCostStatistics,
    calculateAverageDurationStatistics,
    calculateQuantityVisitorsStatistics,
} from '@/utils';
import { BarChart } from '@/components';

const Controls = styled(FormControl)`
    margin: 0 20px 30px 0;
    label {
        font-weight: bold;
        margin-bottom: 5px;
    }
`;
type Props = {
    historyVisitors: Array<Visitor>;
    tariffs: Array<Tariff>;
    startDate: string;
    endDate: string;
    statisticsIndicator: string;
    updateStartDate(date: string): void;
    updateEndDate(date: string): void;
    updateStatisticsIndicator(indicator: string): void;
};
const StatisticsComponent: FunctionComponent<Props> = ({
    historyVisitors,
    tariffs,
    startDate,
    endDate,
    statisticsIndicator,
    updateEndDate,
    updateStartDate,
    updateStatisticsIndicator,
}) => {
    const dataRanged = rankData(
        historyVisitors,
        StringToTimestamp(startDate),
        StringToTimestamp(endDate),
    );
    let data;
    switch (statisticsIndicator) {
        case 'total':
            data = calculateTotalStatistics(sortData(dataRanged), tariffs);
            break;
        case 'average-cost':
            data = calculateAverageCostStatistics(sortData(dataRanged), tariffs);
            break;
        case 'average-duration':
            data = calculateAverageDurationStatistics(sortData(dataRanged));
            break;
        case 'quantity-visitors':
            data = calculateQuantityVisitorsStatistics(sortData(dataRanged));
            break;
        default:
            data = calculateTotalStatistics(sortData(dataRanged), tariffs);
    }
    const handleChoice = (event: React.ChangeEvent<{ value: unknown }>) => {
        updateStatisticsIndicator(event.target.value as string);
    };
    const handleStartDate = (event: React.ChangeEvent<{ value: string }>) => {
        updateStartDate(event.target.value);
    };
    const handleEndDate = (event: React.ChangeEvent<{ value: string }>) => {
        updateEndDate(event.target.value);
    };
    useEffect(() => {
        if (!startDate) {
            updateStartDate(TimestampToString(Date.now() - 2592000000));
        }
        if (!endDate) {
            updateEndDate(TimestampToString(Date.now() + 86400000));
        }
        if (!statisticsIndicator) {
            updateStatisticsIndicator('total');
        }
    });
    return (
        <>
            <Controls>
                <InputLabel id="statistics-choice-label">Показатель статистики</InputLabel>
                <Select
                    labelId="statistics-choice-label"
                    id="statistics-choice"
                    value={statisticsIndicator}
                    onChange={handleChoice}
                >
                    <MenuItem value={'total'}>Итого за день</MenuItem>
                    <MenuItem value={'average-cost'}>Средняя стоимость посещения</MenuItem>
                    <MenuItem value={'average-duration'}>
                        Средняя продолжительность посещения (часов)
                    </MenuItem>
                    <MenuItem value={'quantity-visitors'}>Количество посетителей</MenuItem>
                </Select>
            </Controls>
            <Controls>
                <TextField
                    label="C"
                    type="date"
                    defaultValue={startDate}
                    onChange={handleStartDate}
                />
            </Controls>
            <Controls>
                <TextField label="По" type="date" defaultValue={endDate} onChange={handleEndDate} />
            </Controls>
            <BarChart data={data} />
        </>
    );
};
const mapStateToProps = (store: Store) => {
    return {
        historyVisitors: store.visitors.historyVisitors,
        tariffs: store.tariffs,
        startDate: store.statistics.startDate,
        endDate: store.statistics.endDate,
        statisticsIndicator: store.statistics.statisticsIndicator,
    };
};
const mapDispatchToProps = {
    updateStartDate: actions.updateStartDate,
    updateEndDate: actions.updateEndDate,
    updateStatisticsIndicator: actions.updateStatisticsIndicator,
};

export const StatisticsScreen = connect(mapStateToProps, mapDispatchToProps)(StatisticsComponent);
