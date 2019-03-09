import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import MainLayout from '../layouts/main';
import GuestLayout from '../layouts/guest';
import Page404 from '../containers/Page404';
import Login from '../containers/Auth/Login';
import ResetPassword from '../containers/Auth/ResetPassword';
import Signup from '../containers/Auth/Signup';
import Dashboard from '../containers/Dashboard';
import Devices from '../containers/Devices';
import DeviceDetail from '../containers/Devices/detail';
import Channels from '../containers/Channels';
import ChannelDetail from '../containers/Channels/detail';
import EventDetail from '../containers/Events/detail';
import Integrations from '../containers/Integrations';
import MarketPlace from '../containers/Marketplace';
import Tutorials from '../containers/Tutorials';
import GettingStartedTutorial from '../containers/Tutorials/GettingStarted';
import IoTBasicsTutorial from '../containers/Tutorials/IoTBasics';
import IntroToTrigxIoTTutorial from '../containers/Tutorials/IntroToTrigxIoT';

const userPaths = [
  'dashboard',
  'devices',
  'deviceDetail',
  'channels',
  'channelDetail',
  'events',
  'eventDetail',
  'integrations',
  'marketplace',
  'build-kits',
  'tutorials',
];

const guestPaths = [
  'login',
  'reset-password',
  'signup',
  'error'
]

class Routes extends Component {
  render() {
    const { isAuthenticated, location } = this.props;
    let pathname = location.pathname.split('/');

    if (pathname[1] === 'devices' && pathname.length === 3) {
      pathname = 'deviceDetail';
    } else if (pathname[1] === 'events' && pathname.length === 3) {
      pathname = 'eventDetail';
    } else {
      pathname = pathname[1];
    }

    if (isAuthenticated) {
      if (pathname !== '' && userPaths.indexOf(pathname) === -1) {
        return (
          <Switch>
            <GuestLayout>
              <Route
                component={Page404}
                location={location}
                path="/error"
              />
              {pathname !=='error' && <Redirect to="/error"/>}
            </GuestLayout>
          </Switch>
        )
      }

      return (
        <Switch>
          <MainLayout pathname={pathname}>
            <Route
              location={location}
              path="/dashboard"
              component={Dashboard}
            />
            <Route
              location={location}
              path="/marketplace"
              component={MarketPlace}
            />
            <Route
              location={location}
              exact
              path="/devices"
              component={Devices}
            />
            <Route
              location={location}
              exact
              path="/devices/:deviceId"
              component={DeviceDetail}
            />
            <Route
              location={location}
              exact
              path="/channels"
              component={Channels}
            />
            <Route
              location={location}
              exact
              path="/channels/:channelId"
              component={ChannelDetail}
            />
            <Route
              location={location}
              exact
              path="/events"
              component={EventDetail}
            />
            <Route
              location={location}
              exact
              path="/events/channels/:channelId/messages"
              component={EventDetail}
            />
            <Route
              location={location}
              exact
              path="/integrations"
              component={Integrations}
            />
            <Route
              location={location}
              exact
              path="/tutorials"
              component={Tutorials}
            />
            <Route
              location={location}
              exact
              path="/tutorials/iot-basics"
              component={IoTBasicsTutorial}
            />
            <Route
              location={location}
              exact
              path="/tutorials/getting-started"
              component={GettingStartedTutorial}
            />
            <Route
              location={location}
              exact
              path="/tutorials/intro-to-trigx-iot"
              component={IntroToTrigxIoTTutorial}
            />
            {pathname === '' && <Redirect to="/dashboard"/>}
          </MainLayout>
        </Switch>
      )
    }

    return (
      <Switch>
        <GuestLayout>
          <Route
            location={location}
            path="/login"
            component={Login}
          />
          <Route
            location={location}
            path="/reset-password"
            component={ResetPassword}
          />
          <Route
            location={location}
            path="/signup"
            component={Signup}
          />
          <Route
            component={Page404}
            location={location}
            path="/error"
          />
          {pathname === '' && <Redirect to="/login"/>}
          {pathname !== '' && guestPaths.indexOf(pathname) === -1 && <Redirect to="/error"/>}
        </GuestLayout>
      </Switch>
    );
  }
}

export default Routes;
