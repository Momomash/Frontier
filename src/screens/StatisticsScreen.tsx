import React, { FunctionComponent } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import { Store } from '@/store';
import { Visitor, Tariff } from '@/screens';
import { TimestampToString, StringToTimestamp, rankData } from '@/utils';
import { BarChart } from '@/components';

const Controls = styled(FormControl)`
    margin: 0 20px 30px 0;
    label {
        font-weight: bold;
        margin-bottom: 5px;
    }
`;
const dataTest = [
    { title: '1', value: 20 },
    { title: '2', value: 40 },
    { title: '3', value: 35 },
];
type Props = {
    historyVisitors: Array<Visitor>;
    tariffs: Array<Tariff>;
};
const StatisticsComponent: FunctionComponent<Props> = ({ historyVisitors, tariffs }) => {
    let startDate = TimestampToString(Date.now() - 2592000000);
    let endDate = TimestampToString(Date.now());
    let dataRanged = rankData(
        historyVisitors,
        StringToTimestamp(startDate),
        StringToTimestamp(endDate),
    );
    const handleChoice = (event: React.ChangeEvent<{ value: unknown }>) => {
        alert(event.target.value);
    };
    const handleStartDate = (event: React.ChangeEvent<{ value: string }>) => {
        startDate = event.target.value;
        dataRanged = rankData(
            historyVisitors,
            StringToTimestamp(startDate),
            StringToTimestamp(endDate),
        );
    };
    const handleEndDate = (event: React.ChangeEvent<{ value: string }>) => {
        endDate = event.target.value;
        dataRanged = rankData(
            historyVisitors,
            StringToTimestamp(startDate),
            StringToTimestamp(endDate),
        );
    };
    return (
        <>
            <Controls>
                <InputLabel id="statistics-choice-label">Показатель статистики</InputLabel>
                <Select
                    labelId="statistics-choice-label"
                    id="statistics-choice"
                    value={'total'}
                    onChange={handleChoice}
                >
                    <MenuItem value={'total'}>Итого за день</MenuItem>
                    <MenuItem value={'average-cost'}>Средняя стоимость посещения</MenuItem>
                    <MenuItem value={'average-duration'}>
                        Средняя продолжительность посещения
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
            <BarChart data={dataTest} color="aquamarine" />
        </>
    );
};
const mapStateToProps = (store: Store) => {
    return {
        historyVisitors: store.visitors.historyVisitors,
        tariffs: store.tariffs,
    };
};
const mapDispatchToProps = {};

export const StatisticsScreen = connect(mapStateToProps, mapDispatchToProps)(StatisticsComponent);
