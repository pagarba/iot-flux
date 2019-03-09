import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles/index";

import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import DeveloperVerification from './DeveloperVerification';
import KitAppDetails from './KitAppDetails';
import SubmitApplication from './SubmitApplication';
import SubmitConfirmation from './SubmitConfirmation';
import {validateEmail} from "../../../../utils/validate-email";

const styles = () => ({
  root: {
    display: 'block'
  },
  arrowIcon: {
    color: '#fff',
    backgroundColor: '#999',
    borderRadius: '50%',
    fontSize: '50px',
  },
  arrowIconSelected: {
    backgroundColor: '#33f',
  },
  stepBar: {
    display: 'flex',
    justifyContent: 'center',
  },
  stepItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1rem 3rem',
  },
  stepLabel: {
    marginTop: '1rem',
    color: '#999',
  },
  stepLabelSelected: {
    color: '#33f',
  },
});

class UploadKits extends Component {
  state = {
    stepNumber: 1,
    name: '',
    email: '',
    isEmailValid: true,
    phone: '',
    title: '',
    description: '',
    licenseModel: 'free',
    price: 0,
    helpDocName: '',
    kitUploadName: '',
  };

  handleClickNext = () => {
    const {
      stepNumber,
      name, email, isEmailValid, phone,
      title, description, licenseModel, price, helpDocName, kitUploadName,
    } = this.state;

    if (stepNumber === 1) {
      this.setState({
        name: name || null,
        email: email || null,
        phone: phone || null,
      });

      if (!name || !email || !isEmailValid) {
        return;
      }
    } else if (stepNumber === 2) {
      this.setState({
        title: title || null,
        description: description || null,
        price: price || null,
        helpDocName: helpDocName || null,
        kitUploadName: kitUploadName || null,
      });

      if (!title || !description || (licenseModel === 'paid' && !price) || !helpDocName || !kitUploadName) {
        return;
      }
    }

    this.setState({
      stepNumber: parseInt(stepNumber) + 1,
    });
  };

  handleClickPrev = () => {
    this.setState({
      stepNumber: parseInt(this.state.stepNumber) - 1,
    });
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

  handleFileInputChange = (key, val) => {
    this.setState({
      [key]: val,
    });
  };

  render() {
    const { classes } = this.props;
    const { stepNumber, name, email, isEmailValid, phone, title, description, licenseModel, price, helpDocName, kitUploadName } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.stepBar}>
          <div className={classes.stepItem}>
            <ArrowForwardIcon className={classNames(classes.arrowIcon, stepNumber === 1 ? classes.arrowIconSelected : '')}/>
            <Typography className={classNames(classes.stepLabel, stepNumber === 1 ? classes.stepLabelSelected : '')}>Developer Verification</Typography>
          </div>
          <div className={classes.stepItem}>
            <ArrowForwardIcon className={classNames(classes.arrowIcon, stepNumber === 2 ? classes.arrowIconSelected : '')}/>
            <Typography className={classNames(classes.stepLabel, stepNumber === 2 ? classes.stepLabelSelected : '')}>Submit Application</Typography>
          </div>
          <div className={classes.stepItem}>
            <ArrowForwardIcon className={classNames(classes.arrowIcon, (stepNumber === 3 || stepNumber === 4) ? classes.arrowIconSelected : '')}/>
            <Typography className={classNames(classes.stepLabel, (stepNumber === 3 || stepNumber === 4) ? classes.stepLabelSelected : '')}>Await Review Status</Typography>
          </div>
        </div>
        { stepNumber === 1 && (
          <DeveloperVerification
            onClickNext={this.handleClickNext}
            onInputChange={this.handleInputChange}
            name={name}
            email={email}
            isEmailValid={isEmailValid}
            phone={phone}
          />
        )}
        { stepNumber === 2 && (
          <KitAppDetails
            onClickNext={this.handleClickNext}
            onClickPrev={this.handleClickPrev}
            onInputChange={this.handleInputChange}
            onFileInputChange={this.handleFileInputChange}
            title={title}
            description={description}
            licenseModel={licenseModel}
            price={price}
            helpDocName={helpDocName}
            kitUploadName={kitUploadName}
          />
        )}
        { stepNumber === 3 && (
          <SubmitApplication
            onClickNext={this.handleClickNext}
            onClickPrev={this.handleClickPrev}
            detail={this.state}
          />
        )}
        { stepNumber === 4 && (
          <SubmitConfirmation/>
        )}
      </div>
    )
  }
}

UploadKits.propTypes = {
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

const WithStyles =  withStyles(styles, { withTheme: true })(UploadKits);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);