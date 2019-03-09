import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from "@material-ui/core/styles/index";
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  root: {
    display: 'block'
  },
  actionRight: {
    display: 'flex',
    alignItems: 'center',
  },
  cardActions: {
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #ddd',
  },
  dropdowns: {
    display: 'flex',
    flexDirection: 'column',
  },
  dropdownWrapper: {
    display: 'flex',
  },
  footerText: {
    width: '300px',
  },
  input: {
    marginLeft: '1rem',
    width: '100%',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '1rem',
    width: '100%',
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
  formControl: {
    minWidth: 150,
  },
});

class BaseKits extends Component {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader title="Download Kit"/>
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
              <Grid item md={4} className={classes.dropdowns}>
                <div className={classes.dropdownWrapper}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-helper">Choose Channel</InputLabel>
                    <Select
                      value={this.state.age}
                      onChange={this.handleChange}
                      input={<Input/>}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    className={classes.input}
                    label="Enter Channel Name"
                  />
                </div>
                <div className={classes.dropdownWrapper}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-helper">Choose Device</InputLabel>
                    <Select
                      value={this.state.age}
                      onChange={this.handleChange}
                      input={<Input name="age" id="age-helper" />}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <div className={classes.inputGroup}>
                    <TextField
                      label="Enter Device Name"
                    />
                    <TextField
                      label="Enter Description"
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Typography color="secondary">View app details</Typography>
            <div className={classes.actionRight}>
              <Typography
                variant="caption"
                className={classes.footerText}
              >
                By installing the app, you agree to service provider's
                <span> privacy policy </span> and
                <span> terms of use. </span>
              </Typography>
              <Button variant="contained" color="secondary">
                Download
              </Button>
              <Button>Cancel</Button>
            </div>
          </CardActions>
        </Card>
      </div>
    )
  }
}

BaseKits.propTypes = {
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

const WithStyles =  withStyles(styles, { withTheme: true })(BaseKits);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);