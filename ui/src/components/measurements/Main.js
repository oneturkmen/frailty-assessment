import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ChartPaper from './ChartPaper';

const useStyles = makeStyles((theme) => ({
  item: {
    height: '100%',
    maxWidth: '100%',
  },
  header: {
    maxWidth: '60em',
    //paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
}));



function Measurements() {
  const styles = useStyles();

  const [weeklyHrData, setWeeklyHrData] = useState([]);

  const hr_baseline = 100;

  useEffect(() => {
    fetch("http://localhost:5000/hr/weekly")
      .then((res) => res.json())
      .then((res) => {
        return res.map(entry => {
          if (typeof entry[0] === "number") {
            const t = (new Date(entry[0] * 1000)).toISOString();
            return [t.substr(0, 10), entry[1]];
          } 
          else {
            return entry;
          }
        })
      })
      .then(
        (result) => {
          setWeeklyHrData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          throw error;
        },
      );
  }, []);


  const [monthlyHrData, setMonthlyHrData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/hr/monthly")
      .then((res) => res.json())
      .then((res) => {
        return res.map(entry => {
          if (typeof entry[0] === "number") {
            const t = (new Date(entry[0] * 1000)).toISOString();
            return [t.substr(0, 10), entry[1]];
          } 
          else {
            return entry;
          }
        })
      })
      .then(
        (result) => {
          setMonthlyHrData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          throw error;
        },
      );
  }, []);

  const [weeklyBpData, setWeeklyBpData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/bp/weekly")
      .then((res) => res.json())
      .then((res) => {
        return res.map(entry => {
          if (typeof entry[0] === "number") {
            const t = (new Date(entry[0] * 1000)).toISOString();
            return [t.substr(0, 10), entry[1], entry[2]];
          } 
          else {
            return entry;
          }
        })
      })
      .then(
        (result) => {
          setWeeklyBpData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          throw error;
        },
      );
  }, []);

  const [monthlyBpData, setMonthlyBpData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/bp/monthly")
      .then((res) => res.json())
      .then((res) => {
        return res.map(entry => {
          if (typeof entry[0] === "number") {
            const t = (new Date(entry[0] * 1000)).toISOString();
            return [t.substr(0, 10), entry[1], entry[2]];
          } 
          else {
            return entry;
          }
        })
      })
      .then(
        (result) => {
          setMonthlyBpData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          throw error;
        },
      );
  }, []);

  return (
      <Grid
        container
        spacing={1}
        align="center"
        direction="column"
        justify="center"
        alignItems="center">
        <Grid item
          md={12}>
          <Typography align="center" className={styles.header} variant="h4">
            Measurements
          </Typography>
        </Grid>
        <Grid container item
          md={10}
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item md={5} xs={10}>
            <ChartPaper data={weeklyHrData} chartTitle="Weekly Heart Rate"/>
          </Grid>
          <Grid item md={5} xs={10}>
            <ChartPaper data={monthlyHrData} chartTitle="Monthly Heart Rate"/>
          </Grid>
        </Grid>
        <Grid container item
          md={10}
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item md={5} xs={10}>
            <ChartPaper data={weeklyBpData} chartTitle="Weekly Blood Pressure"/>
          </Grid>
          <Grid item md={5} xs={10}>
            <ChartPaper data={monthlyBpData} chartTitle="Monthly Blood Pressure"/>
          </Grid>
        </Grid>
      </Grid>
  );
}

export default Measurements;