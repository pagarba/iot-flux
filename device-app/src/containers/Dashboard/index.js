import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import { Link } from 'react-router-dom';

import ChannelsIcon from '@material-ui/icons/GridOnOutlined';
import AddDeviceIcon from '@material-ui/icons/AddToQueue';
import ViewEventsIcon from '@material-ui/icons/VisibilityOutlined';
import TutorialIcon from '@material-ui/icons/SchoolOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import PanToolIcon from '@material-ui/icons/PanTool';

const styles = () => ({
  dashboard: {
    textAlign: 'center',
    marginTop: '50px'
  },
  icon: {
    fontSize: '80px',
  },
  link: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  text: {
    fontSize: '16px',
    textTransform: 'uppercase',
  },
  root: {
    flexGrow: 1,
  },
});

export class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.dashboard}>
        <Grid container spacing={24}>
          <Grid item xs={6} sm={4} md={2}>
            <Link className={classes.link} to="/marketplace?mode=create">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <ShoppingCartIcon className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography className={classes.text} color="secondary" gutterBottom>Marketplace</Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Link className={classes.link} to="/build-kits?mode=create">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <PanToolIcon className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography className={classes.text} color="secondary" gutterBottom>Build Kits</Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Link className={classes.link} to="/channels?mode=create">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <ChannelsIcon className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography className={classes.text} color="secondary" gutterBottom>Add Channel</Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Link className={classes.link} to="/devices?mode=create">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <AddDeviceIcon className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography className={classes.text} color="secondary" gutterBottom>Add Device</Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Link className={classes.link} to="/events?mode=create">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <ViewEventsIcon className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography className={classes.text} color="secondary" gutterBottom>View Events</Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Link className={classes.link} to="/tutorials?mode=create">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <TutorialIcon className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography className={classes.text} color="secondary" gutterBottom>Tutorial</Typography>
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
