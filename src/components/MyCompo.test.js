import React from 'react';
import {shallow} from 'enzyme';
import {MyButton,MyBackground} from './MyCompo';


describe('MyCompo Rendering', () => {
    it('MyButton Rendering should match to snapshot', () => {
        const component = shallow(<MyButton text="test label" />)
        expect(component).toMatchSnapshot()
    });
    it('MyBackground Rendering - should match to snapshot', () => {
        const component = shallow(<MyBackground />)
        expect(component).toMatchSnapshot()
    });
});
