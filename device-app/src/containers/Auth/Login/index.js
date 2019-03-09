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

import { validateEmail } from '../../../utils/validate-email';

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
    display: 'flex',
    justifyContent: 'space-between',
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
  title: {
    marginBottom: '2rem',
  },
});

export class Login extends Component {
  constructor () {
    super();

    this.state = {
      email: '',
      isEmailValid: true,
      password: '',
    }
  }

  handleClickLogin = () => {
    const { email, password, isEmailValid } = this.state;

    this.setState({
      email: email || null,
      password: password || null,
    });

    if (email && password && isEmailValid) {
      this.props.login(email, password).then(() => {
        this.props.history.push('/dashboard');
      });
    }
  };

  handleInputChange = (key, e) => {
    if (key === 'email') {
      this.setState({
        isEmailValid: validateEmail(e.target.value),
      });
    }

    this.setState({
      [key]: e.target.value || null,
    });
  };

  handlePathChange = (path) => {
    this.props.history.push(path);
  };

  render () {
    const { classes } = this.props;
    const { email, password, isEmailValid } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card} raised>
          <CardContent className={classes.cardContent}>
            <img src={Logo} className={classes.logo}/>
            <Typography variant="h5" className={classes.title}>
              Welcome to the Stream IoT Control Center
            </Typography>
            <FormControl className={classes.formControl} error={email === null || !isEmailValid} fullWidth aria-describedby="component-error-text">
              <Input placeholder="Email" type="email" value={email} onChange={(e) => this.handleInputChange('email', e) } />
              {
                email === null && <FormHelperText id="component-error-text">Email is required</FormHelperText>
              }
              {
                !isEmailValid && <FormHelperText id="component-error-text">Email is invalid</FormHelperText>
              }
            </FormControl>
            <FormControl className={classes.formControl} error={password === null} fullWidth aria-describedby="component-error-text">
              <Input placeholder="Password" type="password" value={password} onChange={(e) => this.handleInputChange('password', e) } />
              {
                password === null && <FormHelperText id="component-error-text">Password is required</FormHelperText>
              }
            </FormControl>
            <Button variant="contained" color="primary" className={classes.loginButton} onClick={this.handleClickLogin}>
              Login
            </Button>
            <div className={classes.actions}>
              <Typography className={classes.actionLink} onClick={() => this.handlePathChange('reset-password')}>Forgot Password?</Typography>
              <Typography className={classes.actionLink} onClick={() => this.handlePathChange('signup')}>Create Account?</Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(login(email, password)),
  }
}

const WithStyles = withStyles(styles)(Login);
export default connect(null, mapDispatchToProps)(WithStyles);