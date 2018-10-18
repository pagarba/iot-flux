import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'stringquery';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { withStyles } from "@material-ui/core/styles/index";

import EventChannelsTable from '../../components/Tables/EventChannelsTable';
import { createChannel, getChannels, deleteChannel } from '../../core/actions/channel';

const styles = theme => ({
  root: {
    display: 'block'
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: '2em'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
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

class Channels extends Component {
  state = {
    expanded: null,
    channelName: '',
  };

  componentWillMount() {
    this.props.getChannels();
  }

  componentDidMount() {
    const obj = qs(this.props.location.search);
    this.setState({
      expanded: 'panel1'
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

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addChannel = () => {
    const { channelName } = this.state;

    if (channelName) {
      this.props.createChannel({
        name: channelName,
      }).then(() => {
        this.props.getChannels();
      });
    }
  };

  deleteChannel = (id) => {
    this.props.deleteChannel(id)
      .then(() => {
        this.props.getChannels();
      })
      .catch(() => {
        alert('Error while deleting channel');
      });
  }

  render() {
    const { classes, history } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>My Channels</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <EventChannelsTable
              history={history}
              data={this.props.channels ? this.props.channels.channels : []}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

Channels.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    channels: state.rootReducer.channel.channels,
    isCreatingDevice: state.rootReducer.device.isCreatingDevice,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getChannels: () => dispatch(getChannels()),
    createChannel: data => dispatch(createChannel(data)),
    deleteChannel: id => dispatch(deleteChannel(id)),
  }
}

const WithStyles =  withStyles(styles, { withTheme: true })(Channels);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);