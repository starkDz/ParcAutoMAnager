import React from 'react';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import GlobalStats from './GlobaleStats';
const Mission = () => (
  <div>
    <GlobalStats />
  </div>
);

export default {
  routeProps: {
    path: '/Mission',
    component: Mission,
  },

  name: 'Mission',
  icon: <CardTravelIcon fontSize='large' />,
};
