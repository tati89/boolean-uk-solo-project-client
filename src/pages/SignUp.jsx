import { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
// import { green } from "@mui/material/colors";
import "../css/SignUp.css";

function SignUp() {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [avatar, setAvatar] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [agreedToNews, setAgreedToNews] = useState();
  console.log(agreedToNews);

  return (
    <section className="sighn-up-container">
      <h1 className="sign-up-header">Create your account</h1>

      <div className="sign-up-form-wrapper">
        <form
          // onSubmit={(e) => signUp(e)}
          className="sign-up-form"
          noValidate
          autoComplete="off"
        >
          <div className="first-last-names-form ">
            <TextField
              onChange={(e) => setFirstname(e.target.value)}
              id="firstName"
              label="Name"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setLastname(e.target.value)}
              id="lastName"
              label="Surname"
              variant="outlined"
            />
          </div>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="email"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            label="username"
            variant="outlined"
            placeholder="Username"
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            label="password"
            type="password"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setAvatar(e.target.value)}
            id="avatar"
            label="avatar"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            label="phone"
            variant="outlined"
          />
          <FormControlLabel
            control={<Checkbox name="Promotions" color="success" />}
            onChange={(e) => setAgreedToNews(e.target.checked)}
            label="I would like to recieve promotions and updates via email"
          />

          <div className="sign-up-button-wrapper">
            <button className="sign-up-button">
              <Link to="/login" className="get-started-link">
                Get started
              </Link>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
