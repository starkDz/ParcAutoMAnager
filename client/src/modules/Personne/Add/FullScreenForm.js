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
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

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
  const [formData, setFormData] = React.useState({
    nom: '',
    prenom: '',
    address: '',
    telephone: '',
    observation: '/',
    telephone2: '',
    permis: '',
  });
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
      const res = await axios.post('/api/chauffeur', body, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'x-auth-token': cookies.get('token'),
        },
      });
      props.sendData(
        nom,
        prenom,
        address,
        telephone,
        sexe,
        permis,
        embauche,
        res.data._id
      );

      if (sexe == 'Homme') props.changeStates(1, 1, 0);
      else props.changeStates(1, 0, 1);
      setOpen(false);
      // setFormData({
      //   nom: '',
      //   prenom: '',
      //   address: '',
      //   telephone: '',
      //   observation: '/',
      //   dateNaissance: '',
      //   groupage: '',
      // });
    } catch (err) {}
  };
  return (
    <div>
      <Fab
        onClick={handleClickOpen}
        variant='extended'
        color='primary'
        aria-label='Ajouter un Chauffeur'
        className={classes.fateh}
      >
        <AddIcon />
        Ajouter un nouveau Chauffeur
        <FontAwesomeIcon icon={faUser} size='2x' pull='right' />
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
              Ajouter un Nouveau Chauffeur
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <div className={classes.root} lg={5}>
            <div className={classes.toolbar} />
            <Grid container spacing={2}>
              <Grid container justify='center'>
                <FontAwesomeIcon icon={faUser} size='8x' color='#3f51b5' />
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
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Sexe
                  </InputLabel>
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
                  Enregistrer le Chauffeur
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Dialog>
    </div>
  );
};

const mapDispatchProps = (dispatch) => {
  return {
    changeStates: (NumberPatient, NumberMen, NumberWomen) => {
      dispatch({
        type: 'addPatientStates',
        NumberPatient: NumberPatient,
        NumberWomen: NumberWomen,
        NumberMen: NumberMen,
      });
    },
  };
};
const mapStateProps = (state) => {
  return {};
};
export default connect(mapStateProps, mapDispatchProps)(FullScreenDialog);
