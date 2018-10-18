import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class ExamplesTemplates extends Component {
  constructor() {
    super();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.dashboard}>

      </div>
    );
  }
}

ExamplesTemplates.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExamplesTemplates);
