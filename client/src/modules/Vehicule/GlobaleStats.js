import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { Provider, connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { url } from '../../defaults/default';
import GridItem from '../../components/Grid/GridItem.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardIcon from '../../components/Card/CardIcon.js';
import CardFooter from '../../components/Card/CardFooter.js';
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckMoving, faTools } from '@fortawesome/free-solid-svg-icons';
const useStyles = makeStyles(styles);
const GlobalStats = () => {
  const classes = useStyles();
  const [countData, setCountData] = React.useState({
    NumberRendezVous: 0,
    NumberPatient: 0,
    NumberRendezVousValide: 0,
  });

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(url + '/api/stats/getCount')
        .then((response) => {
          setCountData({
            NumberRendezVous: response.data.NumberRendezVous,
            NumberPatient: response.data.NumberPatient,
            NumberRendezVousValide: response.data.NumberRendezVousValide,
          });
        })
        .catch((error) => console.log(error.response));
    }
    fetchData();
  }, []);

  return (
    <Grid container spacing={0}>
      <GridItem xs={12} sm={12} md={12} lg={4}>
        <Card>
          <CardHeader color='danger' stats icon>
            <CardIcon color='danger'>
              <FontAwesomeIcon icon={faTruckMoving} size='4x' />
            </CardIcon>
            <p className={classes.cardCategory}>
              Nombre des Totale des Vehicules
            </p>
            <h1 className={classes.cardTitle}>{countData.NumberPatient}</h1>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}></div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={4} height={100}>
        <Card>
          <CardHeader color='info' stats icon>
            <CardIcon color='info'>
              <FontAwesomeIcon icon={faTruckMoving} size='4x' />
            </CardIcon>
            <p className={classes.cardCategory}>Nombre des Vehicules Libres</p>
            <h1 className={classes.cardTitle}>{countData.NumberRendezVous}</h1>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}></div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={4}>
        <Card>
          <CardHeader color='warning' stats icon>
            <CardIcon color='warning'>
              <FontAwesomeIcon icon={faTools} size='4x' />
            </CardIcon>
            <p className={classes.cardCategory}>
              Nombre des Vehicules en panne
            </p>
            <h1 className={classes.cardTitle}>
              {countData.NumberRendezVousValide}
            </h1>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}></div>
          </CardFooter>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default GlobalStats;
