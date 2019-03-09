import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles/index";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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
  buttonGroup: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: '2rem',
    justifyContent: 'space-between',
    width: '320px',
  },
  fieldLabel: {
    fontWeight: '600',
    width: '150px',
  },
  formControl: {
    display: 'flex',
    marginTop: '2rem',
  },
  grid: {
    marginTop: '2rem',
  },
  priceControl: {
    display: 'flex',
    marginLeft: '5rem',
  },
  priceLabel: {
    fontWeight: '600',
    width: '80px',
  },
  textField: {
    marginLeft: '1rem',
  },
});

class SubmitApplication extends Component {
  state = {
    stepNumber: 1,
  };

  render() {
    const { classes, detail } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h4">Kit Application Review</Typography>
        <Grid container spacing={16} className={classes.grid}>
          <Grid item xs={6}>
            <div className={classes.formControl}>
              <Typography variant="subtitle1" className={classes.fieldLabel}>Developer Name:</Typography>
              <Typography variant="subtitle1">{detail.name}</Typography>
            </div>
            <div className={classes.formControl}>
              <Typography variant="subtitle1" className={classes.fieldLabel}>Email Address:</Typography>
              <Typography variant="subtitle1">{detail.email}</Typography>
            </div>
            <div className={classes.formControl}>
              <Typography variant="subtitle1" className={classes.fieldLabel}>Phone Number:</Typography>
              <Typography variant="subtitle1">{detail.phone}</Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.formControl}>
              <Typography variant="subtitle1" className={classes.fieldLabel}>Title Name:</Typography>
              <Typography variant="subtitle1">{detail.title}</Typography>
            </div>
            <div className={classes.formControl}>
              <Typography variant="subtitle1" className={classes.fieldLabel}>Short Description:</Typography>
              <Typography variant="subtitle1">{detail.description}</Typography>
            </div>
            <div className={classes.formControl}>
              <Typography variant="subtitle1" className={classes.fieldLabel}>License Model:</Typography>
              <Typography variant="subtitle1">{detail.licenseModel}</Typography>
              {
                detail.licenseModel === 'paid' && (
                  <div className={classes.priceControl}>
                    <Typography variant="subtitle1" className={classes.priceLabel}>Price:</Typography>
                    <Typography variant="subtitle1">{detail.price}</Typography>
                  </div>
                )
              }
            </div>
            <div className={classes.formControl}>
              <Typography variant="subtitle1" className={classes.fieldLabel}>Help Docs:</Typography>
              <Typography variant="subtitle1">{detail.helpDocName}</Typography>
            </div>
            <div className={classes.formControl}>
              <Typography variant="subtitle1" className={classes.fieldLabel}>Kit Upload:</Typography>
              <Typography variant="subtitle1">{detail.kitUploadName}</Typography>
            </div>
          </Grid>
        </Grid>
        <div className={classes.buttonGroup}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={this.props.onClickPrev}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={this.props.onClickNext}
          >
            Submit
          </Button>
        </div>
      </div>
    )
  }
}

SubmitApplication.propTypes = {
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

const WithStyles =  withStyles(styles, { withTheme: true })(SubmitApplication);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);