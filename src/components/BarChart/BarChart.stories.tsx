import * as React from 'react';
import { withKnobs, text, object } from '@storybook/addon-knobs';

import { BarChart } from './BarChart';

export default {
    title: 'BarChart',
    decorators: [withKnobs],
};

const dataTest = [
    { title: '1', value: 20 },
    { title: '2', value: 40 },
    { title: '3', value: 35 },
];

export const BarChartCostomize = () => {
    const data = object('data', dataTest);
    const color = text('color', 'aquamarine');

    return (
        <>
            <BarChart data={data} color={color} />
        </>
    );
};
