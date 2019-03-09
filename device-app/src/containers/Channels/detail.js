import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles/index";
import {getChannel, editChannel, getChannelDevices} from '../../core/actions/channel'
import ChannelDevices from './Devices';

const styles = theme => ({
  root: {
    display: 'block',
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: '2em',
    color: '#fff',
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

export class ChannelDetail extends Component {
  constructor () {
    super();

    this.state = {
      isEditMode: false,
      name: '',
    };
  }

  componentWillMount() {
    const channelId = this.props.match.params.channelId;

    this.props.getChannel(channelId);
    this.props.getChannelDevices(channelId);
  }

  componentWillReceiveProps(props) {
    this.setState({
      name: props.channel.name,
    })
  }

  editChannel = () => {
    const { name } = this.state;
    const channelId = this.props.match.params.channelId;

    this.props.editChannel(channelId, {
      name
    }).then(() => {
      this.props.getChannel(channelId).then(() => {
        this.setState({
          isEditMode: false,
        })
      });
    });
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    const channel = this.props.channel || {};

    return (
      <div className={classes.root}>
        <ChannelDevices
          channel={channel}
        />
      </div>
    )
  }
}

ChannelDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    channel: state.rootReducer.channel.channel,
    isEditingChannel: state.rootReducer.channel.isEditingChannel,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getChannel: (id) => dispatch(getChannel(id)),
    editChannel: (id, data) => dispatch(editChannel(id, data)),
    getChannelDevices: (deviceId) => dispatch(getChannelDevices(deviceId)),
  }
}

const WithStyles =  withStyles(styles, { withTheme: true })(ChannelDetail);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);
