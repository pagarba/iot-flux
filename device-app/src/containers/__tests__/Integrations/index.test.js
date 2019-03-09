import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { Integrations } from '../../Integrations';

describe('<Integrations />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render components', () => {
    const wrapper = shallow(
      <Integrations
        classes={{}}
        location={{search: ''}}
        theme={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});