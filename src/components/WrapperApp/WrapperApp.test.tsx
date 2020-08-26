import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { WrapperApp } from './WrapperApp';

describe('WrapperApp ', () => {
    it('should active class for link onclick', () => {
        const wrapper = mount(
            <Router>
                <WrapperApp />
            </Router>,
        );
        const link = wrapper.find('a[href="/tariffs"]');
        link.simulate('click');
        setTimeout(() => {
            expect(link.hasClass('active')).toEqual(true);
        }, 1000);
    });
});
