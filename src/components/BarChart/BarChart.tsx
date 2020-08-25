import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

import { Bar } from './Bar';

type DataItem = {
    title: string;
    value: number;
};
type Props = {
    color?: string;
    data: Array<DataItem>;
};

const BarChartWrapper = styled.div`
    height: 500px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    padding: 20px 0;
`;

export const BarChart: FunctionComponent<Props> = ({ color, data }) => {
    const isMaxValue = () => {
        const maxItem = data.reduce((prev, cur) => {
            if (prev.value > cur.value) {
                return prev;
            }
            return cur;
        });
        return maxItem.value;
    };
    return (
        <BarChartWrapper>
            {data.map(function (item) {
                return (
                    <Bar
                        color={color}
                        value={item.value}
                        maxValue={isMaxValue()}
                        title={item.title}
                        key={item.title}
                    />
                );
            })}
        </BarChartWrapper>
    );
};
