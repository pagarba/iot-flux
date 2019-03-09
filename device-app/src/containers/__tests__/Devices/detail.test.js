import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { DeviceDetail } from '../../Devices/detail';

describe('<DeviceDetail />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render components', () => {
    const wrapper = shallow(
      <DeviceDetail
        classes={{}}
        match={{params: {}}}
        getDevice={jest.fn()}
        theme={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});