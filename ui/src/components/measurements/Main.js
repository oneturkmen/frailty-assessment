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


function Measurements() {
  const styles = useStyles();
  const today = getToday();

  const [untilDate, setUntilDate] = useState(new Date(getToday()));
  const [weeklyHrData, setWeeklyHrData] = useState([]);

  const handleDateChange = (date) => {
    const formatted = formatDate(date);
    console.log(formatted)
    setUntilDate(formatted);

    const ts = Math.round((new Date(formatted)).getTime()/1000);

    // Weekly HR
    fetch(`http://localhost:5000/hr/weekly?until=${ts}`)
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

    // Monthly HR
    fetch(`http://localhost:5000/hr/monthly?until=${ts}`)
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

    // Weekly BP
    fetch(`http://localhost:5000/bp/weekly?until=${ts}`)
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

    // Monthly BP
    fetch(`http://localhost:5000/bp/monthly?until=${ts}`)
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
  };

  const hr_baseline = 100;

  useEffect(() => {
    const ts = Math.round((new Date(untilDate)).getTime()/1000);
    fetch(`http://localhost:5000/hr/weekly?until=${ts}`)
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
    const ts = Math.round((new Date(untilDate)).getTime()/1000);
    fetch(`http://localhost:5000/hr/monthly?until=${ts}`)
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
    const ts = Math.round((new Date(untilDate)).getTime()/1000);
    fetch(`http://localhost:5000/bp/weekly?until=${ts}`)
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
    const ts = Math.round((new Date(untilDate)).getTime()/1000);
    fetch(`http://localhost:5000/bp/monthly?until=${ts}`)
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