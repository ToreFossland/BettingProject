
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function Register() {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, username, password, passwordCheck };
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        user: username,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <div class="form-group">
        <label htmlFor="register-email">Email</label>
        <br></br>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div class="form-group">
        <label htmlFor="register-user-name">Username</label>
        <br></br>
        <input
          id="register-user-name"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div class="form-group">
        <label htmlFor="register-password">Password</label>
        <br></br>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div class="form-group">
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
         </div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}