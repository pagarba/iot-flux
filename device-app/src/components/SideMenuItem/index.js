import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { MenuItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles/index";

const styles = () => ({
  icon: {
    color: '#fff',
  },
  link: {
    textDecoration: 'none',
  },
  menuItem: {
    paddingLeft: '22px',
    paddingRight: '22px'
  },
  menuItemRipple: {
    color: 'rgb(82, 206, 232)',
  },
  menuItemSelected: {
    background: '#52cee8 !important',
  },
  text: {
    color: '#fff !important',
  }
});

class SideMenuItem extends Component {
  render() {
    const { classes, icon, selected, text, to, onClick } = this.props;
    return (
      <Link
        className={classes.link}
        to={to}
      >
        <MenuItem
          button
          classes={{
            root: classes.menuItem,
            selected: classes.menuItemSelected
          }}
          focusRippleColor="darkRed"
          touchRipple="darkRed"
          selected={selected}
          TouchRippleProps={{ classes: { root: classes.menuItemRipple } }}
          onClick={() => {
            if (onClick)
              onClick();
          }}
        >
          <ListItemIcon className={selected ? classes.icon : null}>
            {icon}
          </ListItemIcon>
          <ListItemText
            className={selected ? classes.text: null}
            primary={<Typography className={selected ? classes.text : null} variant="subtitle1">{text.toUpperCase()}</Typography>}
          />
        </MenuItem>
      </Link>
    )
  }
}

SideMenuItem.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SideMenuItem);
