import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AssessmentIcon from '@material-ui/icons/Assessment';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: '16 px',
  },
  fullList: {
    width: 'auto',
  },
});

export default function Sidebar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const mainList = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/',
    },
    {
      text: 'Measurements',
      icon: <AssessmentIcon />,
      path: '/services/measurements',
    },
    {
      text: 'Activity',
      icon: <FitnessCenterIcon />,
      path: '/services/activity',
    },
    {
      text: 'Calories',
      icon: <WhatshotIcon />,
      path: '/services/calories',
    },
  ];
  
  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={handleDrawerClose}>
      <List>
        {mainList.map((li) => (
          <ListItem button key={li.text} component={NavLink} to={li.path} exact>
            <ListItemIcon>{ li.icon }</ListItemIcon>
            <ListItemText primary={li.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        onClick={handleDrawerOpen}
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={handleDrawerClose}>
        { sideList() }
      </Drawer>
    </div>
  );
}