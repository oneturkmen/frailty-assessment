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



function Activity() {
  const styles = useStyles();

  const [weeklyStepsData, setWeeklyStepsData] = useState([]);

  const steps_baseline = 11; // in thousands
  const calories_baseline = 0.27; // for women

  useEffect(() => {
    fetch("http://localhost:5000/steps/weekly")
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
          setWeeklyStepsData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          throw error;
        },
      );
  }, []);


  const [monthlyStepsData, setMonthlyStepsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/steps/monthly")
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
          setMonthlyStepsData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          throw error;
        },
      );
  }, []);

  const [weeklyCaloriesData, setWeeklyCaloriesData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/calories/weekly")
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
          setWeeklyCaloriesData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          throw error;
        },
      );
  }, []);

  const [monthlyCaloriesData, setMonthlyCaloriesData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/calories/monthly")
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
          setMonthlyCaloriesData(result);
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
            Physical Activity
          </Typography>
        </Grid>
        <Grid container item
          md={10}
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item md={5} xs={10}>
            <ChartPaper data={weeklyStepsData} baseline={steps_baseline} chartTitle="Weekly Steps Walked"/>
          </Grid>
          <Grid item md={5} xs={10}>
            <ChartPaper data={monthlyStepsData} baseline={steps_baseline} chartTitle="Monthly Steps Walked"/>
          </Grid>
        </Grid>
        <Grid container item
          md={10}
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item md={5} xs={10}>
            <ChartPaper data={weeklyCaloriesData} baseline={calories_baseline} chartTitle="Weekly Calories burnt"/>
          </Grid>
          <Grid item md={5} xs={10}>
            <ChartPaper data={monthlyCaloriesData} baseline={calories_baseline} chartTitle="Monthly Calories burnt"/>
          </Grid>
        </Grid>
      </Grid>
  );
}

export default Activity;