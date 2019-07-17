import React from 'react';
import { shallow } from 'enzyme';
import Questionnaire from './Questionnaire';

it('renders discover message', () => {
  const discover = 'Discover Your Perspective';
  const wrapper = shallow(<Questionnaire />);
  expect(wrapper.text()).toContain(discover);
});
