import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { ResetPassword } from '../../../Auth/ResetPassword';

describe('<ResetPassword />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render components', () => {
    const wrapper = shallow(<ResetPassword classes={{}}/>)
    expect(wrapper).toMatchSnapshot();
  });
});