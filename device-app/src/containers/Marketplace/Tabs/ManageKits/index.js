import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from "@material-ui/core/styles/index";
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  root: {
    display: 'block'
  },
  cardActions: {
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #ddd',
  },
  kitBrief: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  kitImage: {
    width: 60,
    height: 60,
    marginRight: '1rem',
  },
  kitInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class ManageKits extends Component {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader title="Kit Entitlement"/>
          <CardContent>
            <Grid container spacing={24}>
              <Grid item md={8}>
                <div className={classes.kitBrief}>
                  <img className={classes.kitImage}/>
                  <div className={classes.kitInfo}>
                    <Typography variant="subtitle1">Blocksafe Device Connector</Typography>
                    <Typography color="secondary">0.20 StreamX</Typography>
                  </div>
                </div>
                <div className={classes.kitDetail}>
                  <Typography>Salesforce & Jira Cloud Connector will perform the following actions</Typography>
                  <ul>
                    <li>
                      <Typography>Write data to the host application</Typography>
                    </li>
                    <li>
                      <Typography>Read data from the host application</Typography>
                    </li>
                  </ul>
                </div>
              </Grid>
              <Grid item md={4} className={classes.radioButtons}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox value="gilad" />}
                      label="Rasp_Pi_33"
                    />
                    <FormControlLabel
                      control={<Checkbox value="jason" />}
                      label="Drone_41"
                    />
                    <FormControlLabel
                      control={<Checkbox value="antoine"/>}
                      label="Drone_42"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={classes.cardActions}>

          </CardActions>
        </Card>
      </div>
    )
  }
}

ManageKits.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

const WithStyles =  withStyles(styles, { withTheme: true })(ManageKits);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);