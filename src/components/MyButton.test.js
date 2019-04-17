import React from 'react';
import {shallow} from 'enzyme';
import {MyButton} from './MyCompo';


describe('MyButton', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<MyButton text="test label"/>)
            expect(component).toMatchSnapshot()
        });
    });
});
