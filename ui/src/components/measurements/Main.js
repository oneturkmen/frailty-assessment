import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  item: {
    maxHeight: '100%',
    width: '100%',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

function Measurements() {
  const classes = useStyles();

  return (
      <Grid
        container
        spacing={0}
        align="center"
        direction="column"
        justify="center"
        alignItems="center">
        <Grid item
          md={10}>
          <p>Hi dear!</p>
        </Grid>
      </Grid>
  );
}

export default Measurements;