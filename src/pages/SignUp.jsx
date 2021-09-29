import { useState } from "react";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import "../css/SignUp.css";

function SignUp({ setLoggedinUser, loggedinUser, setBasket }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [avatar, setAvatar] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [agreedToNews, setAgreedToNews] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  // useEffect(() => {
  //   if (loggedinUser) {
  //     fetch(`http://localhost:4000/basket/${loggedinUser.id}`, {
  //       credentials: "include",
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         user_ID: loggedinUser.id,
  //       }),
  //     })
  //       .then((resp) => resp.json())
  //       .then((basket) => setBasket(basket.data));
  //   }
  // }, [loggedinUser]);

  function onSignUp(e) {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      username,
      password,
      avatar,
      phone,
      email,
      agreedToNews,
    };

    fetch(`${apiUrl}/signup`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Failed to create new user");
        }
      })
      .then((user) => {
        setLoggedinUser(user.data);
      })
      .catch((error) => console.error(error));
  }

  return (
    <section className="sighn-up-container">
      <h1 className="sign-up-header">Create your account</h1>

      <div className="sign-up-form-wrapper">
        <form
          onSubmit={(e) => onSignUp(e)}
          className="sign-up-form"
          noValidate
          autoComplete="off"
        >
          <div className="first-last-names-form ">
            <TextField
              onChange={(e) => setFirstName(e.target.value)}
              id="firstName"
              label="Name"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setLastName(e.target.value)}
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
            control={<Checkbox name="agreedToNews" color="primary" />}
            onChange={(e) => setAgreedToNews(e.target.checked)}
            label="I would like to recieve promotions and updates via email"
          />

          <div className="sign-up-button-wrapper">
            <button className="sign-up-button">Sign up</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
