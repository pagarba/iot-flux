import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from "@material-ui/core/styles/index";

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import StorageIcon from '@material-ui/icons/Storage';
import RssFeedIcon from '@material-ui/icons/RssFeed';

const styles = theme => ({
  root: {
    width: '100%',
  },
  actionIcon: {
    cursor: 'pointer',
  },
  key: {
    minWidth: '300px',
  },
  keyCellContent: {
    display: 'flex',
    alignItems: 'center',
  },
  registerButton: {
    marginLeft: '0.5rem',
    cursor: 'pointer',
  },
  registerCell: {
    display: 'flex',
    alignItems: 'center',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  showHideButton: {
    height: '32px',
    padding: '0.3rem',
    marginLeft: '1rem',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class Row extends Component {
  state = {
    isKeyVisible: false,
  };

  toggleKeyVisibility = (e) => {
    e.stopPropagation();

    this.setState({
      isKeyVisible: !this.state.isKeyVisible,
    });
  };

  handleClick = (event, deviceId) => {
    this.props.history.push(`/devices/${deviceId}`);
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, row } = this.props;
    const { isKeyVisible } = this.state;

    return (
      <TableRow
        hover
        role="checkbox"
        onClick={event => {
          this.handleClick(event, row.id)
        }}
        tabIndex={-1}
        key={row.deviceId}
      >
        <TableCell component="th" scope="row">{row.id}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>
          <div  className={classes.keyCellContent}>
            <Typography className={classes.key}>
              {isKeyVisible ? row.key : row.key.replace(/./g, '*')}
            </Typography>
            <Button
              color="secondary"
              variant="outlined"
              onClick={this.toggleKeyVisibility}
              className={classes.showHideButton}
            >
              {isKeyVisible ? 'Hide' : 'Show'}
            </Button>
          </div>
        </TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell>
          {
            row.connectedAt ?
              row.connectedAt
              : (
                <div className={classes.registerCell}>
                  <Typography>Connect Now</Typography>
                  <IconButton
                    className={classes.registerButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      this.props.onClickConnect(row);
                    }}
                  >
                    <RssFeedIcon/>
                  </IconButton>
                </div>
              )
          }
        </TableCell>
        <TableCell>
          {
            row.registeredAt ?
              row.registeredAt
              : (
                <div className={classes.registerCell}>
                  <Typography>Register Now</Typography>
                  <IconButton
                    className={classes.registerButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      this.props.onClickRegister(row);
                    }}
                  >
                    <StorageIcon/>
                  </IconButton>
                </div>
              )
          }
        </TableCell>
        <TableCell
          onClick={(e) => e.stopPropagation()}
        >
          <EditIcon
            className={classes.actionIcon}
            onClick={() => { this.props.onClickEditIcon(row) }}
          />
          <DeleteIcon
            className={classes.actionIcon}
            onClick={() => { this.props.onClickDeleteIcon(row.id) }}
          />
        </TableCell>
      </TableRow>
    );
  }
}

Row.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Row);
