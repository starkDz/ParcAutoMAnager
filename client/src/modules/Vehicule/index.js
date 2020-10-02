import React from 'react';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import GlobalStats from './GlobaleStats';
const Vehicule = () => (
  <div>
    <GlobalStats />
  </div>
);

export default {
  routeProps: {
    path: '/Vehicule',
    component: Vehicule,
  },

  name: 'Vehicule',
  icon: <DirectionsCarIcon fontSize='large' />,
};
