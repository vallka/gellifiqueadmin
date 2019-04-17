import React from 'react';
import {shallow} from 'enzyme';
import TabBarIcon from './TabBarIcon';


describe('TabBarIcon Rendering', () => {
    it('TabBarIcon Rendering should match to snapshot', () => {
        const component = shallow(<TabBarIcon />)
        expect(component).toMatchSnapshot()
    });
    it('TabBarIcon focused Rendering should match to snapshot', () => {
        const component = shallow(<TabBarIcon focused={true} />)
        expect(component).toMatchSnapshot()
    });
});

