import * as React from 'react';
import { withKnobs, text, number } from '@storybook/addon-knobs';

import { Bar } from './Bar';

export default {
    title: 'BarChart',
    decorators: [withKnobs],
};

export const BarItem = () => {
    const title = text('title', '26.08');
    const value = number('value', 35);
    const maxValue = number('maxValue', 100);
    const color = text('color', 'aquamarine');

    return (
        <div
            style={{
                height: 200,
                padding: '30px 0',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
            }}
        >
            <Bar title={title} value={value} maxValue={maxValue} color={color} />
        </div>
    );
};
