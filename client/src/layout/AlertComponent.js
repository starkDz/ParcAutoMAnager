import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';
function MyApp(props) {
  const { enqueueSnackbar } = useSnackbar();
  const variant = props.type;
  // variant could be success, error, warning, info, or default
  enqueueSnackbar(props.message, { variant });
  return null;
}
export default function DescriptionAlerts(props) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp type={props.type} message={props.msg} />
    </SnackbarProvider>
  );
}
