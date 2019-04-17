import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';

import { MonoText } from './StyledText';
//import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = shallow(<MonoText>Snapshot test!</MonoText>);
  expect(tree).toMatchSnapshot();
});
