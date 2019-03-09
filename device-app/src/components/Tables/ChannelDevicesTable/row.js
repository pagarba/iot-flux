import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles/index";

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/DeleteOutline';

const styles = () => ({
  key: {
    minWidth: '300px',
  },
  keyCellContent: {
    display: 'flex',
    alignItems: 'center',
  },
  showHideButton: {
    height: '32px',
    padding: '0.3rem',
    marginLeft: '1rem',
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

  render() {
    const { classes, row } = this.props;
    const { isKeyVisible } = this.state;

    return (
      <TableRow
        hover
        tabIndex={-1}
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
        <TableCell
          onClick={(e) => e.stopPropagation()}
        >
          <DeleteIcon
            className={classes.deleteIcon}
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
