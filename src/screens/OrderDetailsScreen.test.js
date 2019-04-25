import React from 'react';
import {shallow} from 'enzyme';
import OrderDetailsScreen from './OrderDetailsScreen';


import * as axios from "axios";
jest.mock("axios");
axios.get.mockImplementation(() =>
    Promise.resolve({
        status: 200,
        data: require('./order308.json')
    })
);

import * as expo from 'expo';
jest.mock('expo', ()=>({
    SecureStore: {
        getItemAsync: jest.fn(),
        setItemAsync: jest.fn()
    }
}));
let storage = {};
expo.SecureStore.getItemAsync.mockReturnValue(JSON.stringify(storage))
expo.SecureStore.setItemAsync.mockImplementation((a,b)=>{storage[a]=b})

jest.mock('Vibration');

const navigationMock = { 
    getParam: jest.fn().mockReturnValue('308')
};


describe('OrderDetailsScreen Rendering', () => {

    it('should match to snapshot', async () => {

        const component = shallow(<OrderDetailsScreen navigation={navigationMock} />)
        await component.instance().componentDidMount();
        component.update();
        expect(component).toMatchSnapshot()
    });

    it('should have state for processed_items after adding', async () => {

        const component = shallow(<OrderDetailsScreen navigation={navigationMock} />)
        await component.instance().componentDidMount();
        component.update();

        await component.instance().addItem(193)
        const data = component.state('data') 
        expect(data[0]['processed_items']).toEqual({"product193": 1})

        await component.instance().addItem(193)
        expect(data[0]['processed_items']).toEqual({"product193": 1})

        await component.instance().addItem(194) // non existent
        expect(data[0]['processed_items']).toEqual({"product193": 1})

        await component.instance().addItem(614)
        await component.instance().addItem(614)
        await component.instance().addItem(614)
        expect(data[0]['processed_items']).toEqual({"product193": 1, "product614": 2})


        await component.instance().addItem(730)
        await component.instance().addItem(730)
        await component.instance().addItem(730)
        expect(data[0]['processed_items']).toEqual({"processed_all": true, "product193": 1, "product614": 2, "product730": 3})
    });
});

