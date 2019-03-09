import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { Channels } from '../../Channels';

describe('<Channels />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render components', () => {
    const wrapper = shallow(
      <Channels
        classes={{}}
        getChannels={jest.fn()}
        location={{search: ''}}
        theme={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});