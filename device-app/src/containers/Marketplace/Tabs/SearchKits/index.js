import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles/index";

import KitList from './KitList';

const styles = () => ({
  root: {
    display: 'block'
  },
});

class SearchKits extends Component {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <KitList/>
      </div>
    )
  }
}

SearchKits.propTypes = {
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

const WithStyles =  withStyles(styles, { withTheme: true })(SearchKits);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);