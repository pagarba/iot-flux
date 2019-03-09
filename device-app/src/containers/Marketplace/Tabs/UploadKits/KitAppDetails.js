import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles/index";

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
  fileInput: {
    display: 'none',
  },
  formControl: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '2rem',
    justifyContent: 'space-between',
    width: '320px',
    position: 'relative',
  },
  formControlLabel: {
    alignItems: 'center',
  },
  licenseModelGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  paidLicenseValue: {
    marginLeft: 'auto !important',
  },
  textField: {
    marginLeft: '1rem',
    width: 'initial',
  },
  uploadIcon: {
    position: 'absolute',
    right: '-40px',
    cursor: 'pointer',
  },
});

class KitAppDetails extends Component {
  state = {
  };

  handleClickHelpDoc = () => {
    this.helpDoc.click();
  };

  handleClickKitUpload = () => {
    this.kitUpload.click();
  };

  handleHelpDocChange = (e) => {
    const file = e.target.files[0];
    this.props.onFileInputChange('helpDoc', file);
    this.props.onFileInputChange('helpDocName', file.name);
  };

  handlekitUploadChange = (e) => {
    const file = e.target.files[0];
    this.props.onFileInputChange('kitUpload', file);
    this.props.onFileInputChange('kitUploadName', file.name);
  };

  render() {
    const { classes, title, description, licenseModel, price, helpDocName, kitUploadName } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h4">Kit Application Details</Typography>
        <div className={classes.formControl}>
          <Typography variant="subtitle1">Title Name</Typography>
          <FormControl className={classes.textField} error={title === null} fullWidth aria-describedby="component-error-text">
            <Input type="text" value={title} onChange={(e) => this.props.onInputChange('title', e) } />
            {
              title === null && <FormHelperText id="component-error-text">Title is required</FormHelperText>
            }
          </FormControl>
        </div>
        <div className={classes.formControl}>
          <Typography variant="subtitle1">Short Description</Typography>
          <FormControl className={classes.textField} error={description === null} fullWidth aria-describedby="component-error-text">
            <Input type="text" value={description} onChange={(e) => this.props.onInputChange('description', e) } />
            {
              description === null && <FormHelperText id="component-error-text">Description is required</FormHelperText>
            }
          </FormControl>
        </div>
        <div className={classNames(classes.formControl, classes.formControlLabel)}>
          <Typography variant="subtitle1">License Model</Typography>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.licenseModelGroup}
            value={licenseModel}
            onChange={(e) => this.props.onInputChange('licenseModel', e) }
          >
            <FormControlLabel value="free" control={<Radio />} label="FREE" />
            <FormControlLabel value="paid" control={<Radio />} label="PAID" />
          </RadioGroup>
        </div>
        {
          licenseModel === 'paid' && (
            <div className={classes.formControl}>
              <FormControl
                className={classNames(classes.textField, classes.paidLicenseValue)}
                error={price === null || price === 0}
                fullWidth
                aria-describedby="component-error-text"
              >
                <Input placeholder="Price" type="number" value={price} onChange={(e) => this.props.onInputChange('price', e) } />
                {
                  (price === null || price === 0) && <FormHelperText id="component-error-text">Price is required</FormHelperText>
                }
              </FormControl>
            </div>
          )
        }
        <div className={classes.formControl}>
          <Typography variant="subtitle1">Help Docs</Typography>
          <input
            type="file"
            className={classes.fileInput}
            ref={(e) => this.helpDoc = e}
            onChange={this.handleHelpDocChange}
          />
          <FormControl className={classes.textField} error={helpDocName === null} fullWidth aria-describedby="component-error-text">
            <Input disabled type="text" value={helpDocName} onChange={(e) => this.props.onInputChange('helpDocName', e) } />
            {
              helpDocName === null && <FormHelperText id="component-error-text">Help doc is required</FormHelperText>
            }
          </FormControl>
          <IconButton
            className={classes.uploadIcon}
            onClick={this.handleClickHelpDoc}
          >
            <CloudUploadIcon/>
          </IconButton>
        </div>
        <div className={classes.formControl}>
          <Typography variant="subtitle1">Kit Upload</Typography>
          <input
            type="file"
            className={classes.fileInput}
            ref={(e) => this.kitUpload = e}
            onChange={this.handlekitUploadChange}
          />
          <FormControl className={classes.textField} error={kitUploadName === null} fullWidth aria-describedby="component-error-text">
            <Input disabled type="text" value={kitUploadName} onChange={(e) => this.props.onInputChange('kitUploadName', e) } />
            {
              kitUploadName === null && <FormHelperText id="component-error-text">Kit file is required</FormHelperText>
            }
          </FormControl>
          <IconButton
            className={classes.uploadIcon}
            onClick={this.handleClickKitUpload}
          >
            <CloudUploadIcon/>
          </IconButton>
        </div>
        <div className={classes.formControl}>
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
            Next
          </Button>
        </div>
      </div>
    )
  }
}

KitAppDetails.propTypes = {
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

const WithStyles =  withStyles(styles, { withTheme: true })(KitAppDetails);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);