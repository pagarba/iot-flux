import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  dashboard: {
    fontFamily: "Nudista",
  },
});

class IoTBasics extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.dashboard}>
        <h1>TrigXIOT Portal -  IOT Basics</h1>

        <h2>What are Devices, Channels, Apps, and Internet of Things ?</h2>

        <p>In this Tutorial we will : </p>

        <ul>
          <li>learn what IOT is</li>
          <li>Learn about the TrigXIOT portal</li>
          <li>Get introduced to the TrigXIOT Portal</li>
          <li>Register Devices &amp; Channles on the TrigX-IOT platform</li>
          <li>Send and View Events on the Trigx-IOT Portal</li>
        </ul>

        <h3>Log into the TrigX-IOT Portal</h3>

        <ul>
          <li>IP Address</li>
          <li>Create Airbitz username, password, &amp; Pin</li>
        </ul>

        <h3>Devices</h3>

        <p> #### What are Devices ?</p>

        <ul>
          <li>Devices in the TrigX-IOT Portal -- Power up your Pi and after a few moments your Pi should be up and connected to WiFi  </li>
        </ul>

        <h4>Channels</h4>

        <ul><li>What are TrigX-IOT Channels ? </li></ul>

        <h4>Events &amp; Messages</h4>

        <ul><li>What are Events and Messages </li></ul>

        <h4>Create &amp; Register Devices</h4>

        <ul>
          <li>You can  create users, channels and Devices on the TrigXIOT Dasboard
            <ul>
              <li>We will register over dashboard</li>
              <li>Create two devices
                <ul>
                  <li>
                    named
                    <ul>
                      <li>Cool-IOT-Device-1</li>
                      <li>Cool-IOT-Device-2</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>Create a Channel
                <ul>
                  <li>
                    named
                    <ul>
                      <li>Cool-IOT-Channel-1 </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>Connect these devices to the channel</li>
            </ul>
          </li>
        </ul>

        <h4>Create a Channel</h4>

        <h4>Connect Devices to a Channel</h4>

        <h4>Create Event Messages</h4>

        <h4>View Events</h4>

        <h4>Admin Panel</h4>
      </div>
    );
  }
}

IoTBasics.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IoTBasics);
