import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { Devices } from '../../../Channels/Devices';

describe('<ChannelDevices />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render components', () => {
    const wrapper = shallow(
      <Devices
        classes={{}}
        getDevices={() => {}}
        channel={{}}
        theme={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});