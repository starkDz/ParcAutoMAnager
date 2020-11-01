import React, { useEffect } from 'react';
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
import { loadCollections } from './../../../actions/setStates';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

import PostAddIcon from '@material-ui/icons/PostAdd';
import Drawer from '@material-ui/core/Drawer';
import InputMask from 'react-input-mask';
axios.defaults.baseURL = url;
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  myRoot: {
    width: '100%',

    padding: theme.spacing(5, 5),
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
  const [state, setState] = React.useState({
    open: false,
    right: false,
    couleur: false,
    categorie: false,
    marque: false,
    carburant: false,
    model: false,
  });
  const handleCloseAdd = (e) => {
    setState({ ...state, open: false, right: false });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [formData, setFormData] = React.useState({});
  const {
    description_Fr,
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
  const addCategorie = (e) => {
    props.setAlert('Add new Categorie', 'info');
  };
  const addMarque = (e) => {
    toggleDrawer('right', true);

    props.setAlert('Add new Brand', 'info');
  };
  const addModel = (e) => {
    props.setAlert('Add new Model', 'info');
  };
  const addColor = (e) => {
    toggleDrawer('right', true);
    props.setAlert('Add new Color', 'info');
  };
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const sendValue = async (e, val) => {
    e.preventDefault();
    // console.log(val);
    const element = { description_Fr };
    try {
      const cookies = new Cookies();
      const body = JSON.stringify(element);
      const res = await axios
        .post('/api/' + val, body, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            // 'x-auth-token': cookies.get('token'),
          },
        })
        .then((res) => {
          // if (sexe == 'Homme') props.changeStates(1, 1, 0);
          // else props.changeStates(1, 0, 1);
          props.loadCollections(res.data, 'addTo' + val);
          props.setAlert('L ajout a ete fait avec Success', 'success');
          setFormData({ ...formData, description_Fr: '' });
        })
        .catch((error) =>
          props.setAlert("L ajout n'a pas eu lieu ..", 'error')
        );
    } catch (err) {
      props.setAlert("L ajout n'a pas eu lieu ...", 'error');
    }
  };

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
          props.loadCollections(1, 'addVehiculeNumber');
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
          props.setAlert('L ajout a ete fait avec Success', 'success');
        })
        .catch((error) => props.setAlert("L ajout n'a pas eu lieu", 'error'));
    } catch (err) {
      props.setAlert("L ajout n'a pas eu lieu", 'error');
    }
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, open: true, [anchor]: open });
  };
  const list = (anchor) => (
    <div role='presentation' className={classes.myRoot}>
      <div className={classes.toolbar} />
      <Grid container spacing={2}>
        <Grid container justify='center'>
          <PostAddIcon style={{ width: 110, height: 110 }} color='primary' />
        </Grid>
        {anchor == 'model' ? (
          <Grid item xs={12} sm={12} lg={12}>
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
                {props.Marque &&
                  props.Marque.map((option) => (
                    <MenuItem
                      key={option.description_Fr}
                      value={option.description_Fr}
                    >
                      {option.description_Fr}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        ) : null}

        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            label='Nouveau Element'
            placeholder='Nouveau Element'
            helperText=''
            fullWidth
            margin='normal'
            variant='outlined'
            name='description_Fr'
            value={description_Fr}
            onChange={(e) => onChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <Button
            variant='contained'
            size='large'
            fullWidth
            color='primary'
            name={anchor}
            onClick={(e) => sendValue(e, anchor)}
          >
            Ajouter {anchor}
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <Button
            variant='contained'
            fullWidth
            size='large'
            color='secondary'
            onClick={toggleDrawer('right', false)}
          >
            Annuler
          </Button>
        </Grid>
      </Grid>
    </div>
  );
  useEffect(() => {
    // setFormData({ ...formData, Chauffeurs: props.Chauffeur });
    // console.log(props);
  }, []);
  // const Chauffeurs = props.Chauffeur;
  return (
    <div>
      <div>
        {['carburant', 'categorie', 'marque', 'couleur', 'model'].map(
          (anchor) => (
            <React.Fragment key={anchor}>
              <Drawer
                anchor='right'
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          )
        )}
      </div>
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
                    {props.Chauffeur &&
                      props.Chauffeur.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.nom + ' ' + option.prenom}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={3}>
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
                    {props.Marque &&
                      props.Marque.map((option) => (
                        <MenuItem
                          key={option.description_Fr}
                          value={option.description_Fr}
                        >
                          {option.description_Fr}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={1}>
                <IconButton
                  edge='start'
                  color='secondary'
                  onClick={toggleDrawer('marque', true)}
                  margin='normal'
                >
                  <ControlPointIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12} lg={3}>
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
                    {marque &&
                      props.Marque.map((option) =>
                        option.description_Fr != marque
                          ? null
                          : option.models.map((model) => (
                              <MenuItem
                                key={model.description_Fr}
                                value={model.description_Fr}
                              >
                                {model.description_Fr}
                              </MenuItem>
                            ))
                      )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={1}>
                <IconButton
                  edge='start'
                  margin='normal'
                  onClick={toggleDrawer('model', true)}
                  color='secondary'
                >
                  <ControlPointIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12} lg={3}>
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
                    {props.Categorie &&
                      props.Categorie.map((option) => (
                        <MenuItem
                          key={option.description_Fr}
                          value={option.description_Fr}
                        >
                          {option.description_Fr}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={1}>
                <IconButton
                  edge='start'
                  color='secondary'
                  margin='normal'
                  onClick={toggleDrawer('categorie', true)}
                >
                  <ControlPointIcon />
                </IconButton>
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
              <Grid item xs={12} sm={12} lg={3}>
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
                    {props.Carburant &&
                      props.Carburant.map((option) => (
                        <MenuItem
                          key={option.description_Fr}
                          value={option.description_Fr}
                        >
                          {option.description_Fr}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={1}>
                <IconButton
                  edge='start'
                  onClick={toggleDrawer('carburant', true)}
                  color='secondary'
                  margin='normal'
                >
                  <ControlPointIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12} lg={3}>
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
                    {props.Couleur &&
                      props.Couleur.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.description_Fr}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={1}>
                <IconButton
                  edge='start'
                  onClick={toggleDrawer('couleur', true)}
                  color='secondary'
                  margin='normal'
                >
                  <ControlPointIcon />
                </IconButton>
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
  loadCollections: PropTypes.func.isRequired,
};

const mapStateProps = (state) => {
  return {
    Chauffeur: state.rootReducer.Chauffeur,
    Marque: state.rootReducer.Marque,
    Categorie: state.rootReducer.Categorie,
    Couleur: state.rootReducer.Couleur,
    Carburant: state.rootReducer.Carburant,
  };
};
export default connect(mapStateProps, { loadCollections, setAlert })(
  FullScreenDialog
);
