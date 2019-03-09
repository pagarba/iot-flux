import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { AppBar, Button, Divider, Drawer, IconButton, List, Toolbar, Typography } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ChannelsIcon from '@material-ui/icons/GridOnOutlined';
import DevicesIcon from '@material-ui/icons/AddToQueue';
import EventIcon from '@material-ui/icons/VisibilityOutlined';
import TutorialsIcon from '@material-ui/icons/SchoolOutlined';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';

import SideMenuItem from '../components/SideMenuItem';
import { logout, resetAccount } from '../core/actions/auth';

import BackgroundImage from '../assets/img/background.jpg';
import Logo from '../assets/img/logo.png';
import CoinIcon from '../assets/img/coin-icon.png';

const drawerWidth = 240;

const overallTheme = createMuiTheme({
  palette: {
    primary: { main: '#fff' },
    secondary: {
      main: '#52cee8',
    },
    background: {
      default: '#f7f7f7'
    }
  },
  typography: {
    "fontFamily": "\"Nudista\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
  }
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  btnLogout: {
    color: '#52cee8',
    fontWeight: 'bold',
  },
  coinAmount: {
    fontSize: '25px',
    margin: '0 0.5rem',
    fontWeight: 'bold',
  },
  coinSection: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '1.5rem',
  },
  logo: {
    width: '160px',
  },
  logoText: {
    fontFamily: 'Nudista',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '5px',
    marginLeft: '-5px',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
    display: 'block',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
  },
  mobileContent: {
    display: 'none',
  },
  mobileDrawer: {
    width: 0,
  },
  pageName: {
    fontWeight: 'bold',
  },
  titleBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    background: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
    overflowY: 'scroll',
  },
});

const pageTitles = {
  'dashboard': 'Dashboard',
  'devices': 'Devices',
  'channels': 'Channels',
  'channelDetail': 'Channel Detail',
  'deviceDetail': 'Device Detail',
  'events': 'Event Viewer',
  'integrations': 'Integrations',
  'tutorials': 'Tutorials'
};

const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

class MainLayout extends React.Component {
  constructor() {
    super();

    this.state = {
      open: width >= 768,
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  logout = async () => {
    this.props.logout();
  };

  render() {
    const { classes, pathname, theme } = this.props;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={overallTheme}>
          <CssBaseline />
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar
              className={classes.titleBar}
              disableGutters={!this.state.open}
            >
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography className={ classes.pageName } variant="title" color="secondary" noWrap>
                { (pageTitles[pathname] || '').toUpperCase() }
              </Typography>
              <div className={classes.headerRight}>
                <div className={classes.coinSection}>
                  <img src={CoinIcon}/>
                  <Typography className={classes.coinAmount} color="secondary">2817.02162010</Typography>
                  <Typography>StreamX</Typography>
                </div>
                <Button
                  className={classes.btnLogout}
                  onClick={this.logout}
                >
                  Logout
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose, width < 768 && !this.state.open && classes.mobileDrawer),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <div>
                <img
                  className={classes.logo}
                  src={Logo}
                />
                <Typography className={classes.logoText} variant="h6" color="secondary">CONTROL CENTER</Typography>
              </div>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              <SideMenuItem
                to="/dashboard"
                icon={<DashboardIcon/>}
                selected={pathname === 'dashboard'}
                text="Dashboard"
                onClick={width < 768 && this.handleDrawerClose}
              />
              <SideMenuItem
                to="/marketplace"
                icon={<ShoppingCartIcon/>}
                selected={pathname === 'marketplace'}
                text="Marketplace"
                onClick={width < 768 && this.handleDrawerClose}
              />
              <SideMenuItem
                to="/channels"
                icon={<ChannelsIcon/>}
                selected={pathname === 'channels' || pathname === 'channelDetail'}
                text="Channels"
                onClick={width < 768 && this.handleDrawerClose}
              />
              <SideMenuItem
                to="/devices"
                icon={<DevicesIcon/>}
                selected={pathname === 'devices' || pathname === 'deviceDetail'}
                text="Device Manager"
                onClick={width < 768 && this.handleDrawerClose}
              />
              <SideMenuItem
                to="/events"
                icon={<EventIcon/>}
                selected={pathname === 'events'}
                text="Event Viewer"
                onClick={width < 768 && this.handleDrawerClose}
              />
              <SideMenuItem
                to="/tutorials"
                icon={<TutorialsIcon/>}
                selected={pathname === 'tutorials'}
                text="Tutorials"
                onClick={width < 768 && this.handleDrawerClose}
              />
            </List>
          </Drawer>
          <main className={classNames(classes.content, this.state.open && width < 768 && classes.mobileContent)}>
            <div className={classes.toolbar} />
            {this.props.children}
          </main>
        </MuiThemeProvider>
      </div>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    account: state.rootReducer.auth.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    resetAccount: account => dispatch(resetAccount(account)),
  };
}

const WithStyles = withStyles(styles, { withTheme: true })(MainLayout);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);