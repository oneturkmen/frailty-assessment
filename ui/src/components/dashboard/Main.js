import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

const getToday = () => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let res = '';

  if (month < 10) {
    res += `0${month}`;
  } else {
    res += `${month}`;
  }

  res += '/';

  if (day < 10) {
    res += `0${day}`;
  } else {
    res += `${day}`;
  }

  res += `/${year}`;

  return res;
};


const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let res = '';

  if (month < 10) {
    res += `0${month}`;
  } else {
    res += `${month}`;
  }

  res += '/';

  if (day < 10) {
    res += `0${day}`;
  } else {
    res += `${day}`;
  }

  res += `/${year}`;

  return res;
};


function Dashboard() {
  const classes = useStyles();

  const [untilDate, setUntilDate] = useState(new Date(getToday()));

  // const data = {
  //   'hr': 0,
  //   'bp': 1,
  //   'steps': 0,
  //   'calories': 0,
  //   'weight': 0,
  //   'frailty_score': 1,
  // };
  
  const handleDateChange = (date) => {
    const formatted = formatDate(date);
    setUntilDate(formatted);

    const ts = Math.round((new Date(formatted)).getTime()/1000);

    // Weekly score
    fetch(`http://localhost:5000/score/week?until=${ts}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setWeeklyScore(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          throw error;
        },
      );

    // Monthly score
    fetch(`http://localhost:5000/score/month?until=${ts}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setMonthlyScore(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          throw error;
        },
      );
  };

  const [weeklyScore, setWeeklyScore] = useState({});

  useEffect(() => {
    const ts = Math.round((new Date(untilDate)).getTime()/1000);
    fetch(`http://localhost:5000/score/week?until=${ts}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setWeeklyScore(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          throw error;
        },
      );
  }, []);


  const [monthlyScore, setMonthlyScore] = useState({});

  useEffect(() => {
    const ts = Math.round((new Date(untilDate)).getTime()/1000);
    fetch(`http://localhost:5000/score/month?until=${ts}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setMonthlyScore(result);
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
        spacing={0}
        align="center"
        direction="column"
        justify="center"
        alignItems="center">
        {/* Frailty score (for past month & week) */}
        <Grid container item
          md={10}
          direction="row"
          justify="center"
          alignItems="center">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container item justify="center">
              <KeyboardDatePicker
                disableToolbar={true}
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="until-date"
                value={untilDate}
                onChange={handleDateChange}
                label="Until date"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid item md={4} className={classes.item}>
            <FrailtyScore data={monthlyScore} period={"month"}/>
          </Grid>
          <Grid item md={4} className={classes.item}>
            <FrailtyScore data={weeklyScore} period={"week"}/>
          </Grid>
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