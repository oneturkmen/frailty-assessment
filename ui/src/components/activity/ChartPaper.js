import React from 'react';
import {
  Paper,
  Typography,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Chart } from "react-google-charts";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: 'auto',
    width: 'auto',
  },
  header: {
    maxWidth: '100%'
  }
}));


function ChartPaper(props) {
  const styles = useStyles();

  const { chartTitle, data, baseline } = props;

  const options = {
    vAxis: {
      baseline,
      baselineColor: 'red',
    },
    // hAxis: {
    //   title: 'Time',
    // },
    // vAxis: {
    //   title: 'Measurement',
    // },
    series: {
      0: { curveType: 'function' },
      1: { curveType: 'function' },
    },
    legend: {
      position: 'bottom'
    },
    chartArea:{
      top: '10%',
      bottom: '25%',
      width: '80%',
      height: '60%',
    }
  }

  return (
    <Paper elevation={1}>
      <Grid container
      className={styles.gridContainer}
      direction="column"
      justify="center"
      alignItems="center">
        <Grid item md={2} className={styles.header}>
          <Typography align="center" variant="h5">
            {chartTitle}
          </Typography>
        </Grid>
        <Grid item md={10}>
          <Chart
            width={'30vw'}
            height={'40vh'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={options}
            rootProps={{ 'data-testid': '2' }}
          />
        </Grid>
    </Grid>
    </Paper>
  );
}

export default ChartPaper;