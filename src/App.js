import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component"
import BetList from "./components/bet-list.component"
import CreateBet from "./components/create-bet.component"
import CreateUser from "./components/create-user.component"
import Login from "./components/login.component"
import Register from "./components/register.component"
import UserContext from "./context/UserContext"

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined 
  });

  useEffect(() =>{
    const checkLoggedIn = async () =>{
      let token = localStorage.getItem('auth-token');
      if(token == null){
        localStorage.setItem("auth-token", "")
        token = ""
        }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid", null, {headers: {"x-auth-token": token }});
      if(tokenRes.data){
        const userRes = await Axios.get("http://localhost:5000/users/", {headers: {"x-auth-token": token}});
        console.log(userRes.data)
        setUserData({
          token,
          user: userRes.data
        });
        
      }
    }
    checkLoggedIn();
  }, [])

  return (
    <div className="container">
      <Router>
        <UserContext.Provider value={{userData, setUserData}}>
          <Navbar/>
            <br/>
            <Route path="/" exact component={BetList}/>
            <Route path="/create" component={CreateBet}/>
            <Route path="/user" component={CreateUser}/>
            <Route path="/login" component={Login}/ >
            <Route path="/register" component={Register}/>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App; 
