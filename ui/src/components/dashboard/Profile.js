import React from 'react';
import {
  Paper, 
  TableContainer,
  Table,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa'
  },
  profile: {
    width: '100%',
  },
  table: {
    border: 'none !important',
  },
  header: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    fontWeight: 'bold'
  },
  cell: {
    borderBottom: 'none !important',
    fontSize: '1.10em'
  },
}));


function Profile() {
  const styles = useStyles();

  const profile_data = {
    name: 'John Doe',
    weight: 75.7,
    height: 182,
    age: 24,
    dob: "25/05/1945",
    last_updated: "19/03/2020",
  };

  return (
    <Paper className={styles.root}>
      <Typography align="left" className={styles.header} variant="h5">
        Patient Profile
      </Typography>
      <TableContainer className={styles.profile}>
        <Table aria-label="profile table" className={styles.table}>
          <TableBody>
            <TableRow key={1}>
              <TableCell className={styles.cell} component="th" scope="row">Name</TableCell>
              <TableCell className={styles.cell} align="right">{profile_data.name}</TableCell>
            </TableRow>
            <TableRow key={2}>
              <TableCell className={styles.cell} component="th" scope="row">Weight</TableCell>
              <TableCell className={styles.cell} align="right">{profile_data.weight} kg</TableCell>
            </TableRow>
            <TableRow key={3}>
              <TableCell className={styles.cell} component="th" scope="row">Height</TableCell>
              <TableCell className={styles.cell} align="right">{profile_data.height} cm</TableCell>
            </TableRow>
            <TableRow key={4}>
              <TableCell className={styles.cell} component="th" scope="row">Age</TableCell>
              <TableCell className={styles.cell} align="right">{profile_data.age} y.o.</TableCell>
            </TableRow>
            <TableRow key={5}>
              <TableCell className={styles.cell} component="th" scope="row">Date of birth</TableCell>
              <TableCell className={styles.cell} align="right">{profile_data.dob}</TableCell>
            </TableRow>
          </TableBody>
          <caption>
            Last updated: {profile_data.last_updated}
          </caption>
        </Table>
      </TableContainer>
  </Paper>
  );
}

export default Profile;



