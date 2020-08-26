import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { NotFoundScreen } from './NotFoundScreen';

describe('NotFoundScreen', () => {
    it('render NotFoundScreen', () => {
        expect(renderer.create(<NotFoundScreen />).toJSON()).toMatchSnapshot();
    });
});
