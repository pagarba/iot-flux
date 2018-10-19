import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { withStyles } from "@material-ui/core/styles/index";

const styles = theme => ({
  root: {
    display: 'block'
  },
  dialogContent: {
    minWidth: '400px',
    overflowX: 'hidden',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class EditDeviceDialog extends Component {
  state = {
    expanded: null,
    name: '',
  };

  componentWillReceiveProps(props) {
    this.setState({
      name: props.device ? props.device.name : '',
    })
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClickDismiss}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.props.titleText}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <FormControl className={classes.formControl} error={this.state.channelName === null} fullWidth aria-describedby="component-error-text">
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input name="name" value={this.state.name} onChange={this.handleInputChange} />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClickDismiss} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => this.props.onClickConfirm(this.state.name)} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

EditDeviceDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(EditDeviceDialog);