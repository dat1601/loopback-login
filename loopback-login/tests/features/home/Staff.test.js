import React from 'react';
import { shallow } from 'enzyme';
import { Staff } from '../../../src/features/home/Staff';

describe('home/Staff', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Staff {...props} />
    );

    expect(
      renderedComponent.find('.home-staff').length
    ).toBe(1);
  });
});
