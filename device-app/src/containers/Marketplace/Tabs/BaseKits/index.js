import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from "@material-ui/core/styles/index";
import { connect } from 'react-redux';

import KitList from './KitList';
import KitDetail from './KitDetail';

const styles = () => ({
  root: {
    display: 'block'
  },
});

class BaseKits extends Component {
  state = {
    isKitSelected: false,
  };

  handleClickKit = () => {
    this.setState({
      isKitSelected: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { isKitSelected } =  this.state;

    return (
      <div className={classes.root}>
        {
          isKitSelected ? (
            <KitDetail/>
          ) : (
            <KitList onClickKit={this.handleClickKit}/>
          )
        }
      </div>
    )
  }
}

BaseKits.propTypes = {
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

const WithStyles =  withStyles(styles, { withTheme: true })(BaseKits);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);