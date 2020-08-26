import { mount } from 'enzyme';
import React from 'react';

import { BarChart } from './BarChart';

describe('AlertDialog', () => {
    it('Render', () => {
        const data = [
            { title: '1', value: 10 },
            { title: '2', value: 5 },
            { title: '2', value: 8 },
        ];
        const wrapper = mount(<BarChart data={data} color="red" />);
        expect(wrapper.props().color).toBe('red');
    });
});
