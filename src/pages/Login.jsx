import { TextField } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const [usernsme, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <section className="login-page-container">
      <h1 className="login-page-header">Welcome back</h1>

      <div className="form-wrapper">
        <form
          //   onSubmit={(e) => onLogin(e)}
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
