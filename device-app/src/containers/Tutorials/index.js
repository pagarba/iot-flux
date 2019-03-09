import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import { Link } from 'react-router-dom';

import IoTBasicsIcon from '@material-ui/icons/DeviceHub';
import GettingStartedIcon from '@material-ui/icons/PlayCircleOutline';
import ExamplesTemplatesIcon from '@material-ui/icons/SubtitlesOutlined';

const styles = () => ({
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
  text: {
    fontSize: '16px',
  },
});

class Dashboard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.dashboard}>
        <Grid container spacing={24}>
          <Grid item xs={4}>
            <Link className={classes.link} to="/tutorials/iot-basics">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <IoTBasicsIcon className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography className={classes.text} color="secondary" gutterBottom>IOT BASICS</Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link className={classes.link} to="/tutorials/intro-to-trigx-iot">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <ExamplesTemplatesIcon className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography className={classes.text} color="secondary" gutterBottom>INTRO TO TRIGX IOT</Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link className={classes.link} to="/tutorials/getting-started">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <GettingStartedIcon className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography className={classes.text} color="secondary" gutterBottom>GETTING STARTED</Typography>
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
