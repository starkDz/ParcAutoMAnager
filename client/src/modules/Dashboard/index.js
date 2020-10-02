import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import GlobalStats from './GlobaleStats';
const Dashboard = () => (
  <div>
    <GlobalStats />
  </div>
);

export default {
  routeProps: {
    path: '/Dashboard',
    component: Dashboard,
  },

  name: 'Dashboard',
  icon: <HomeIcon fontSize='large' />,
};
