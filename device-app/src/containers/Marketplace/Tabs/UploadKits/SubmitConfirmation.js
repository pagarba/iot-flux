import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles/index";

import Typography from '@material-ui/core/Typography';

const styles = () => ({
  root: {
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginTop: '3rem',
    width: '100px',
  },
  content: {
    border: '1px solid',
    padding: '2rem',
    textAlign: 'left',
    marginTop: '3rem',
  },
  formControl: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: '2rem',
    justifyContent: 'space-between',
    width: '320px',
  },
  textField: {
    marginLeft: '1rem',
  },
});

class SubmitConfirmation extends Component {
  state = {
    stepNumber: 1,
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h4">Kit Application - Submission Confirmation</Typography>

        <div className={classes.content}>
          <Typography variant="subtitle1">Thank you for submitting your kit</Typography>
          <br/>
          <Typography variant="subtitle1">The Blocksafe team will review your application and get back to you shortly.</Typography>
        </div>
      </div>
    )
  }
}

SubmitConfirmation.propTypes = {
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

const WithStyles =  withStyles(styles, { withTheme: true })(SubmitConfirmation);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);