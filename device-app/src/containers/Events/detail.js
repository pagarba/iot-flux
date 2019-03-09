import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';

import { withStyles } from "@material-ui/core/styles/index";

import { getChannel, getChannels, getChannelDevices } from '../../core/actions/channel';
import { createEvent, getEvents, emptyEvents } from '../../core/actions/event';
import { getDevices } from '../../core/actions/device';

import EventsTable from '../../components/Tables/EventsTable';
import CreateConfirmDialog from '../../components/Dialogs/CreateConfirmDialog';
import moment from "moment/moment";

const styles = theme => ({
  root: {
    display: 'block'
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: '2em',
    color: '#fff',
  },
  channelFilter: {
    backgroundColor: '#fff',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  },
  eventsListPanel: {
    backgroundColor: '#52cee8',
  },
  eventsListPanelDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
    fontWeight: 'bold',
  },
  formControl: {
    minWidth: '150px',
    margin: '0 1rem',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

export class EventsDetail extends Component {
  state = {
    channelId: '',
    expanded: 'panel1',
    eventName: '',
    deviceKey: '',
    data: '',
    isCreateConfirmDialogOpen: false,
    searchKeyword: '',
  };

  async componentDidMount() {

    /**
     * Latest way to get channel devices. (With dropdown and with updated mainflux API)
     */
    this.props.getDevices();
    await this.props.getChannels();

    let { channels } = this.props;
    channels = channels.channels;

    if (channels.length) {
      await this.props.getChannelDevices(channels[0].id);

      this.setState({
        channelId: channels[0].id,
      });

      const { channelDevices } = this.props;
      if (channelDevices && channelDevices.things && channelDevices.things.length) {
        const deviceKey = channelDevices.things[0].key;

        this.props.getEvents(channels[0].id, deviceKey);
      } else {
        this.props.getEvents(channels[0].id, 'random key');
      }
    } else {
      this.props.emptyEvents();
    }
  }

  addEvent = () => {
    const { channelId, deviceKey, data } = this.state;

    if (data && deviceKey) {
      this.props.createEvent(channelId, deviceKey, data)
        .then(() => {
          this.props.getEvents(channelId, deviceKey);
          this.setState({
            deviceKey: '',
            data: '',
            isCreateConfirmDialogOpen: true,
          })
        });
    }
  };

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
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChannelChange = async (event) => {
    this.setState({
      channelId: event.target.value,
    });

    this.props.getChannel(event.target.value);
    await this.props.getChannelDevices(event.target.value);

    const { channelDevices } = this.props;

    if (channelDevices && channelDevices.things && channelDevices.things.length) {
      const deviceKey = channelDevices.things[0].key;
      this.props.getEvents(event.target.value, deviceKey);
    } else {
      this.props.getEvents(event.target.value, 'random key');
    }
  };

  navigateToView = () => {
    this.setState({
      isCreateConfirmDialogOpen: false,
      expanded: 'panel1'
    });
  };

  navigateToCreate = () => {
    this.setState({
      isCreateConfirmDialogOpen: false,
      expanded: 'panel2'
    });
  };

  filteredMessages = () => {
    const { events, devices } = this.props;
    const { searchKeyword } = this.state;

    return ((events || {}).messages || []).filter((e) => {
      const deviceName = devices && devices.things ? (devices.things.find((device) => device.id === e.publisher) || {}).name : '';
      return e.name.indexOf(searchKeyword) !== -1 || e.protocol.indexOf(searchKeyword) !== -1
        || e.unit.indexOf(searchKeyword) !== -1 || e.value.toString().indexOf(searchKeyword) !== -1
        || moment(e.time).format('YYYY-MM-DD HH:mm:ss').indexOf(searchKeyword) !== -1
        || deviceName.indexOf(searchKeyword) !== -1;
    });
  };

  render() {
    const { classes, history, channels, devices, channelDevices } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel
          className={classes.eventsListPanel}
          expanded={expanded === 'panel1'}
          onChange={this.handleChange('panel1')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="primary" />}>
            <Typography className={classes.heading} color="primary">MY EVENTS</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.eventsListPanelDetails}>
            <div className={classes.channelFilter}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="deviceKey">Select Channel</InputLabel>
                <Select
                  value={this.state.channelId}
                  onChange={this.handleChannelChange}
                  inputProps={{
                    name: 'channelId',
                    id: 'channelId',
                  }}
                >
                  {
                    ((channels || {}).channels || []).map((channel) => (
                      <MenuItem value={channel.id}>{channel.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Input
                  id="searchKeyword"
                  name="searchKeyword"
                  onChange={this.handleInputChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <EventsTable
              history={history}
              data={this.filteredMessages()}
              devices={devices}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>ADD A NEW EVENT</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.root}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="deviceKey">Device</InputLabel>
              <Select
                value={this.state.deviceKey}
                onChange={this.handleInputChange}
                inputProps={{
                  name: 'deviceKey',
                  id: 'deviceKey',
                }}
              >
                {
                  channelDevices && channelDevices.things && channelDevices.things.map((device) => (
                    <MenuItem value={device.key}>{device.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>

            <FormControl className={classes.formControl} error={this.state.data === null} fullWidth aria-describedby="component-error-text">
              <InputLabel htmlFor="component-error">Data</InputLabel>
              <Input name="data" value={this.state.data} onChange={this.handleInputChange} onBlur={this.handleBlur} />
              <FormHelperText id="component-error-text">This field is required</FormHelperText>
            </FormControl>

            <Button
              className={classes.button}
              color="secondary"
              onClick={this.addEvent}
              variant="contained"
              disabled={this.props.isCreatingEvent}
            >
              Add Event
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <CreateConfirmDialog
          open={this.state.isCreateConfirmDialogOpen}
          onClickDismiss={this.handleHideCreateConfirmDialog}
          onClickView={this.navigateToView}
          onClickCreate={this.navigateToCreate}
          contentText="A new event has been created"
          titleText="Confirm"
          viewButtonText="View Events"
          createButtonText="Create Event"
        />
      </div>
    )
  }
}

EventsDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    channel: state.rootReducer.channel.channel,
    channels: state.rootReducer.channel.channels,
    channelDevices: state.rootReducer.channel.channelDevices,
    events: state.rootReducer.event.events,
    devices: state.rootReducer.device.devices,
    isCreatingEvent: state.rootReducer.event.isCreatingEvent,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createEvent: (channelId, deviceKey, data) => dispatch(createEvent(channelId, deviceKey, data)),
    getChannel: (id) => dispatch(getChannel(id)),
    getChannels: () => dispatch(getChannels()),
    getChannelDevices: (id) => dispatch(getChannelDevices(id)),
    getDevices: () => dispatch(getDevices()),
    getEvents: (channelId, deviceKey) => dispatch(getEvents(channelId, deviceKey)),
    emptyEvents: () => dispatch(emptyEvents()),
  }
}

const WithStyles =  withStyles(styles, { withTheme: true })(EventsDetail);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);
