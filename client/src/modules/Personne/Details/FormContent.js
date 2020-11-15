import React, { Component, useEffect } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { url } from '../../../defaults/default';
import axios from 'axios';
import { IconButton, Fab, AppBar, Toolbar } from '@material-ui/core';
import InputMask from 'react-input-mask';
import CloseIcon from '@material-ui/icons/Close';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
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
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Drawer from '@material-ui/core/Drawer';
import { loadCollections } from './../../../actions/setStates';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import DirectionsIcon from '@material-ui/icons/Directions';
import ScrollableTabsButtonForce from './Tabs';

axios.defaults.baseURL = url;

const useStyles = makeStyles((theme) => ({
  root1: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  root: {
    width: '100%',
    padding: theme.spacing(5, 30),
  },
  myRoot: {
    width: '100%',

    padding: theme.spacing(5, 10),
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
const DetailsDialog = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    right: false,
  });
  const handleClose = (e) => {
    setState({ ...state, open: false, right: false });
  };
  const [formData, setFormData] = React.useState({
    description_Fr: '',
  });
  const sendValue = async (e, val) => {
    e.preventDefault();
  };
  useEffect(() => {
    async function fetchData() {}
    fetchData();
  }, []);

  const { description_Fr } = formData;

  const addModel = (e) => {
    props.setAlert('Add new Model', 'info');
  };
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const send = async (e) => {
    e.preventDefault();
    const element = {};

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
          props.sendData(props.index);
          props.setAlert('La mise a jours a ete faite avec Success', 'success');
        })
        .catch((error) => {
          // console.log(error);
          props.setAlert("La mise a jours n'a pas eu lieu", 'error');
        });
    } catch (err) {
      // console.log(err);
      props.setAlert("La mise a jours n'a pas eu lieu", 'error');
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
    </div>
  );
  return (
    <div>
      {/* <div className={classes.toolbar} /> */}
      <div>
        {['Assurance', 'Controle Technique', 'Panne', 'Vidange'].map(
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
      <ScrollableTabsButtonForce />
      <Grid container spacing={2}></Grid>
    </div>
  );
};

DetailsDialog.propTypes = {
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
  DetailsDialog
);
