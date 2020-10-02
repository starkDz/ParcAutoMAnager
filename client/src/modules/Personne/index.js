import React from 'react';
import GroupIcon from '@material-ui/icons/Group';
import GlobalStats from './GlobaleStats';
const Personne = () => (
  <div>
    <GlobalStats />
  </div>
);

export default {
  routeProps: {
    path: '/Personne',
    component: Personne,
  },

  name: 'Personne',
  icon: <GroupIcon fontSize='large' />,
};
