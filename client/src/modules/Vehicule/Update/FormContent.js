import React, { Component, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { url } from '../../../defaults/default';
import axios from 'axios';
import InputMask from 'react-input-mask';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { setAlert } from './../../../actions/alert';
import { connect } from 'react-redux';
import { faTruckMoving } from '@fortawesome/free-solid-svg-icons';
axios.defaults.baseURL = url;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    padding: theme.spacing(5, 30),
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
const VerticalLinearStepper = (props) => {
  const classes = useStyles();

  const [formData, setFormData] = React.useState({});

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(url + '/api/vehicule/ById/' + props.identifier)
        .then((response) => {
          console.log(response);
          setFormData({
            ...formData,
            marque: response.data.marque,
            model: response.data.model,
            matricule: response.data.matricule,
            dateMiseEnService: response.data.dateMiseEnService,
            kilometrage: response.data.kilometrage,
            categorie: response.data.categorie,
            couleur: response.data.couleur,
            numeroSerie: response.data.numeroSerie,
            observation: response.data.observation,
            carburant: response.data.carburant,
            driver: response.data.driver,
          });
        })
        .catch((error) => console.log(error.response));
    }
    fetchData();
  }, []);

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
        .post('/api/vehicule/update/' + props.identifier, body, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            // 'x-auth-token': cookies.get('token'),
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
            props.index
          );
          props.setAlert('La mise a jours a ete faite avec Success', 'success');
        })
        .catch((error) => {
          console.log(error);
          props.setAlert("La mise a jours n'a pas eu lieu", 'error');
        });
    } catch (err) {
      console.log(err);
      props.setAlert("La mise a jours n'a pas eu lieu", 'error');
    }
  };

  return (
    <div className={classes.root} lg={5}>
      {/* <div className={classes.toolbar} /> */}
      <Grid container spacing={2}>
        <Grid container justify='center'>
          <FontAwesomeIcon icon={faTruckMoving} size='8x' color='#3f51b5' />
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
              <MenuItem value='O+'>O+</MenuItem>
              <MenuItem value='O-'>O-</MenuItem>
              <MenuItem value='A+'>A+</MenuItem>
              <MenuItem value='A-'>A-</MenuItem>
              <MenuItem value='B+'>B+</MenuItem>
              <MenuItem value='B-'>B-</MenuItem>
              <MenuItem value='AB+'>AB+</MenuItem>
              <MenuItem value='AB-'>AB-</MenuItem>
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
              <MenuItem value='O+'>O+</MenuItem>
              <MenuItem value='O-'>O-</MenuItem>
              <MenuItem value='A+'>A+</MenuItem>
              <MenuItem value='A-'>A-</MenuItem>
              <MenuItem value='B+'>B+</MenuItem>
              <MenuItem value='B-'>B-</MenuItem>
              <MenuItem value='AB+'>AB+</MenuItem>
              <MenuItem value='AB-'>AB-</MenuItem>
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
              <MenuItem value='Homme'>Homme</MenuItem>
              <MenuItem value='Femme'>Femme</MenuItem>
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
              <MenuItem value='Homme'>Homme</MenuItem>
              <MenuItem value='Femme'>Femme</MenuItem>
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
              <MenuItem value='Homme'>Homme</MenuItem>
              <MenuItem value='Femme'>Femme</MenuItem>
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
            Valider la mise a jour de la Vehicule
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

VerticalLinearStepper.propTypes = {
  setAlert: PropTypes.func.isRequired,
};
export default connect(null, { setAlert })(VerticalLinearStepper);
