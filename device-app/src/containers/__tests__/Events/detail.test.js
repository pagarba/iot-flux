import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { EventsDetail } from '../../Events/detail';

describe('<EventsDetail />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render components', () => {
    const wrapper = shallow(
      <EventsDetail
        classes={{}}
        match={{params: {}}}
        getDevices={jest.fn()}
        getChannel={() => new Promise(resolve => resolve())}
        theme={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});