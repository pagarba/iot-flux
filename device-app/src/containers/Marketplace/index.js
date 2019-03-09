import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from "@material-ui/core/styles/index";
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BaseKitsTab from './Tabs/BaseKits/index';
import SearchKitsTab from './Tabs/SearchKits/index';
import ManageKitsTab from './Tabs/ManageKits/index';
import UploadKitsTab from './Tabs/UploadKits/index';

const styles = () => ({
  root: {
    display: 'block',
  },
  tabs: {
    padding: '1rem',
    backgroundColor: '#fff',
  },
});

class Channels extends Component {
  state = {
    activeIndex: 0,
  };

  handleTabChange = (event, activeIndex) => {
    this.setState({
      activeIndex,
    })
  };

  render() {
    const { classes } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="relative">
          <Tabs value={activeIndex} onChange={this.handleTabChange}>
            <Tab label="Base Kits" />
            <Tab label="Search Kits" />
            <Tab label="Manage Kits" />
            <Tab label="Upload Kits" />
          </Tabs>
        </AppBar>
        <div className={classes.tabs}>
          {activeIndex === 0 && <BaseKitsTab/>}
          {activeIndex === 1 && <SearchKitsTab/>}
          {activeIndex === 2 && <ManageKitsTab/>}
          {activeIndex === 3 && <UploadKitsTab/>}
        </div>
      </div>
    )
  }
}

Channels.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

const WithStyles =  withStyles(styles, { withTheme: true })(Channels);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);