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
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
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

  const [formData, setFormData] = React.useState({
    nom: '',
    prenom: '',
    address: '',
    telephone: '',
    observation: '/',
    sexe: '',
    dateNaissance: '',
    groupage: '',
    embauche: '',
    telephone2: '',
    permis: '',
  });

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(url + '/api/chauffeur/ById/' + props.identifier)
        .then((response) => {
          console.log(response);
          setFormData({
            ...formData,
            nom: response.data.nom,
            prenom: response.data.prenom,
            address: response.data.address,
            observation: response.data.observation,
            sexe: response.data.sexe,
            groupage: response.data.groupage,
            telephone: response.data.telephone,
            telephone: response.data.telephone,
            embauche: response.data.embauche.substr(0, 10),
            permis: response.data.permis,
            dateNaissance: response.data.dateNaissance.substr(0, 10),
          });
        })
        .catch((error) => console.log(error.response));
    }
    fetchData();
  }, []);

  const {
    nom,
    prenom,
    sexe,
    address,
    telephone,
    observation,
    dateNaissance,
    groupage,
    embauche,
    telephone2,
    permis,
  } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const send = async (e) => {
    e.preventDefault();
    const element = {
      nom,
      prenom,
      sexe,
      address,
      telephone,
      observation,
      dateNaissance,
      groupage,
      embauche,
      telephone2,
      permis,
    };

    try {
      const cookies = new Cookies();
      const body = JSON.stringify(element);
      const res = await axios
        .post('/api/chauffeur/update/' + props.identifier, body, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'x-auth-token': cookies.get('token'),
          },
        })
        .then((response) => {
          props.sendData(
            nom,
            prenom,
            address,
            telephone,
            sexe,
            permis,
            embauche,
            props.index
          );
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
    <div className={classes.root} lg={5}>
      {/* <div className={classes.toolbar} /> */}
      <Grid container justify='left' spacing={2}>
        <Grid container justify='center' xs={12} sm={12} lg={12}>
          <FontAwesomeIcon icon={faIdCard} size='8x' color='#3f51b5' />
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <TextField
            label='Nom'
            placeholder='Nom'
            helperText=''
            fullWidth
            margin='normal'
            variant='outlined'
            name='nom'
            value={nom}
            onChange={(e) => onChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <TextField
            label='Prenom'
            placeholder='Prenom'
            helperText=''
            fullWidth
            margin='normal'
            variant='outlined'
            name='prenom'
            value={prenom}
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
            <InputLabel id='demo-simple-select-outlined-label'>Sexe</InputLabel>
            <Select
              label='Sexe'
              name='sexe'
              value={sexe}
              onChange={(e) => onChange(e)}
            >
              <MenuItem value='Homme'>Homme</MenuItem>
              <MenuItem value='Femme'>Femme</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={4}>
          <TextField
            placeholder='Date Naissance'
            margin='normal'
            helperText='Date Naissance'
            fullWidth
            type='date'
            name='dateNaissance'
            // value='2017-05-24'
            value={dateNaissance}
            onChange={(e) => onChange(e)}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <InputMask
            mask='(0)999 99 99 99'
            value={telephone}
            onChange={(e) => onChange(e)}
            maskChar='_'
          >
            {() => (
              <TextField
                label='Numero de telephone'
                placeholder='Numero de telephone'
                helperText=''
                fullWidth
                name='telephone'
                margin='normal'
                variant='outlined'
              />
            )}
          </InputMask>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <InputMask
            mask='(0)999 99 99 99'
            value={telephone2}
            onChange={(e) => onChange(e)}
            maskChar='_'
          >
            {() => (
              <TextField
                label='Numero de telephone N*2'
                placeholder='Numero de telephone N*2'
                helperText=''
                fullWidth
                name='telephone2'
                margin='normal'
                variant='outlined'
              />
            )}
          </InputMask>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <FormControl
            variant='outlined'
            margin='normal'
            className={classes.formControl}
            style={{ minWidth: '100%' }}
          >
            <InputLabel id='demo-simple-select-outlined-label'>
              Group Sanguin
            </InputLabel>
            <Select
              label='Group Sanguin'
              name='groupage'
              value={groupage}
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
          <TextField
            label='Numero de Permis de conduite'
            placeholder='Numero de Permis de conduite'
            helperText=''
            fullWidth
            margin='normal'
            variant='outlined'
            name='permis'
            value={permis}
            onChange={(e) => onChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <TextField
            placeholder="Date d'Embauche"
            margin='normal'
            helperText="Date d'Embauche"
            fullWidth
            type='date'
            name='embauche'
            value={embauche}
            onChange={(e) => onChange(e)}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            label='Address'
            placeholder='Address'
            helperText=''
            fullWidth
            margin='normal'
            variant='outlined'
            name='address'
            value={address}
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
            Valider la mise a jour du chauffeur
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
