import React from 'react';
import { shallow } from 'enzyme';
import { FloatingButton } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FloatingButton />);
  expect(renderedComponent.find('.home-floating-button').length).toBe(1);
});
