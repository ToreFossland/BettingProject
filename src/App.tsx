import React from 'react';
// import {BrowserRouter as Router, Route} from 'react-router-dom'
// import Navbar from "./components/navbar.component"
// import BetList from "./components/bet-list.component"
// import CreateBet from "./components/create-bet.component"
// import CreateUser from "./components/create-user.component"

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import {Container, withStyles} from '@material-ui/core';
import {grey, blue, amber} from '@material-ui/core/colors';
import Background from './soccer.jpg';
import BetList2 from './components/BetList'

/* Global Material UI theme
This is sent in a provider so that every component can use it. */
const globalTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: amber[400],
    },
    secondary: {
      main: blue[500],
    },
    info: {
      main: grey[500],
    },
  },
});


const useStyles = makeStyles({
  root: {
    /* Styles for full page image */
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    minHeight: '100vh',
  },
});


/* GlobalCss that is used to override Material components */
const GlobalCss = withStyles({
  '@global': {
    '.MuiDataGrid-root': {
      backgroundColor: 'rgba(58, 58, 58, 0.88)',
    },
    '.MuiIconButton-root, .MuiTypography-root': {color: 'white'},
    '.MuiContainer-root, .MuiContainer-maxWidthLg': {
      marginBottom: 0,
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
    <div className={classes.root}>
      <Container maxWidth="xl">
        <BetList2 />
      </Container>
    </div>
  </ThemeProvider>
);
}

export default App; 
