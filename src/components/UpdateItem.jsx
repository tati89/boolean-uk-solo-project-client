/* eslint-disable no-unused-vars */
import "../css/UpdateItem.css";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";

function UpdateItem({ itemtoUpdate, setItems }) {
  if (!itemtoUpdate) {
    return <></>;
  }

  const apiUrl = process.env.REACT_APP_API_URL;

  function onSubmit(event) {
    event.preventDefault();

    const bla = {
      name: event.target.name.value,
      price: Number(event.target.price.value),
      description: event.target.description.value,
      img: event.target.img.value,
      vegetarian: event.target.vegetarian.checked,
      category_ID: Number(event.target.category_ID.value),
    };

    fetch(`${apiUrl}/admin-items/${itemtoUpdate.id}`, {
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
        fetch(`${apiUrl}/items`, {
          credentials: "include",
        })
          .then((resp) => resp.json())
          .then((items) => setItems(items.data));
        event.target.reset();
        alert("Updated successfully!");
      })
      .catch((error) => console.error(error));
  }

  return (
    <section className="addItem-page-container">
      <h1 className="addItem-page-header">Update item</h1>

      <div className="item-form-wrapper">
        <form
          onSubmit={onSubmit}
          className="login"
          noValidate
          autoComplete="off"
        >
          <TextField
            defaultValue={itemtoUpdate.name}
            id="name"
            name="name"
            variant="outlined"
            className="addItem-textfield"
          />
          <TextField
            id="price"
            type="price"
            name="price"
            defaultValue={itemtoUpdate.price}
            variant="outlined"
            className="addItem-textfield"
          />
          <TextField
            id="description"
            type="description"
            name="description"
            defaultValue={itemtoUpdate.description}
            variant="outlined"
            className="addItem-textfield"
          />
          <TextField
            id="img"
            type="img"
            name="img"
            defaultValue={itemtoUpdate.img}
            variant="outlined"
            className="addItem-textfield"
          />
          <TextField
            id="category_ID"
            type="category_ID"
            name="category_ID"
            defaultValue={itemtoUpdate.category_ID}
            placeholder="beetwen 1- 5"
            variant="outlined"
            className="addItem-textfield"
          />

          <FormControlLabel
            control={<Checkbox color="primary" />}
            name="vegetarian"
            defaultValue={itemtoUpdate.vegetarian}
            label="Vegetarian"
          />
          <button className="addItem-button">Update item</button>
        </form>
      </div>
    </section>
  );
}

export default UpdateItem;
