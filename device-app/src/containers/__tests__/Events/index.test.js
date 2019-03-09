import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { Events } from '../../Events';

describe('<Events />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render components', () => {
    const wrapper = shallow(
      <Events
        classes={{}}
        getChannels={jest.fn()}
        location={{search: ''}}
        theme={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});