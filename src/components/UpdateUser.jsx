import "../css/UpdateItem.css";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
function UpdateUser({ loggedinUser, setLoggedinUser }) {
  if (!loggedinUser) {
    return <></>;
  }

  const apiUrl = process.env.REACT_APP_API_URL;

  function onSubmit(event) {
    event.preventDefault();

    const bla = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      password: event.target.password.value,
      username: event.target.username.value,
      agreedToNews: event.target.agreedToNews.checked,
      avatar: event.target.avatar.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
    };

    fetch(`${apiUrl}/admin-items/${loggedinUser.id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bla),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Failed to update");
        }
      })
      .then(() => {
        return fetch(`${apiUrl}/customers`, {
          credentials: "include",
        })
          .then((resp) => resp.json())
          .then((user) => setLoggedinUser(user.data));
        event.target.reset();
        alert("Updated successfully!");
      })
      .catch((error) => console.error(error));
  }

  return (
    <section className="addItem-page-container">
      <h1 className="addItem-page-header">Update personal information</h1>

      <div className="item-form-wrapper">
        <form
          onSubmit={onSubmit}
          className="login"
          noValidate
          autoComplete="off"
        >
          <TextField
            defaultValue={loggedinUser.firstName}
            id="firstName"
            name="firstName"
            variant="outlined"
            className="addItem-textfield"
          />
          <TextField
            id="lastName"
            type="lastName"
            name="lastName"
            defaultValue={loggedinUser.lastName}
            variant="outlined"
            className="addItem-textfield"
          />
          <TextField
            id="password"
            type="password"
            name="password"
            defaultValue={loggedinUser.password}
            variant="outlined"
            className="addItem-textfield"
          />
          <TextField
            id="username"
            type="username"
            name="username"
            defaultValue={loggedinUser.username}
            variant="outlined"
            className="addItem-textfield"
          />
          <TextField
            id="avatar"
            type="avatar"
            name="avatar"
            defaultValue={loggedinUser.avatar}
            placeholder="beetwen 1- 5"
            variant="outlined"
            className="addItem-textfield"
          />
          <TextField
            id="phone"
            type="phone"
            name="phone"
            defaultValue={loggedinUser.phone}
            placeholder="beetwen 1- 5"
            variant="outlined"
            className="addItem-textfield"
          />
          <TextField
            id="email"
            type="email"
            name="email"
            defaultValue={loggedinUser.email}
            placeholder="beetwen 1- 5"
            variant="outlined"
            className="addItem-textfield"
          />

          <FormControlLabel
            control={<Checkbox color="primary" />}
            name="agreedToNews"
            defaultValue={loggedinUser.agreedToNews}
            label="Vegetarian"
          />
          <button className="addItem-button">Update </button>
        </form>
      </div>
    </section>
  );
}

export default UpdateUser;
