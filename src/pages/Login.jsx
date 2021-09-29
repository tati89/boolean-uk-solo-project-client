/* eslint-disable react-hooks/exhaustive-deps */
import { TextField } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/Login.css";

function Login({ loggedinUser, setLoggedinUser }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (loggedinUser && loggedinUser.role === "admin") {
      history.push("/account");
    }

    if (loggedinUser && loggedinUser.role === "user") {
      history.push("/menu");
    }
  }, [loggedinUser]);

  function onLogin(e) {
    e.preventDefault();

    const loginDetails = {
      username,
      password,
    };

    fetch(`${apiUrl}/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Failed to login");
        }
      })
      .then((user) => {
        setLoggedinUser(user.data);
      })
      .catch((error) => console.error(error));
  }

  return (
    <section className="login-page-container">
      <h1 className="login-page-header">Welcome back</h1>

      <div className="form-wrapper">
        <form
          onSubmit={(e) => onLogin(e)}
          className="login"
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            id="userName"
            label="username"
            variant="outlined"
            className="login-textfield"
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            label="password"
            variant="outlined"
            className="login-textfield"
          />
          <button className="login-button">Log in</button>
          <h3 className="logo-page-h3">
            Don't have an account?
            <Link to="/create-account" className="logo-page-sign-up">
              Get started
            </Link>
          </h3>
        </form>
      </div>
    </section>
  );
}

export default Login;
