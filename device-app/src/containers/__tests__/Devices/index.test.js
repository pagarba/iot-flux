import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { Devices } from '../../Devices';

describe('<Devices />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render components', () => {
    const wrapper = shallow(
      <Devices
        classes={{}}
        getDevices={jest.fn()}
        location={{search: ''}}
        theme={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});