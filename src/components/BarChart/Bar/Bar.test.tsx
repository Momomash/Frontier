import { mount } from 'enzyme';
import React from 'react';

import { Bar, BarItem } from './Bar';

describe('AlertDialog', () => {
    it('Render', () => {
        const wrapper = mount(<Bar value={6} maxValue={10} title="test" color="red" />);
        expect(wrapper.props().value).toBe(6);
        expect(wrapper.props().maxValue).toBe(10);
        expect(wrapper.props().title).toBe('test');
        expect(wrapper.props().color).toBe('red');
        expect(wrapper.find(BarItem).prop('height')).toBe(60);
    });
});
