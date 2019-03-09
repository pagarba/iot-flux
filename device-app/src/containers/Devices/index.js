import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { withStyles } from "@material-ui/core/styles/index";

import DevicesTable from '../../components/Tables/DevicesTable';
import CreateConfirmDialog from '../../components/Dialogs/CreateConfirmDialog';
import { createDevice, getDevices, deleteDevice, editDevice } from '../../core/actions/device'
import qs from 'stringquery'

const styles = theme => ({
  root: {
    display: 'block'
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: '2em',
    color: '#fff',
  },
  devicesListPanel: {
    backgroundColor: '#52cee8',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
    fontWeight: 'bold',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

export class Devices extends Component {
  state = {
    expanded: null,
    deviceType: '',
    deviceName: '',
    deviceKey: '',
    isCreateConfirmDialogOpen: false,
  };

  componentWillMount() {
    this.props.getDevices();
  }

  componentDidMount() {
    const obj = qs(this.props.location.search);
    this.setState({
      expanded: obj.mode === 'create' ? 'panel2' : 'panel1'
    })
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleBlur = event => {
    if (!this.state[event.target.name])
      this.setState({ [event.target.name]: null });
  };

  handleHideCreateConfirmDialog = () => {
    this.setState({
      isCreateConfirmDialogOpen: false,
    })
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  navigateToView = () => {
    this.setState({
      isCreateConfirmDialogOpen: false,
      expanded: 'panel1'
    });
  }

  navigateToCreate = () => {
    this.setState({
      isCreateConfirmDialogOpen: false,
      expanded: 'panel2'
    });
  }

  addDevice = () => {
    const { deviceName, deviceType } = this.state;

    if (deviceName && deviceType) {
      this.props.createDevice({
        type: deviceType,
        name: deviceName,
      }).then(() => {
        this.props.getDevices();
        this.setState({
          deviceName: '',
          deviceType: '',
          isCreateConfirmDialogOpen: true,
        })
      });
    }
  };

  deleteDevice = (id) => {
    this.props.deleteDevice(id)
      .then(() => {
        this.props.getDevices();
      })
      .catch(() => {
        alert('Error while deleting device');
      });
  }

  render() {
    const { classes, history } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel
          className={classes.devicesListPanel}
          expanded={expanded === 'panel1'}
          onChange={this.handleChange('panel1')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="primary"/>}>
            <Typography color="primary" className={classes.heading}>MY DEVICES</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <DevicesTable
              history={history}
              data={this.props.devices ? this.props.devices.things : []}
              editDevice={this.props.editDevice}
              getDevices={this.props.getDevices}
              onDeleteDevice={this.deleteDevice}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>ADD A NEW DEVICE</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.root}>
            <FormControl className={classes.formControl} error={this.state.deviceName === null} fullWidth aria-describedby="component-error-text">
              <InputLabel htmlFor="component-error">Device Name*</InputLabel>
              <Input name="deviceName" value={this.state.deviceName} onChange={this.handleInputChange} onBlur={this.handleBlur} />
              <FormHelperText id="component-error-text">This field is required</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="deviceType">Device Type</InputLabel>
              <Select
                value={this.state.deviceType}
                onChange={this.handleInputChange}
                inputProps={{
                  name: 'deviceType',
                  id: 'deviceType',
                }}
              >
                <MenuItem value="device">Device</MenuItem>
                <MenuItem value="app">App</MenuItem>
              </Select>
            </FormControl>

            <Button
              className={classes.button}
              color="secondary"
              onClick={this.addDevice}
              variant="contained"
              disabled={this.props.isCreatingDevice}
            >
              Add Device
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <CreateConfirmDialog
          open={this.state.isCreateConfirmDialogOpen}
          onClickDismiss={this.handleHideCreateConfirmDialog}
          onClickView={this.navigateToView}
          onClickCreate={this.navigateToCreate}
          contentText="A new device has been created"
          titleText="Confirm"
          viewButtonText="View Devices"
          createButtonText="Create Device"
        />
      </div>
    )
  }
}

Devices.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    devices: state.rootReducer.device.devices,
    isCreatingDevice: state.rootReducer.device.isCreatingDevice,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getDevices: () => dispatch(getDevices()),
    createDevice: data => dispatch(createDevice(data)),
    deleteDevice: id => dispatch(deleteDevice(id)),
    editDevice: (id, data) => dispatch(editDevice(id, data)),
  }
}

const WithStyles =  withStyles(styles, { withTheme: true })(Devices);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);