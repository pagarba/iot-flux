import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles/index";

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
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
  formControl: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '2rem',
    justifyContent: 'space-between',
    width: '320px',
  },
  textField: {
    marginLeft: '1rem',
    width: 'initial',
  },
});

class DeveloperVerification extends Component {
  state = {
  };

  render() {
    const { classes } = this.props;
    const { name, email, isEmailValid, phone } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h4">Developer Profile</Typography>
        <div className={classes.formControl}>
          <Typography variant="subtitle1">Developer Name</Typography>
          <FormControl className={classes.textField} error={name === null} fullWidth aria-describedby="component-error-text">
            <Input type="name" value={name} onChange={(e) => this.props.onInputChange('name', e) } />
            {
              name === null && <FormHelperText id="component-error-text">Name is required</FormHelperText>
            }
          </FormControl>
        </div>
        <div className={classes.formControl}>
          <Typography variant="subtitle1">Email Address</Typography>
          <FormControl className={classes.textField} error={email === null || !isEmailValid} fullWidth aria-describedby="component-error-text">
            <Input type="email" value={email} onChange={(e) => this.props.onInputChange('email', e) } />
            {
              email === null && <FormHelperText id="component-error-text">Email is required</FormHelperText>
            }
            {
              !isEmailValid && <FormHelperText id="component-error-text">Email is invalid</FormHelperText>
            }
          </FormControl>
        </div>
        <div className={classes.formControl}>
          <Typography variant="subtitle1">Phone Number</Typography>
          <FormControl className={classes.textField} error={phone === null} fullWidth aria-describedby="component-error-text">
            <Input type="number" value={phone} onChange={(e) => this.props.onInputChange('phone', e) } />
            {
              phone === null && <FormHelperText id="component-error-text">Phone Number is required</FormHelperText>
            }
          </FormControl>
        </div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={this.props.onClickNext}
        >
          Next
        </Button>
      </div>
    )
  }
}

DeveloperVerification.propTypes = {
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

const WithStyles =  withStyles(styles, { withTheme: true })(DeveloperVerification);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);