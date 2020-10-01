import React from 'react';
import HomeIcon from '@material-ui/icons/Home';

const Dashboard = () => <div></div>;

export default {
  routeProps: {
    path: '/Dashboard',
    component: Dashboard,
  },

  name: 'Dashboard',
  icon: <HomeIcon fontSize='large' />,
};
