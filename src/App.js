import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component"
import BetList from "./components/bet-list.component"
import CreateBet from "./components/create-bet.component"
import CreateUser from "./components/create-user.component"

function App() {
  return (
    <div className="container">
      <Router>
      <Navbar/>
      <br/>
      <Route path="/" exact component={BetList}/>
      <Route path="/create" component={CreateBet}/>
      <Route path="/user" component={CreateUser}/>
    </Router>
    </div>
  );
}

export default App; 
