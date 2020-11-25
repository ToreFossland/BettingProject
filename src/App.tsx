import React, { useEffect, useState } from 'react';
import './App.css';
// import Navbar from "./components/navbar.component"
// import BetList from "./components/bet-list.component"
// import CreateBet from "./components/create-bet.component"
// import CreateUser from "./components/create-user.component"
import { flexbox } from '@material-ui/system';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, withStyles, Fab } from '@material-ui/core';
import { grey, blue, amber } from '@material-ui/core/colors';
import Background from './soccer.jpg';
import BetList2 from './components/BetList';
import Navbar from './components/Navbar';
import Chart from './components/Chart';
import UnsettledBets from './components/UnsettledBets';
import BetButton from './components/BetButton'
import SpanningTable from './components/BalanceTable';
import Login from './components/auth/Login';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import LoginModal from "./components/auth/Login"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LastActions from './components/LastActions';
import PromotionList from './components/PromotionList';


import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';
import { loadBets } from './redux/actions/betActions';
import RegisterModal from './components/auth/registerModal';
import Home from "./components/Home";

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
    store.dispatch(loadBets());
  }, []);
  const classes = useStyles();

  return (
    // <div className="container">
    //   <Router>
    //   <Navbar/>
    //   <BetList2 />
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
                    <Navbar />
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
