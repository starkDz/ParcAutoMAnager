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
        <Grid key='2' item xs={3}>
          <Skeleton variant='text' height={50} animation='wave' />
        </Grid>
        <Grid key='2' item xs={6}></Grid>
        <Grid key='2' item xs={3}>
          <Grid container justify='center' spacing={2}>
            <Grid key='2' item xs={10}>
              <Skeleton variant='text' height={50} animation='wave' />
            </Grid>
            <Grid key='2' item xs={2}>
              <Skeleton variant='text' height={50} animation='wave' />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify='center' spacing={2}>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={100} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={100} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={100} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={100} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={100} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={100} animation='pulse' />
        </Grid>
      </Grid>
      <Grid container justify='center' spacing={2}>
        <Grid key='2' item xs={4}>
          <Grid container justify='center' spacing={2}>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={9}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
          </Grid>
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
      </Grid>{' '}
      <Grid container justify='center' spacing={2}>
        <Grid key='2' item xs={4}>
          <Grid container justify='center' spacing={2}>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={9}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
          </Grid>
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
      </Grid>{' '}
      <Grid container justify='center' spacing={2}>
        <Grid key='2' item xs={4}>
          <Grid container justify='center' spacing={2}>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={9}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
          </Grid>
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
      </Grid>{' '}
      <Grid container justify='center' spacing={2}>
        <Grid key='2' item xs={4}>
          <Grid container justify='center' spacing={2}>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={9}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
          </Grid>
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
      </Grid>{' '}
      <Grid container justify='center' spacing={2}>
        <Grid key='2' item xs={4}>
          <Grid container justify='center' spacing={2}>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={9}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
          </Grid>
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
      </Grid>{' '}
      <Grid container justify='center' spacing={2}>
        <Grid key='2' item xs={4}>
          <Grid container justify='center' spacing={2}>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={9}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
          </Grid>
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
      </Grid>{' '}
      <Grid container justify='center' spacing={2}>
        <Grid key='2' item xs={4}>
          <Grid container justify='center' spacing={2}>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={1}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
            <Grid key='2' item xs={9}>
              <Skeleton variant='text' height={50} animation='pulse' />
            </Grid>
          </Grid>
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
        <Grid key='2' item xs={2}>
          <Skeleton variant='text' height={50} animation='pulse' />
        </Grid>
      </Grid>
    </Paper>
  );
}
