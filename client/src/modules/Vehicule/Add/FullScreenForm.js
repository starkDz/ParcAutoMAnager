import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Container,
  Fab,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import DescriptionIcon from '@material-ui/icons/Description';
import clsx from 'clsx';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { url } from '../../../defaults/default';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Cookies from 'universal-cookie';

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckMoving } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { setAlert } from './../../../actions/alert';

import InputMask from 'react-input-mask';
axios.defaults.baseURL = url;
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  fateh: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(4),
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const FullScreenDialog = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [formData, setFormData] = React.useState({});
  const {
    driver,
    marque,
    model,
    observation,
    kilometrage,
    categorie,
    matricule,
    dateMiseEnService,
    numeroSerie,
    couleur,
    carburant,
  } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const send = async (e) => {
    e.preventDefault();
    const element = {
      driver,
      marque,
      model,
      observation,
      kilometrage,
      categorie,
      matricule,
      dateMiseEnService,
      numeroSerie,
      couleur,
      carburant,
    };

    try {
      const cookies = new Cookies();
      const body = JSON.stringify(element);
      const res = await axios
        .post('/api/vehicule', body, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'x-auth-token': cookies.get('token'),
          },
        })
        .then((response) => {
          props.sendData(
            marque,
            model,
            kilometrage,
            categorie,
            matricule,
            dateMiseEnService,
            response.data._id
          );
          // if (sexe == 'Homme') props.changeStates(1, 1, 0);
          // else props.changeStates(1, 0, 1);
          setOpen(false);
          props.setAlert('La mise a jours a ete faite avec Success', 'success');
        })
        .catch((error) =>
          props.setAlert("La mise a jours n'a pas eu lieu", 'error')
        );
    } catch (err) {
      props.setAlert("La mise a jours n'a pas eu lieu", 'error');
    }
  };
  return (
    <div>
      <Fab
        onClick={handleClickOpen}
        variant='extended'
        color='primary'
        aria-label='Ajouter une vehicule'
        className={classes.fateh}
      >
        <AddIcon />
        Ajouter une nouvelle vehicule
        <FontAwesomeIcon icon={faTruckMoving} size='2x' pull='right' />
      </Fab>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Ajouter une nouvelle vehicule
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <div className={classes.root} lg={5}>
            <div className={classes.toolbar} />
            <Grid container spacing={2}>
              <Grid container justify='center'>
                <FontAwesomeIcon
                  icon={faTruckMoving}
                  size='8x'
                  color='#3f51b5'
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={7}></Grid>
              <Grid item xs={12} sm={12} lg={5}>
                <FormControl
                  variant='outlined'
                  margin='normal'
                  className={classes.formControl}
                  style={{ minWidth: '100%' }}
                >
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Chauffeur
                  </InputLabel>
                  <Select
                    label='Chauffeur'
                    name='driver'
                    value={driver}
                    onChange={(e) => onChange(e)}
                  >
                    <MenuItem value='O+'>O+</MenuItem>
                    <MenuItem value='O-'>O-</MenuItem>
                    <MenuItem value='A+'>A+</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={4}>
                <FormControl
                  variant='outlined'
                  margin='normal'
                  className={classes.formControl}
                  style={{ minWidth: '100%' }}
                >
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Marque
                  </InputLabel>
                  <Select
                    label='Marque'
                    name='marque'
                    value={marque}
                    onChange={(e) => onChange(e)}
                  >
                    <MenuItem value='PEUGEOT'>PEUGEOT</MenuItem>
                    <MenuItem value='RENAULT'>RENAULT</MenuItem>
                    <MenuItem value='MERCEDES'>MERCEDES</MenuItem>
                    <MenuItem value='SONACOM'>SONACOM</MenuItem>
                    <MenuItem value='SHACMANN'>SHACMANN</MenuItem>
                    <MenuItem value='SEAT'>SEAT</MenuItem>
                    <MenuItem value='AUDI'>AUDI</MenuItem>
                    <MenuItem value='FIAT'>FIAT</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={4}>
                <FormControl
                  variant='outlined'
                  margin='normal'
                  className={classes.formControl}
                  style={{ minWidth: '100%' }}
                >
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Model
                  </InputLabel>
                  <Select
                    label='Model'
                    name='model'
                    value={model}
                    onChange={(e) => onChange(e)}
                  >
                    <MenuItem value='206'>206</MenuItem>
                    <MenuItem value='207'>207</MenuItem>
                    <MenuItem value='c220'>c220</MenuItem>
                    <MenuItem value='IBIZA'>IBIZA</MenuItem>
                    <MenuItem value='LEAON'>LEAON</MenuItem>
                    <MenuItem value='CLIO4'>CLIO4</MenuItem>
                    <MenuItem value='FLUENCE'>FLUENCE</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={4}>
                <FormControl
                  variant='outlined'
                  margin='normal'
                  className={classes.formControl}
                  style={{ minWidth: '100%' }}
                >
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Categorie
                  </InputLabel>
                  <Select
                    label='Categorie'
                    name='categorie'
                    value={categorie}
                    onChange={(e) => onChange(e)}
                  >
                    <MenuItem value='Remorque'>Remorque</MenuItem>
                    <MenuItem value='10Tone'>10Tone</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={4}>
                <InputMask
                  mask='9999 999 99'
                  value={matricule}
                  onChange={(e) => onChange(e)}
                  maskChar='_'
                >
                  {() => (
                    <TextField
                      label='Matricule'
                      placeholder='Matricule'
                      helperText=''
                      fullWidth
                      name='matricule'
                      margin='normal'
                      variant='outlined'
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <TextField
                  label='Numero de Serie'
                  placeholder='Numero de Serie'
                  helperText=''
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  name='numeroSerie'
                  value={numeroSerie}
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={4}>
                <FormControl
                  variant='outlined'
                  margin='normal'
                  className={classes.formControl}
                  style={{ minWidth: '100%' }}
                >
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Carburant
                  </InputLabel>
                  <Select
                    label='Carburant'
                    name='carburant'
                    value={carburant}
                    onChange={(e) => onChange(e)}
                  >
                    <MenuItem value='Diesel'>Diesel</MenuItem>
                    <MenuItem value='Essence'>Essence</MenuItem>
                    <MenuItem value='Sans Plomb'>Sans Plomb</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={4}>
                <FormControl
                  variant='outlined'
                  margin='normal'
                  className={classes.formControl}
                  style={{ minWidth: '100%' }}
                >
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Couleur
                  </InputLabel>
                  <Select
                    label='Couleur'
                    name='couleur'
                    value={couleur}
                    onChange={(e) => onChange(e)}
                  >
                    <MenuItem value='Noire'>Noire</MenuItem>
                    <MenuItem value='Blanc'>Blanc</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <TextField
                  placeholder='Date Mise en Service'
                  margin='normal'
                  helperText='Date Mise en Service'
                  fullWidth
                  type='date'
                  name='dateMiseEnService'
                  value={dateMiseEnService}
                  onChange={(e) => onChange(e)}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={4}>
                <TextField
                  label='Kilomertage'
                  placeholder='Kilomertage'
                  helperText=''
                  fullWidth
                  type='number'
                  margin='normal'
                  variant='outlined'
                  name='kilometrage'
                  value={kilometrage}
                  onChange={(e) => onChange(e)}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={12}>
                <TextField
                  label='Observation'
                  placeholder='Observation'
                  helperText=''
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  name='observation'
                  value={observation}
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={10}>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  onClick={send}
                >
                  Enregistrer la Vehicule
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Dialog>
    </div>
  );
};

FullScreenDialog.propTypes = {
  setAlert: PropTypes.func.isRequired,
};
export default connect(null, { setAlert })(FullScreenDialog);
