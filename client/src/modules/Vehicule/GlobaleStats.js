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
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckMoving, faTools } from '@fortawesome/free-solid-svg-icons';
const useStyles = makeStyles(styles);
const GlobalStats = (props) => {
  const classes = useStyles();

  // useEffect(() => {
  //   async function fetchData() {
  //   }
  //   fetchData();
  // }, []);
  const vehiculeFreeNumber = props.vehiculeFreeNumber;
  const vehiculeNumber = props.vehiculeNumber;
  const vehiculePanneNumber = props.vehiculePanneNumber;

  return (
    <Grid container spacing={0}>
      <GridItem xs={12} sm={4} md={4} lg={4}>
        <Card>
          <CardHeader color='danger' stats icon>
            <CardIcon color='danger'>
              <FontAwesomeIcon icon={faTruckMoving} size='4x' />
            </CardIcon>
            <p className={classes.cardCategory}>Nombre des Vehicules</p>
            <h1 className={classes.cardTitle}>{vehiculeNumber}</h1>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}></div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={4} md={4} lg={4}>
        <Card>
          <CardHeader color='info' stats icon>
            <CardIcon color='info'>
              <FontAwesomeIcon icon={faTruckMoving} size='4x' />
            </CardIcon>
            <p className={classes.cardCategory}>Vehicules Libres</p>
            <h1 className={classes.cardTitle}>{vehiculeFreeNumber}</h1>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}></div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={4} md={4} lg={4}>
        <Card>
          <CardHeader color='warning' stats icon>
            <CardIcon color='warning'>
              <FontAwesomeIcon icon={faTools} size='4x' />
            </CardIcon>
            <p className={classes.cardCategory}>Vehicules en panne</p>
            <h1 className={classes.cardTitle}>{vehiculePanneNumber}</h1>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}></div>
          </CardFooter>
        </Card>
      </GridItem>
    </Grid>
  );
};

const mapStateProps = (state) => {
  return {
    vehiculeFreeNumber: state.statistics.vehiculeFreeNumber,
    vehiculeNumber: state.statistics.vehiculeNumber,
    vehiculePanneNumber: state.statistics.vehiculePanneNumber,
  };
};
export default connect(mapStateProps, null)(GlobalStats);
