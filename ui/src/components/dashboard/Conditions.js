import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(1),
    backgroundColor: '#fafafa'
  },
  header: {
    paddingLeft: theme.spacing(2),
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
  listItemPrimary: {
    fontSize: '1.2em'
  },
  listItemSecondary: {
    fontSize: '1.05em'
  },
}));


function Conditions() {
  const styles = useStyles();

  const user_health_conditions = [
    {
      desc: 'Asthma',
      when: 'June 27, 2015',
    },
    {
      desc: 'Arthritis',
      when: 'December 15, 2018',
    },
    {
      desc: 'Gastritis',
      when: 'April 9, 2017',
    },
  ];

  return (
    <Paper className={styles.root}>
      <Typography align="left" className={styles.header} variant="h5">
        Health conditions
      </Typography>
      <List className={styles.list}>
        {user_health_conditions.map((cond) => {
          return (
          <ListItem key={cond.desc}>
            <ListItemText
              classes={{primary: styles.listItemPrimary, secondary: styles.listItemSecondary}} 
              primary={cond.desc} 
              secondary={"Since " + cond.when}/>
          </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}

export default Conditions;



