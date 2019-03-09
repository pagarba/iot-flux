import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { ChannelDetail } from '../../Channels/detail';

describe('<ChannelDetail />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render components', () => {
    const wrapper = shallow(
      <ChannelDetail
        classes={{}}
        match={{params: {}}}
        getChannel={jest.fn()}
        theme={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});