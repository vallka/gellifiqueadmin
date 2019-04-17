import React from 'react';
import {shallow} from 'enzyme';
import CartScreen from './CartScreen';

import * as axios from "axios";
jest.mock("axios");

describe('CartScreen Rendering', () => {
    it('should match to snapshot', async () => {

        axios.get.mockImplementation(() =>
            Promise.resolve({
                status: 200,
                data: require('./orders.json')
            })
        );


        const component = shallow(<CartScreen />)
        await component.instance().componentDidMount();
        component.update();
        expect(component).toMatchSnapshot()
    });
});

