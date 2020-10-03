import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: 10,
  },
}));
export default function Loading_Item() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Grid container justify='center' spacing={2}>
        <Grid key='2' item xs={12}>
          <Skeleton variant='text' height={150} animation='wave' />
        </Grid>
      </Grid>
      <Grid container justify='center' spacing={2}>
        <Grid key='2' item xs={12}>
          <Skeleton variant='text' height={100} animation='pulse' />
        </Grid>
      </Grid>
      <Grid container justify='center' spacing={2}>
        <Grid key='2' item xs={12}>
          <Skeleton variant='text' height={50} />
        </Grid>
      </Grid>
      <Grid container justify='center' spacing={2}>
        <Grid key='2' item xs={12}>
          <Skeleton variant='text' height={50} />
        </Grid>
      </Grid>
      <Grid container justify='center' spacing={2}>
        <Grid key='2' item xs={12}>
          <Skeleton variant='text' height={50} />
        </Grid>
      </Grid>
      <Grid container justify='center' spacing={2}>
        <Grid key='2' item xs={12}>
          <Skeleton variant='text' height={50} />
        </Grid>
      </Grid>
    </Paper>
  );
}
