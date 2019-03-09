import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { Signup } from '../../../Auth/Signup';

describe('<Signup />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render components', () => {
    const wrapper = shallow(<Signup classes={{}}/>);
    expect(wrapper).toMatchSnapshot();
  });
});