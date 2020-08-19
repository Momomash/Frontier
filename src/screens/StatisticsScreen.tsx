import React, { FunctionComponent } from 'react';
import { BarChart } from '@/components';

const dataTest = [
    { title: '1', value: 20 },
    { title: '2', value: 40 },
    { title: '3', value: 35 },
];

export const StatisticsScreen: FunctionComponent<{}> = () => {
    return <BarChart data={dataTest} color="aquamarine" />;
};
