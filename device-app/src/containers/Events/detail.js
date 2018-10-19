import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
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

import { getChannel } from '../../core/actions/channel';
import { createEvent, getEvents } from '../../core/actions/event';
import { getDevices } from '../../core/actions/device';
import EventsTable from '../../components/Tables/EventsTable';
import qs from 'stringquery'
import { connect } from 'react-redux'

const styles = theme => ({
  root: {
    display: 'block'
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: '2em',
    color: '#fff',
  },
  eventsListPanel: {
    backgroundColor: '#52cee8',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    fontWeight: 'bold',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '120px'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class EventsDetail extends Component {
  state = {
    expanded: 'panel1',
    eventName: '',
    deviceKey: '',
    data: '',
  };

  componentDidMount() {
    const { channelId } = this.props.match.params;

    this.props.getDevices();

    this.props.getChannel(channelId)
      .then(() => {
        const { channel } = this.props;
        if (channel && channel.connected && channel.connected.length) {
          const deviceKey = channel.connected[0].key;
          this.props.getEvents(channelId, deviceKey)
            .then(() => {
              console.log(this.props.events)
            })
        } else {
          this.props.getEvents(channelId, 'random key')
            .then(() => {
              console.log(this.props.events)
            })
            .catch(() => {
              console.log(this.props.events)
            })
        }
      })
  }

  addEvent = () => {
    const { channelId } = this.props.match.params;
    const { deviceKey, data } = this.state;

    if (data && deviceKey) {
      this.props.createEvent(channelId, deviceKey, data)
        .then(() => {
          this.props.getEvents(channelId, deviceKey);
          this.setState({
            deviceKey: '',
            data: '',
          })
        });
    }
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

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, history, channel, devices, events } = this.props;
    const { expanded } = this.state;
    return (
      <div className={classes.root}>
        <ExpansionPanel
          className={classes.eventsListPanel}
          expanded={expanded === 'panel1'}
          onChange={this.handleChange('panel1')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="primary" />}>
            <Typography className={classes.heading} color="primary">My Events</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <EventsTable
              history={history}
              data={events ? events.messages : []}
              devices={devices}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Add a New Event</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.root}>
            {/*<FormControl className={classes.formControl} error={this.state.eventName === null} fullWidth aria-describedby="component-error-text">*/}
              {/*<InputLabel htmlFor="component-error">Event Name*</InputLabel>*/}
              {/*<Input name="eventName" value={this.state.eventName} onChange={this.handleInputChange} onBlur={this.handleBlur} />*/}
              {/*<FormHelperText id="component-error-text">This field is required</FormHelperText>*/}
            {/*</FormControl>*/}

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
                  channel && channel.connected && channel.connected.map((device) => (
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
    events: state.rootReducer.event.events,
    devices: state.rootReducer.device.devices,
    isCreatingEvent: state.rootReducer.event.isCreatingEvent,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createEvent: (channelId, deviceKey, data) => dispatch(createEvent(channelId, deviceKey, data)),
    getChannel: (id) => dispatch(getChannel(id)),
    getDevices: () => dispatch(getDevices()),
    getEvents: (channelId, deviceKey) => dispatch(getEvents(channelId, deviceKey)),
  }
}

const WithStyles =  withStyles(styles, { withTheme: true })(EventsDetail);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);
