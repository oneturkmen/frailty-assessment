import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

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


function Activity() {
  const styles = useStyles();

  const [weeklyStepsData, setWeeklyStepsData] = useState([]);
  const [untilDate, setUntilDate] = useState(new Date(getToday()));

  const steps_baseline = 11000; // in thousands
  const calories_baseline = 0.27; // for women

  const handleDateChange = (date) => {
    const formatted = formatDate(date);
    console.log(formatted)
    setUntilDate(formatted);

    const ts = Math.round((new Date(formatted)).getTime()/1000);

    // Weekly steps
    fetch(`http://localhost:5000/steps/weekly?until=${ts}`)
      .then((res) => res.json())
      .then((res) => {
        return res.map(entry => {
          if (typeof entry[0] === "number") {
            const t = (new Date(entry[0] * 1000)).toISOString();
            return [t.substr(0, 10), entry[1] * 1000];
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

    // Monthly steps
    fetch(`http://localhost:5000/steps/monthly?until=${ts}`)
      .then((res) => res.json())
      .then((res) => {
        return res.map(entry => {
          if (typeof entry[0] === "number") {
            const t = (new Date(entry[0] * 1000)).toISOString();
            return [t.substr(0, 10), entry[1] * 1000];
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

    // Weekly calories
    fetch(`http://localhost:5000/calories/weekly?until=${ts}`)
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

    // Monthly calories
    fetch(`http://localhost:5000/calories/monthly?until=${ts}`)
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
  };

  useEffect(() => {
    const ts = Math.round((new Date(untilDate)).getTime()/1000);
    fetch(`http://localhost:5000/steps/weekly?until=${ts}`)
      .then((res) => res.json())
      .then((res) => {
        return res.map(entry => {
          if (typeof entry[0] === "number") {
            const t = (new Date(entry[0] * 1000)).toISOString();
            return [t.substr(0, 10), entry[1] * 1000];
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
    const ts = Math.round((new Date(untilDate)).getTime()/1000);
    fetch(`http://localhost:5000/steps/monthly?until=${ts}`)
      .then((res) => res.json())
      .then((res) => {
        return res.map(entry => {
          if (typeof entry[0] === "number") {
            const t = (new Date(entry[0] * 1000)).toISOString();
            return [t.substr(0, 10), entry[1] * 1000];
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
    const ts = Math.round((new Date(untilDate)).getTime()/1000);
    fetch(`http://localhost:5000/calories/weekly?until=${ts}`)
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
    const ts = Math.round((new Date(untilDate)).getTime()/1000);
    fetch(`http://localhost:5000/calories/monthly?until=${ts}`)
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id="date-picker-dialog"
              format="MM/dd/yyyy"
              label="Until Date"
              value={untilDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
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