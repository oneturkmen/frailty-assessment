import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  frailtyPaper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: '60em',
    backgroundColor: '#fafafa'
  },
}));


function FrailtyScore() {
  const styles = useStyles();

  // FIXME: get from the server
  const patient_full_name = "John Doe";
  const frailty_score = "non-frail";

  // HTML wrapper around the score
  let html_fscore;

  if (frailty_score === "frail") {
    html_fscore = <font color="#f50057"><strong>frail</strong></font>;
  }
  else if (frailty_score === "pre-frail") {
    html_fscore = <font color="#ffc107"><strong>pre-frail</strong></font>;
  }
  else if (frailty_score === "non-frail") {
    html_fscore = <font color="#26a69a"><strong>healthy</strong></font>;
  }

  return (
    <Paper 
      className={styles.frailtyPaper}
      elevation={1}>
      <Typography variant="h5" align="center" gutterBottom>
        {patient_full_name}'s frailty status:
      </Typography>
      <Typography variant="h3" align="center" gutterBottom>
        {html_fscore}
      </Typography>
    </Paper>
  );
}

export default FrailtyScore;



