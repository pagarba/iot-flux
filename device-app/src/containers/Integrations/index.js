import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles/index";

import JustifireLogo from '../../assets/img/justifire.png';
import VisualFlightsLogo from '../../assets/img/visual_flights.png';
import TriggerSmartLogo from '../../assets/img/trigger_smart.png';
import DataLifeLogo from '../../assets/img/datalife.png';
import GuniaryLogo from '../../assets/img/guniary.png';

import { integrations } from '../../constants';
import { newIntegrations } from '../../constants';
import qs from 'stringquery'

const logos = {
  justifire: JustifireLogo,
  visualFlights: VisualFlightsLogo,
  triggerSmart: TriggerSmartLogo,
  datalife: DataLifeLogo,
  guniary: GuniaryLogo,
}

const styles = theme => ({
  root: {
    display: 'block'
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: '2em',
    color: '#fff',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
    fontWeight: 'bold',
  },
  imgContainer: {
    marginRight: '30px',
    display: 'flex',
    flexDirection: 'column',
  },
  imgList: {
    alignItems: 'center',
    display: 'flex',
    background: '#fff',
    width: '100%',
    padding: '1em',
    borderRadius: '4px',
    overflowX: 'scroll',
  },
  imgLogo: {
    height: '50px',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  myIntegrationsPanel: {
    backgroundColor: '#52cee8',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

export class Integrations extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: null,
      integrations: ['justifire', 'visualFlights'],
      newIntegrations: ['triggerSmart', 'datalife', 'guniary']
    }
  }

  componentDidMount() {
    const obj = qs(this.props.location.search);
    this.setState({
      expanded: obj.mode === 'create' ? 'panel2' : 'panel1',
    });
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleBlur = event => {
    if (!this.state[event.target.name])
      this.setState({ [event.target.name]: null });
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addIntegration = newIntegration => {
    let { integrations, newIntegrations } = this.state;

    integrations.push(newIntegration);
    newIntegrations = newIntegrations.filter(integration => integration !== newIntegration);

    this.setState({
      integrations,
      newIntegrations
    });
  }

  deleteIntegration = integration => {
    let { integrations, newIntegrations } = this.state;

    newIntegrations.push(integration);
    integrations = integrations.filter(e => e !== integration);

    this.setState({
      integrations,
      newIntegrations
    });
  }

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <div className={classes.root}>
        <ExpansionPanel
          key={1}
          className={classes.myIntegrationsPanel}
          expanded={expanded === 'panel1'}
          onChange={this.handleChange('panel1')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="primary" />}>
            <Typography color="primary" className={classes.heading}>MY INTEGRATIONS</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.imgList}>
              {
                this.state.integrations.map((integration, i) => (
                  <div key={i} className={classes.imgContainer}>
                    <img className={classes.imgLogo} src={logos[integration]} />
                    <Button
                      color="secondary"
                      className={classes.button}
                      onClick={() => this.deleteIntegration(integration)}
                      variant="contained"
                    >
                      + Delete {integration}
                    </Button>
                  </div>
                ))
              }
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          key={2}
          expanded={expanded === 'panel2'}
          onChange={this.handleChange('panel2')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>ADD A NEW INTEGRATION</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.root}>
            <div className={classes.imgList}>
              {
                this.state.newIntegrations.map(integration => (
                  <div className={classes.imgContainer}>
                    <img className={classes.imgLogo} src={logos[integration]} />
                    <Button
                      color="secondary"
                      className={classes.button}
                      onClick={() => this.addIntegration(integration)}
                      variant="contained"
                    >
                      + Add {integration}
                    </Button>
                  </div>
                ))
              }
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

Integrations.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Integrations);
