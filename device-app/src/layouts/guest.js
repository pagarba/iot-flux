import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {
    height: '100%',
  },
});

class GuestLayout extends React.Component {
  render () {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.props.children}
      </div>
    )
  }
}

GuestLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(GuestLayout)