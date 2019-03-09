import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from "@material-ui/core/styles/index";
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import StarIcon from '@material-ui/icons/Star';

const styles = () => ({
  root: {
    display: 'block'
  },
  kitContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    border: '1px solid #ddd',
    cursor: 'pointer',
    height: '300px',
  },
  kitFooter: {
    display: 'flex',
    flexDirection: 'row',
    marginTop:  '1rem',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kitImage: {
    width: '100px',
    height: '100px',
    border: '1px solid',
    margin: '0 auto 1rem auto',
  },
  kitName: {
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  kitPrice: {
    color: '#00f',
    fontWeight: 600,
  },
  kitRating: {
    display: 'flex',
  },
  starIcon: {
    fontSize: '15px',
  },
});

class BaseKits extends Component {
  state = {
  };

  render() {
    const { classes, onClickKit } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={4}>
            <Paper elevation={5} className={classes.kitContainer} onClick={onClickKit}>
              <div className={classes.kitImage}/>
              <Typography className={classes.kitName}>QR Codes for Inventory Manage</Typography>
              <Typography>OPen details on another device - simplay scan QR code and away you go</Typography>
              <div className={classes.kitFooter}>
                <div>
                  <Typography variant="caption">Moile</Typography>
                </div>
                <div>
                  <Typography className={classes.kitPrice}>0.95 StreamX</Typography>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={5} className={classes.kitContainer} onClick={onClickKit}>
              <div className={classes.kitImage}/>
              <Typography className={classes.kitName}>Encryption, Security & 2FA for</Typography>
              <Typography>Team Secrets encrypts, protects & secures your private fields & fields with bank grade encryption & 2FA / 2 -factor authentication</Typography>
              <div className={classes.kitFooter}>
                <div>
                  <Typography variant="caption">Admin tools, Custom fields, Document management</Typography>
                  <div className={classes.kitRating}>
                    {
                      [0, 1, 2, 3].map(() => (
                        <StarIcon className={classes.starIcon}/>
                      ))
                    }
                    <Typography variant="caption">(6)</Typography>
                  </div>
                </div>
                <div>
                  <Typography className={classes.kitPrice}>0.43 StreamX</Typography>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

BaseKits.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onClickKit: PropTypes.func,
};

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

const WithStyles =  withStyles(styles, { withTheme: true })(BaseKits);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);