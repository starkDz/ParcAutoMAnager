import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Loading_Item from './Loading_Item';
import AddBox from '@material-ui/icons/AddBox';
import PropTypes from 'prop-types';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import MaterialTable from 'material-table';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { url } from '../../defaults/default';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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
import { Icon, InlineIcon } from '@iconify/react';
import iRegistration from '@iconify/icons-medical-icon/i-registration';
import { connect } from 'react-redux';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import { setAlert } from './../../actions/alert';
import { loadCollections } from './../../actions/setStates';
import VerticalLinearStepper from './Update/FormContent';
import FullScreenDialog from './Add/FullScreenForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faListAlt,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
const tableIcons = {
  Add: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <AddBox {...props} ref={ref} />
  )),
  Check: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Check {...props} ref={ref} />
  )),
  Clear: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Clear {...props} ref={ref} />
  )),
  Delete: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <DeleteOutline {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Edit {...props} ref={ref} />
  )),
  Export: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <SaveAlt {...props} ref={ref} />
  )),
  Filter: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <FilterList {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <FirstPage {...props} ref={ref} />
  )),
  LastPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <LastPage {...props} ref={ref} />
  )),
  NextPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ChevronRight {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Clear {...props} ref={ref} />
  )),
  Search: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Search {...props} ref={ref} />
  )),
  SortArrow: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ArrowUpward {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Remove {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ViewColumn {...props} ref={ref} />
  )),
};
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    padding: theme.spacing(5, 30),
  },
}));
class Call_Api extends Component {
  constructor(props) {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      secondary: false,
      dense: false,
      selectedRow: null,
      open: false,
      rowIndex: 0,
      openDossier: false,
      openUpdate: false,
      opensnack: false,
      Title: 'Liste des Vehicules',
      a: null,
    };

    this.DeleteThis = this.DeleteThis.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getUpdatedData = this.getUpdatedData.bind(this);
    this.getNewData = this.getNewData.bind(this);

    this.handleClickOpenDossier = this.handleClickOpenDossier.bind(this);
    this.handleCloseDossier = this.handleCloseDossier.bind(this);
    this.handleCloseUpdate = this.handleCloseUpdate.bind(this);
    this.handleClickOpenUpdate = this.handleClickOpenUpdate.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }
  updateItem = (
    index,
    marque,
    model,
    kilometrage,
    categorie,
    matricule,
    dateMiseEnService
  ) => {
    const newItems = this.state.items;
    newItems[index].marque = marque;
    newItems[index].model = model;
    newItems[index].kilometrage = kilometrage;
    newItems[index].categorie = categorie;
    newItems[index].matricule = matricule;
    newItems[index].dateMiseEnService = dateMiseEnService;
    this.setState({ ...this.state, items: newItems });
    // console.log(newItems);
  };
  getNewData = (
    marque,
    model,
    kilometrage,
    categorie,
    matricule,
    dateMiseEnService,
    id
  ) => {
    // console.log(this.state.items);
    // do not forget to bind getData in constructor
    const newItems = [
      {
        marque: marque,
        model: model,
        kilometrage: kilometrage,
        categorie: categorie,
        matricule: matricule,
        dateMiseEnService: dateMiseEnService,
        _id: id,
      },
    ];
    this.setState({
      ...this.state,
      items: newItems.concat(this.state.items),
    });
  };
  getUpdatedData = (
    marque,
    model,
    kilometrage,
    categorie,
    matricule,
    dateMiseEnService,
    index
  ) => {
    this.updateItem(
      index,
      marque,
      model,
      kilometrage,
      categorie,
      matricule,
      dateMiseEnService
    );
    this.handleCloseUpdate();
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      opensnack: false,
    });
  };

  handleClickOpenDossier() {
    this.setState({
      openDossier: true,
    });
  }

  handleCloseDossier() {
    this.setState({
      openDossier: false,
    });
  }
  handleClickOpenUpdate() {
    this.setState({
      openUpdate: true,
    });
  }

  handleCloseUpdate() {
    this.setState({
      openUpdate: false,
    });
  }
  async DeleteThis(id, index, sexe) {
    try {
      const cookie = new Cookies();
      await axios.delete(url + '/api/vehicule/' + id, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      this.props.setAlert('Suppression a ete fait avec Success ', 'success');
      this.props.loadCollections(-1, 'addVehiculeNumber');
      const { items } = this.state;
      items.splice(index, 1);
      this.setState({ items });
    } catch {
      this.props.setAlert('Erreur lors de la suppression', 'error');
    }
  }
  async componentDidMount() {
    const cookie = new Cookies();
    fetch(url + '/api/vehicule')
      .then((response) => response.json())
      .then(
        (res) => {
          this.setState({
            isLoaded: true,
            items: res,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const {
      error,
      isLoaded,
      items,
      Title,
      opensnack,
      msg,
      type,
      rowIndex,
      number,
      openUpdate,
      id,
    } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div style={{ padding: 15 }}>
          <Loading_Item />
        </div>
      );
    } else {
      return (
        <div style={{ padding: 15 }}>
          <Snackbar
            open={opensnack}
            autoHideDuration={2000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity={type}>
              {msg}
            </Alert>
          </Snackbar>
          <MaterialTable
            icons={tableIcons}
            title={Title}
            columns={[
              {
                title: 'Marque',
                field: 'marque',
                width: '10%',
              },
              { title: 'Model', field: 'model', width: '10%' },
              { title: 'Kilometrage', field: 'kilometrage', width: '10%' },
              {
                title: 'Matricule',
                field: 'matricule',
                width: '10%',
              },
              {
                title: 'Categorie',
                field: 'categorie',
                width: '20%',
              },
              {
                title: 'date de mise en service',
                field: 'dateMiseEnService',
                width: '20%',
              },
              {
                title: "date expiration d'assurance",
                field: 'address',
                width: '20%',
              },
            ]}
            data={items}
            actions={[
              {
                icon: () => <FontAwesomeIcon icon={faEdit} color='green' />,
                tooltip: 'Edit Vehicule',
                onClick: (event, rowData) => {
                  this.setState({
                    id: rowData._id,
                    rowIndex: rowData.tableData.id,
                  });
                  this.handleClickOpenUpdate();
                },
              },
              {
                icon: () => <DeleteIcon color='secondary' />,
                tooltip: 'Delete Vehicule',
                onClick: (event, rowData) =>
                  this.DeleteThis(
                    rowData._id,
                    rowData.tableData.id,
                    rowData.sexe
                  ),
              },
              {
                icon: () => (
                  <FontAwesomeIcon icon={faQuestionCircle} color='#3f51b5' />
                ),
                tooltip: 'Afficher les Details',
                onClick: (event, rowData) => {
                  this.setState({ id: rowData._id });
                  this.handleClickOpenDossier();
                },
              },
            ]}
            onRowClick={(evt, selectedRow) => this.setState({ selectedRow })}
            options={{
              exportButton: true,
              pageSize: 20,
              pageSizeOptions: [5, 10, 20, 50, 100],
              sorting: true,
              rowStyle: (rowData) => ({
                backgroundColor: this.state.selectedRow,
              }),
              headerStyle: {
                backgroundColor: '#3f51b5',
                color: '#FFF',
              },
            }}
          />

          <FullScreenDialog sendData={this.getNewData} />
          <Dialog
            fullScreen
            open={openUpdate}
            onClose={this.handleCloseUpdate}
            TransitionComponent={Transition}
          >
            <AppBar
              style={{
                position: 'relative',
              }}
            >
              <Toolbar>
                <IconButton
                  edge='start'
                  color='inherit'
                  onClick={this.handleCloseUpdate}
                  aria-label='close'
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  variant='h6'
                  style={{
                    flex: 1,
                  }}
                >
                  Modifier les informations du Vehicule
                </Typography>
              </Toolbar>
            </AppBar>
            <VerticalLinearStepper
              sendData={this.getUpdatedData}
              identifier={id}
              index={rowIndex}
            />
          </Dialog>
        </div>
      );
    }
  }
}
Call_Api.propTypes = {
  setAlert: PropTypes.func.isRequired,
  loadCollections: PropTypes.func.isRequired,
};
export default connect(null, { loadCollections, setAlert })(Call_Api);
