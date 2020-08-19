import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

import { Bar } from './Bar';

const BarChartWrapper = styled.div`
    height: 500px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    padding: 20px 0;
`;

export const BarChart: FunctionComponent<{}> = () => {
    return (
        <BarChartWrapper>
            <Bar value={5} maxValue={10} title="05.10" />
            <Bar color="orange" value={9} maxValue={10} title="06.10" />
            <Bar color="yellow" value={7} maxValue={10} title="06.10" />
        </BarChartWrapper>
    );
};
