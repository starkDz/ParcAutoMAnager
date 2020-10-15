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
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
const useStyles = makeStyles(styles);
const GlobalStats = (props) => {
  const classes = useStyles();
  // useEffect(() => {
  //   async function fetchData() {}
  //   fetchData();
  // }, []);
  const chauffeurFreeNumber = props.chauffeurFreeNumber;
  const chauffeurNumber = props.chauffeurNumber;
  const chauffeurMissionNumber = props.chauffeurMissionNumber;
  return (
    <Grid container spacing={0}>
      <GridItem xs={12} sm={4} md={4} lg={4}>
        <Card>
          <CardHeader color='danger' stats icon>
            <CardIcon color='danger'>
              <FontAwesomeIcon icon={faUserTie} size='4x' />
            </CardIcon>
            <p className={classes.cardCategory}>Nombre des Chauffeurs</p>
            <h1 className={classes.cardTitle}>{chauffeurNumber}</h1>
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
              <FontAwesomeIcon icon={faUserTie} size='4x' />
            </CardIcon>
            <p className={classes.cardCategory}>Chauffeurs Libres</p>
            <h1 className={classes.cardTitle}>{chauffeurFreeNumber}</h1>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}></div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={4} md={4} lg={4}>
        <Card>
          <CardHeader color='success' stats icon>
            <CardIcon color='success'>
              <FontAwesomeIcon icon={faUserTie} size='4x' />
            </CardIcon>
            <p className={classes.cardCategory}>Chauffeurs en Mission</p>
            <h1 className={classes.cardTitle}>{chauffeurMissionNumber}</h1>
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
    chauffeurFreeNumber: state.statistics.chauffeurFreeNumber,
    chauffeurNumber: state.statistics.chauffeurNumber,
    chauffeurMissionNumber: state.statistics.chauffeurMissionNumber,
  };
};
export default connect(mapStateProps, null)(GlobalStats);
