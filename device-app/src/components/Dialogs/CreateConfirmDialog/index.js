import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withStyles } from "@material-ui/core/styles/index";

const styles = () => ({
  root: {
    display: 'block'
  },
});

class ConfirmDialog extends Component {
  state = {
    expanded: null,
    deviceId: '',
  };

  render() {
    const { contentText, createButtonText, titleText, viewButtonText } = this.props;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClickDismiss}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{titleText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClickView} color="secondary">
            { viewButtonText }
          </Button>
          <Button onClick={this.props.onClickCreate} color="secondary" autoFocus>
            { createButtonText }
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ConfirmDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ConfirmDialog);