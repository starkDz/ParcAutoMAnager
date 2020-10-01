import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import DataGridDemo from './dataGrid';
import Grid from '@material-ui/core/Grid';
const Dashboard = () => (
  <Grid container>
    <DataGridDemo />
  </Grid>
);

export default {
  routeProps: {
    path: '/Dashboard',
    component: Dashboard,
  },

  name: 'Dashboard',
  icon: <HomeIcon fontSize='large' />,
};
