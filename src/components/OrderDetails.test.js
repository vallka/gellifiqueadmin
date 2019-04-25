import React from 'react';
import {shallow} from 'enzyme';
import {OrderHeader,OrderFooter,OrderItem} from './OrderDetails';


describe('OrderDetails components Rendering', () => {
    let data1= require('../screens/order308.json')
    data2 = JSON.parse(JSON.stringify(data1)); // cannot simply data2 = data1 !!!!
    data2[0].processed_items = {'processed_all': true, 'product193': 1};

    it('OrderHeader Rendering should match to snapshot', async () => {
        const component = shallow(<OrderHeader data={data1[0]} />)
        expect(component).toMatchSnapshot()
        component.unmount()
    });

    it('OrderFooter Rendering should match to snapshot', async () => {
        const component = shallow(<OrderFooter data={data1[0]} />)
        expect(component).toMatchSnapshot()
    });

    it('OrderItem Rendering should match to snapshot', async () => {
        const component = shallow(<OrderItem data={data1[0]} item={data1[0].items[0]} />)
        expect(component).toMatchSnapshot()
    });


    it('OrderHeader Rendering - all processed - should match to snapshot', async () => {
        const component = shallow(<OrderHeader data={data2[0]} />)
        expect(component).toMatchSnapshot()
    });

    it('OrderFooter Rendering - all processed - should match to snapshot', async () => {
        const component = shallow(<OrderFooter data={data2[0]} />)
        expect(component).toMatchSnapshot()
    });

    it('OrderItem Rendering - processed -  should match to snapshot', async () => {
        const component = shallow(<OrderItem data={data2[0]} item={data2[0].items[0]} />)
        expect(component).toMatchSnapshot()
    });
});
