import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { Dashboard } from '../../Dashboard';

describe('<Dashboard />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render components', () => {
    const wrapper = shallow(
      <Dashboard
        classes={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});