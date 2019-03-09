import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'
import { signup } from '../../../core/actions/auth';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import Logo from '../../../assets/img/logo.png';
import BackgroundImage from '../../../assets/img/background.jpg';
import { validateEmail } from '../../../utils/validate-email';
import { passwordValidationItems, passwordValidationRegEx } from '../../../utils/validate-password';
import { encapsulateEmail } from '../../../utils/encapsulate-email';

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
    marginTop: '1rem',
  },
  actionLink: {
    color: '#52cee8',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  card: {
    width: '600px',
  },
  cardContent: {
    padding: '2rem 3rem !important',
    textAlign: 'center',
  },
  clearIcon: {
    color: '#dc3545',
  },
  credential: {
    margin: '1rem 0',
  },
  doneIcon: {
    color: '#4BB543',
  },
  formControl: {
    margin: '1rem 0',
  },
  logo: {
    width: '300px',
    marginBottom: '1rem',
  },
  passwordRequirements: {
    textAlign: 'left',
    marginTop: '1rem',
  },
  passwordRequirementsBox: {
    border: '1px solid',
    padding: '0.5rem',
  },
  passwordRequirementsItem: {
    display: 'flex',
    alignItems: 'center',
  },
  pinInput: {
    width: '40px',
  },
  resetAnnounce: {
    height: '200px',
    border: '1px solid #aaa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  review: {
    textAlign: 'left',
  },
  statusIcon: {
    fontSize: '18px',
    marginLeft: '5px',
  },
  stepButton: {
    backgroundColor: '#52cee8 !important',
    color: '#fff',
    marginTop: '2rem',
    width: '150px',
  },
  title: {
    marginBottom: '1rem',
    color: '#52cee8',
  },
  verificationAnnounce: {
    marginBottom: '2rem',
  },
  verificationContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  verificationPIN: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '300px',
  },
});

export class Signup extends Component {
  constructor () {
    super();

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      step: 1,
      isEmailValid: true,
      isPasswordValid: true,
      isCredentialsVisible: false,
      verificationPIN: ['', '', '', '', '', ''],
    }
  }

  handleClickFinish = () => {
    // After SMS verification backend endpoint is ready, this should be removed and commented section should be enabled.
    this.handleClickSubmit();
    // this.setState({
    //   step: this.state.step + 1,
    // });
  };

  handleClickShowCredentials = () => {
    this.setState({
      isCredentialsVisible: !this.state.isCredentialsVisible,
    });
  };

  handleClickSubmit = () => {
    const { email, password } = this.state;
    this.props.signup(email, password).then(() => {
      this.props.history.push('/login');
    });
  };

  handleClickPrev = () => {
    this.setState({
      step: parseInt(this.state.step) - 1,
    });
  };

  handleClickNext = () => {
    const { email, isEmailValid, password, passwordConfirm, isPasswordValid, step } = this.state;

    if (step === 1) {
      this.setState({
        email: email || null,
      });
    } else if (step === 2) {
      this.setState({
        password: password || null,
        passwordConfirm: passwordConfirm || null,
      });
    }

    if (
      (step === 1 && email && isEmailValid)
      || (step === 2 && password && passwordConfirm && isPasswordValid && password === passwordConfirm)
    ) {
      this.setState({
        step: parseInt(step) + 1,
      });
    }
  };

  handleInputChange = (key, value) => {
    if (key === 'email') {
      this.setState({
        isEmailValid: validateEmail(value),
      });
    } else if (key === 'password') {
      this.setState({
        isPasswordValid: passwordValidationRegEx.test(value),
      });
    }

    this.setState({
      [key]: value || null,
    });
  };

  handlePathChange = (path) => {
    this.props.history.push(path);
  };

  handleVerificationPINChange = (index, value) => {
    const { verificationPIN } = this.state;

    verificationPIN[index] = value;
    this.setState({
      verificationPIN,
    });
  };

  renderStep = () => {
    const { classes } = this.props;
    const { email, isCredentialsVisible, isEmailValid, password, passwordConfirm, isPasswordValid, step, verificationPIN } = this.state;

    if (step === 1) {
      return (
        <div>
          <Typography variant="subtitle1">
            Enter your email address
          </Typography>
          <FormControl className={classes.formControl} error={email === null || !isEmailValid} fullWidth aria-describedby="component-error-text">
            <Input placeholder="Email" value={email} onChange={(e) => this.handleInputChange('email', e.target.value)} />
            {
              email === null && <FormHelperText id="component-error-text">Email is required</FormHelperText>
            }
            {
              !isEmailValid && <FormHelperText id="component-error-text">Email is invalid</FormHelperText>
            }
          </FormControl>
          <Button variant="contained" className={classes.stepButton} onClick={this.handleClickNext}>
            Next
          </Button>
        </div>
      );
    } else if (step === 2) {
      return (
        <div>
          <FormControl className={classes.formControl} error={password === null} fullWidth aria-describedby="component-error-text">
            <Input placeholder="Password" type="password" value={password} onChange={(e) => this.handleInputChange('password', e.target.value)} />
            {
              password === null && <FormHelperText id="component-error-text">Password is required</FormHelperText>
            }
          </FormControl>
          <FormControl className={classes.formControl} error={passwordConfirm === null || password !== passwordConfirm} fullWidth aria-describedby="component-error-text">
            <Input placeholder="Confirm Password" type="password" value={passwordConfirm} onChange={(e) => this.handleInputChange('passwordConfirm', e.target.value)} />
            {
              (password === null || password !== passwordConfirm) && <FormHelperText id="component-error-text">Password mismatch</FormHelperText>
            }
          </FormControl>
          <div className={classes.buttonGroup}>
            <Button variant="contained" className={classes.stepButton} onClick={this.handleClickPrev}>
              Back
            </Button>
            <Button variant="contained" className={classes.stepButton} onClick={this.handleClickNext}>
              Next
            </Button>
          </div>
        </div>
      );
    } else if (step === 3) {
      return (
        <div>
          {
            isCredentialsVisible && (
              <div className={classes.review}>
                <Typography variant="subtitle1" className={classes.credential}>
                  USERNAME: {email}
                </Typography>
                <Typography variant="subtitle1" className={classes.credential}>
                  PASSWORD: {password}
                </Typography>
              </div>
            )
          }
          <div className={classes.buttonGroup}>
            <Button variant="contained" className={classes.stepButton} onClick={this.handleClickShowCredentials}>
              { isCredentialsVisible ? 'Hide' : 'Show' }
            </Button>
            <Button variant="contained" className={classes.stepButton} onClick={this.handleClickFinish}>
              FINISH
            </Button>
          </div>
        </div>
      );
    } else if (step === 4) {
      return (
        <div className={classes.verificationContainer}>
          <Typography variant="subtitle1" className={classes.verificationAnnounce}>
            Verification PIN sent to {encapsulateEmail(email)}
          </Typography>
          <Typography variant="subtitle1">
            Enter verification PIN
          </Typography>
          <div className={classes.verificationPIN}>
            {
              [1, 2, 3, 4, 5, 6].map((i) => (
                <FormControl key={i} className={classes.pinInput} fullWidth aria-describedby="component-error-text">
                  <Input type="number" value={verificationPIN[i]} onChange={(e) => this.handleVerificationPINChange(i, e.target.value)} />
                </FormControl>
              ))
            }
          </div>
          <Button variant="contained" className={classes.stepButton} onClick={() => this.handleClickSubmit}>
            Submit
          </Button>
        </div>
      );
    }

    return <div/>;
  };

  render () {
    const { classes } = this.props;
    const { password, step } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card} raised>
          <CardContent className={classes.cardContent}>
            <img src={Logo} className={classes.logo}/>
            <Typography variant="h5" className={classes.title}>
              Create Account
            </Typography>
            {
              this.renderStep()
            }
            <div className={classes.actions}>
              <Typography className={classes.actionLink} onClick={() => this.handlePathChange('login')}>Return to Login Page</Typography>
            </div>
            {
              step === 2 && (
                <div className={classes.passwordRequirements}>
                  <Typography variant="subtitle1">Password Requirements</Typography>
                  <div className={classes.passwordRequirementsBox}>
                    {
                      passwordValidationItems.map((e) => (
                        <div className={classes.passwordRequirementsItem}>
                          <Typography>{e.label}</Typography>
                          {
                            e.regex.test(password) ? (
                              <DoneIcon className={classNames(classes.doneIcon, classes.statusIcon)}/>
                            ) : (
                              <ClearIcon className={classNames(classes.clearIcon, classes.statusIcon)}/>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>
              )
            }
          </CardContent>
        </Card>
      </div>
    )
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    signup: (email, password) => dispatch(signup(email, password)),
  }
}

const WithStyles = withStyles(styles)(Signup);
export default connect(null, mapDispatchToProps)(WithStyles);