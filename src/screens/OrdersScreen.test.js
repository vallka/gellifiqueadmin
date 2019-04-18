import React from 'react';
import {shallow} from 'enzyme';
import OrdersScreen from './OrdersScreen';

import * as axios from "axios";
jest.mock("axios");

describe('OrdersScreen Rendering', () => {
    it('should match to snapshot', async () => {

        axios.get.mockImplementation(() =>
            Promise.resolve({
                status: 200,
                data: require('./orders.json')
            })
        );

        const component = shallow(<OrdersScreen />)
        await component.instance().componentDidMount();
        component.update();
        expect(component).toMatchSnapshot()
    });
});

