import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Hidden, Paper, Typography } from '@material-ui/core';

import { Link } from 'react-router-dom';

import GettingStartedIcon from '@material-ui/icons/PlayCircleOutline';
import ExamplesTemplatesIcon from '@material-ui/icons/Subtitles';

const styles = theme => ({
  dashboard: {
    textAlign: 'center',
    marginTop: '50px',
  },
  icon: {
    fontSize: '80px',
  },
  link: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  root: {
    flexGrow: 1,
  },
});

class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.dashboard}>
        <Grid container spacing={24}>
          <Hidden xsDown>
            <Grid item sm={1}>
            </Grid>
          </Hidden>
          <Grid item xs={4}>
            <Link className={classes.link} to="/tutorials/getting-started">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <GettingStartedIcon className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography gutterBottom>Getting Started</Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link className={classes.link} to="/tutorials/examples-templates">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <ExamplesTemplatesIcon className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography gutterBottom>Examples & Templates</Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
