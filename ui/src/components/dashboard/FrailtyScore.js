import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Grid,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  frailtyPaper: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    maxWidth: 'auto',
    backgroundColor: '#fafafa',
  },
}));


function FrailtyScore(props) {
  const styles = useStyles();

  const { data, period } = props;

  // FIXME: get from the server
  const patient_full_name = "John Doe";

  const names = {
    'hr': 'Heart Rate',
    'bp': 'Blood Pressure',
    'steps': 'Steps',
    'calories': 'Calories',
    'weight': 'Weight',
  }

  // HTML wrapper around the score
  let html_fscore;

  if (data['frailty_score'] >= 3) {
    html_fscore = <font color="#f50057"><strong>frail</strong></font>;
  }
  else if (data['frailty_score'] >= 2) {
    html_fscore = <font color="#ffc107"><strong>pre-frail</strong></font>;
  }
  else if (data['frailty_score'] >= 0) {
    html_fscore = <font color="#26a69a"><strong>healthy</strong></font>;
  }

  return (
    <Paper 
      className={styles.frailtyPaper}
      elevation={1}>
      <Typography variant="h5" align="center" gutterBottom>
        Score for the past <strong>{period}</strong>
      </Typography>

      {/* Frailty Status */}
      <Typography variant="h4" align="center" gutterBottom>
        {html_fscore}
      </Typography>

      {/* Breakdown of frailty conditions */}
      <List>
        {Object.keys(data).map((okey, index) => {
          if (okey == 'frailty_score') return null;
          return (<ListItem key={index}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: 'white', border: 'solid 1px rgba(0,0,0,0.27)' }}>
                {data[okey] == 0 ? <CheckIcon style={{ color: 'green' }}/> : <ClearIcon style={{ color: 'red' }}/>}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={names[okey]}
            />
          </ListItem>);
        })}
      </List>
    </Paper>
  );
}

export default FrailtyScore;



