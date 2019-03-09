import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

import { withStyles } from "@material-ui/core/styles/index";

const styles = theme => ({
  root: {
    display: 'block'
  },
  circularProgress: {
    margin: '1rem auto 0 auto',
  },
  dialogContent: {
    minWidth: '400px',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class ConnectDeviceDialog extends Component {
  state = {
    expanded: null,
    name: '',
  };

  componentWillReceiveProps(props) {
    this.setState({
      name: props.device ? props.device.name : '',
    })
  }

  render() {
    const { classes, device } = this.props;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClickDismiss}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={classes.dialogContent}>
          <Typography>Connecting Device ({(device || {}).name})</Typography>
          <CircularProgress
            className={classes.circularProgress}
            color="secondary"
          />
        </DialogContent>
      </Dialog>
    )
  }
}

ConnectDeviceDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ConnectDeviceDialog);