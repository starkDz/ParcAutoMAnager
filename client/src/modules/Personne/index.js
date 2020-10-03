import React from 'react';
import GroupIcon from '@material-ui/icons/Group';
import GlobalStats from './GlobaleStats';
import Call_Api from './ListeChauffeur';
const Personne = () => (
  <div>
    <GlobalStats />
    <Call_Api />
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
