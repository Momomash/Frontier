import { mount } from 'enzyme';
import React from 'react';

import { AlertDialog } from './AlertDialog';

describe('AlertDialog', () => {
    it('Render', () => {
        const onClick = jest.fn();
        const wrapper = mount(
            <AlertDialog
                agreeButtonText="agreeButtonTextTest"
                disagreeButtonText="disagreeButtonTextTest"
                agreeOnClick={onClick}
                dialogTitle="dialogTitleTest"
                dialogContent="dialogContentTest"
                isOpen={false}
                close={onClick}
            />,
        );
        expect(wrapper.props().agreeButtonText).toBe('agreeButtonTextTest');
        expect(wrapper.props().disagreeButtonText).toBe('disagreeButtonTextTest');
        expect(wrapper.props().agreeOnClick).toBe(onClick);
        expect(wrapper.props().dialogTitle).toBe('dialogTitleTest');
        expect(wrapper.props().dialogContent).toBe('dialogContentTest');
        expect(wrapper.props().isOpen).toBe(false);
        expect(wrapper.props().close).toBe(onClick);
    });
});
