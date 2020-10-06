import React from 'react';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import GlobalStats from './GlobaleStats';
import Call_Api from './ListeVehicule';
const Vehicule = () => (
  <div>
    <GlobalStats />
    <Call_Api />
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
