import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, withStyles, Fab } from '@material-ui/core';
import { grey, blue, amber } from '@material-ui/core/colors';
import Navbar from './components/Navbar';
import LoginModal from "./components/auth/Login"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';
import Home from "./components/Home";
import { loadBets } from './redux/actions/betActions';



/* Global Material UI theme
This is sent in a provider so that every component can use it. */
const globalTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blue[800],
    },
    secondary: {
      main: amber[400],
    },
    info: {
      main: grey[500],
    },
  },
});


const useStyles = makeStyles((theme) => ({
  root: {
    /* Styles for full page image */
    // backgroundImage: `url(${Background})`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    // backgroundRepeat: 'no-repeat',
    backgroundColor: "black",
    height: '250vh',
    minHeight: '100%',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
}));


/* GlobalCss that is used to override Material components */
const GlobalCss = withStyles({
  '@global': {
    '.MuiDataGrid-root': {
      backgroundColor: 'rgba(58, 58, 58, 0.88)',
    },
    '.MuiIconButton-root, .MuiTypography-root': { color: 'white' },
    '.MuiContainer-root, .MuiContainer-maxWidthLg': {
      marginBottom: 0,
      padding: 0,
    },
    /* Maxwidth to prevent max-container to getting too large */
    '.MuiContainer-maxWidthXl': {
      maxWidth: '1500px',
    },
    '.MuiDataGrid-cell:hover': {
      cursor: 'pointer',
    },
  },
})(() => null);


function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const classes = useStyles();

  return (
    // <div className="container">
    //   <Router>
    //   <Navbar/>
    //   <BetList />
    //   <br/>
    //   <Route path="/" exact component={BetList}/>
    //   <Route path="/create" component={CreateBet}/>
    //   <Route path="/user" component={CreateUser}/>
    // </Router>
    // </div>
    <ThemeProvider theme={globalTheme}>
      <GlobalCss />
      <Provider store={store}>
        <div className={classes.root}>
          <Container maxWidth={false} >
            <Router>
              <div>
                {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                <Switch>
                  <Route path="/home">
                    <Home />
                  </Route>
                  <Route path="/">
                    <LoginModal />
                  </Route>
                </Switch>
              </div>
            </Router>
          </Container>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App; 
