import { mount } from 'enzyme';
import React from 'react';

import { Bar, BarItem } from './Bar';

describe('AlertDialog', () => {
    it('Render with color props', () => {
        const wrapper = mount(<Bar value={6} maxValue={10} title="test" color="red" />);
        expect(wrapper.props().value).toBe(6);
        expect(wrapper.props().maxValue).toBe(10);
        expect(wrapper.props().title).toBe('test');
        expect(wrapper.props().color).toBe('red');
        expect(wrapper.find(BarItem).prop('height')).toBe(60);
    });
    it('Render without color', () => {
        const wrapper = mount(<Bar value={8} maxValue={20} title="test1" />);
        expect(wrapper.props().value).toBe(8);
        expect(wrapper.props().maxValue).toBe(20);
        expect(wrapper.props().title).toBe('test1');
        expect(wrapper.props().color).toBe(undefined);
        expect(wrapper.find(BarItem).prop('height')).toBe(40);
    });
});
