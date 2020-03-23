import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FrailtyScore from './FrailtyScore';
import Profile from './Profile';
import Conditions from './Conditions';

const useStyles = makeStyles((theme) => ({
  item: {
    maxHeight: '100%',
    width: '100%',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

function Dashboard() {
  const classes = useStyles();

  return (
      <Grid
        container
        spacing={0}
        align="center"
        direction="column"
        justify="center"
        alignItems="center">
        {/* Frailty score */}
        <Grid item
          md={10}>
          <FrailtyScore />
        </Grid>
        <Grid container item
          md={10}
          direction="row"
          justify="center"
          alignItems="stretch">
          <Grid item md={4} className={classes.item}>
            <Profile />
          </Grid>
          <Grid item md={4} className={classes.item}>
            <Conditions />
          </Grid>
        </Grid>
      </Grid>
  );
}

export default Dashboard;