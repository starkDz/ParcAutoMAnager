import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import {
  Menu,
  IconButton,
  InputBase,
  MenuItem,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  List,
  Typography,
  Toolbar,
  AppBar,
  CssBaseline,
  Drawer,
} from '@material-ui/core';
import axios from 'axios';
import { url } from './defaults/default';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';
import StorageIcon from '@material-ui/icons/Storage';
import LanguageIcon from '@material-ui/icons/Language';
import modules from './modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckMoving } from '@fortawesome/free-solid-svg-icons';
import SettingsIcon from '@material-ui/icons/Settings';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import Alert from './layout/alert';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 240,
      },
    },
  },
}));

const App = (props) => {
  const [currentTab, setCurrentTab] = useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [auth] = React.useState(true);
  const [anchorLanguage, setanchorLanguage] = React.useState(null);
  const [anchorLogin, setanchorLogin] = React.useState(null);
  const [openMenuLanguage, setopenMenuLanguage] = React.useState(false);
  const [openMenuLogin, setopenMenuLogin] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState();
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(url + '/api/chauffeur')
        .then((response) => {
          props.loadCollections(response.data, 'setAllChauffeur');
        })
        .catch((error) => console.log(error.response));
      await axios
        .get(url + '/api/couleur')
        .then((respons) => {
          props.loadCollections(respons.data, 'setAllCouleur');
        })
        .catch((error) => console.log(error.respons));
      await axios
        .get(url + '/api/categorie')
        .then((respon) => {
          props.loadCollections(respon.data, 'setAllCategorie');
        })
        .catch((error) => console.log(error.respon));
      await axios
        .get(url + '/api/carburant')
        .then((res) => {
          props.loadCollections(res.data, 'setAllCarburant');
        })
        .catch((error) => console.log(error.res));
      await axios
        .get(url + '/api/marque')
        .then((respo) => {
          props.loadCollections(respo.data, 'setAllMarque');
        })
        .catch((error) => console.log(error.response));
      await axios
        .get(url + '/api/statistics')
        .then((respo) => {
          props.loadCount(respo.data, 'setCount');
        })
        .catch((error) => console.log(error.response));
    }
    fetchData();
  }, []);
  function handleListItemClick(event, thisTab, index) {
    setSelectedIndex(index);
    setCurrentTab(thisTab);
  }
  function handleMenuLogin(event) {
    setanchorLogin(event.currentTarget);
    setopenMenuLogin(true);
  }

  function handleCloseLogin() {
    const cookie = new Cookies();
    cookie.remove('password');
    cookie.remove('token');
    cookie.remove('email');
    window.location.href = '/';
  }
  function handleVerr() {
    const cookie = new Cookies();
    cookie.remove('password');
    cookie.remove('token');
    window.location.reload();
  }
  function handleMenuLanguage(event) {
    setanchorLanguage(event.currentTarget);
    setopenMenuLanguage(true);
  }
  function handleCloseLanguage() {
    setanchorLanguage(null);
    setopenMenuLanguage(false);
  }
  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Alert />
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant='h6' noWrap>
              Gestion de Parc Automobile
            </Typography>
            <Typography className={classes.title} variant='h6' wrap='true'>
              {currentTab}
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Rechercher...'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            {auth && (
              <div>
                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenuLogin}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorLogin}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={openMenuLogin}
                  onClose={handleCloseLogin}
                >
                  <MenuItem key='1' onClick={handleCloseLogin}>
                    Profile
                  </MenuItem>
                  <MenuItem key='2' onClick={handleCloseLogin}>
                    Mon Compte
                  </MenuItem>
                  <MenuItem key='3' onClick={handleCloseLogin}>
                    Se Deconnecter
                  </MenuItem>
                  <MenuItem key='41' onClick={handleVerr}>
                    Verrouiller
                  </MenuItem>
                </Menu>
              </div>
            )}
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menus-appbar'
                aria-haspopup='true'
                color='inherit'
              >
                <SettingsIcon />
              </IconButton>
            </div>
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menus-appbar'
                aria-haspopup='true'
                color='inherit'
              >
                <StorageIcon />
              </IconButton>
            </div>
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-language'
                aria-haspopup='true'
                onClick={handleMenuLanguage}
                color='inherit'
              >
                <LanguageIcon />
              </IconButton>
              <Menu
                id='menu-language'
                anchorEl={anchorLanguage}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openMenuLanguage}
                onClose={handleCloseLanguage}
              >
                <MenuItem key='1' onClick={handleCloseLanguage}>
                  Fran??ais
                </MenuItem>
                <MenuItem key='2' onClick={handleCloseLanguage}>
                  Anglais
                </MenuItem>
                <MenuItem key='3' onClick={handleCloseLanguage}>
                  ??????????????????
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <Typography
              className={classes.title}
              variant='h3'
              noWrap
              align='center'
            >
              <FontAwesomeIcon icon={faTruckMoving} />
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {modules.map((
              module,
              index // with a name, and routes
            ) => (
              <Tooltip title={module.name} key={module.name} placement='right'>
                <ListItem
                  button
                  key={module.name}
                  component={Link}
                  to={module.routeProps.path}
                  selected={index === selectedIndex}
                  onClick={(event) =>
                    handleListItemClick(event, module.name, index)
                  }
                  style={
                    index === selectedIndex
                      ? {
                          borderLeft: '6px solid #3f51b5',

                          paddingLeft: 10,
                        }
                      : null
                  }
                >
                  <ListItemIcon>{module.icon}</ListItemIcon>
                  <ListItemText primary={module.name} />
                </ListItem>
              </Tooltip>
            ))}
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <Alert />
          <div className={classes.toolbar} />
          {!currentTab ? (
            <div className='row' align='center'>
              <img src={require('./image/home.png')} alt='text' width='50%' />
            </div>
          ) : (
            modules.map((module) => (
              <Route {...module.routeProps} key={module.name} />
            ))
          )}
        </main>
      </div>
    </Router>
  );
};

const mapDispatchProps = (dispatch) => {
  return {
    loadCollections: (items, type) => {
      dispatch({
        type: type,
        items: items,
      });
    },
    loadCount: (items, type) => {
      dispatch({
        type: type,
        items: items,
      });
    },
  };
};
const mapStateProps = (state) => {
  return {
    // dashboardItems: state.dashboardItems,
  };
};
export default connect(mapStateProps, mapDispatchProps)(App);
