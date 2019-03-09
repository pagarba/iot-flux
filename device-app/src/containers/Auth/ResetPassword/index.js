import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'
import { login } from '../../../core/actions/auth';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

import Logo from '../../../assets/img/logo.png';
import BackgroundImage from '../../../assets/img/background.jpg';
import { validateEmail } from "../../../utils/validate-email";

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
  },
  actions: {
    marginTop: '2rem',
  },
  actionLink: {
    color: '#52cee8',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  card: {
    width: '600px',
  },
  cardContent: {
    padding: '3rem 4rem !important',
    textAlign: 'center',
  },
  formControl: {
    margin: '1rem 0',
  },
  loginButton: {
    backgroundColor: '#52cee8 !important',
    color: '#fff',
    marginTop: '3rem',
    width: '100%',
  },
  logo: {
    width: '300px',
    marginBottom: '2rem',
  },
  resetAnnounce: {
    height: '200px',
    border: '1px solid #aaa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: '2rem',
    color: '#52cee8',
  },
});

export class ResetPassword extends Component {
  constructor () {
    super();

    this.state = {
      email: '',
      resetSent: false,
      isEmailValid: true,
    }
  }

  handleClickResetPassword = () => {
    const { email, isEmailValid } = this.state;

    this.setState({
      email: email || null,
    });

    if (email && isEmailValid) {
      this.setState({
        resetSent: true,
      });
    }
  };

  handleEmailChange = (value) => {
    this.setState({
      isEmailValid: validateEmail(value),
      email: value || null,
    });
  };

  handlePathChange = (path) => {
    this.props.history.push(path);
  };

  render () {
    const { classes } = this.props;
    const { email, resetSent, isEmailValid } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card} raised>
          <CardContent className={classes.cardContent}>
            <img src={Logo} className={classes.logo}/>
            <Typography variant="h5" className={classes.title}>
              Forgot Password?
            </Typography>
            {
              resetSent ? (
                <div className={classes.resetAnnounce}>
                  <Typography variant="subtitle1">
                    Password Reset Instructions have been sent to {email}
                  </Typography>
                </div>
              ) : (
                <div>
                  <FormControl className={classes.formControl} error={email === null || !isEmailValid} fullWidth aria-describedby="component-error-text">
                    <Input placeholder="Email" value={email} onChange={(e) => this.handleEmailChange(e.target.value)} />
                    {
                      email === null && <FormHelperText id="component-error-text">Email is required</FormHelperText>
                    }
                    {
                      !isEmailValid && <FormHelperText id="component-error-text">Email is invalid</FormHelperText>
                    }
                  </FormControl>
                  <Button variant="contained" color="primary" className={classes.loginButton} onClick={this.handleClickResetPassword}>
                    Reset Password
                  </Button>
                </div>
              )
            }
            <div className={classes.actions}>
              <Typography className={classes.actionLink} onClick={() => this.handlePathChange('login')}>Return to Login Page</Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    login: account => dispatch(login(account)),
  }
}

const WithStyles = withStyles(styles)(ResetPassword);
export default connect(null, mapDispatchToProps)(WithStyles);