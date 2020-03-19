/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

class Footer extends Component {
  render() {
    return (
      <footer style={{ marginTop: '24px' }}>
        <Typography variant="h6" align="center" gutterBottom >
          Frailty Assessment Technologies
        </Typography>
      </footer>
    );
  }
}

export default Footer;
