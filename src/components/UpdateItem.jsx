/* eslint-disable no-unused-vars */
import "../css/UpdateItem.css";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { useState } from "react";

function UpdateItem({ setItemtoUpdate, itemtoUpdate, setItems }) {
  const [name, setName] = useState(itemtoUpdate.name || "");
  const [price, setPrice] = useState(itemtoUpdate.price || "");
  const [description, setDescription] = useState(
    itemtoUpdate.description || ""
  );
  const [img, setImg] = useState(itemtoUpdate.img || "");
  const [category_ID, setCategory_ID] = useState(
    itemtoUpdate.category_ID || ""
  );
  const [ifVegetarian, setIfVegetarian] = useState(itemtoUpdate.vegetarian);

  console.log("item to update", itemtoUpdate);
  const apiUrl = process.env.REACT_APP_API_URL;

  function updateCurrentItem(e, itemtoUpdate) {
    e.preventDefault();

    const updatedItem = {
      name: name,
      price: price,
      description: description,
      img: img,
      vegetarian: ifVegetarian,
      category_ID: category_ID,
    };

    fetch(`${apiUrl}/admin-items/${itemtoUpdate.id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
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
        e.target.reset();
        // setName("");
        // setPrice("");
        // setDescription("");
        // setImg("");
        // setCategory_ID("");
        // setItemtoUpdate();
      })
      .catch((error) => console.error(error));
  }

  return (
    <section className="addItem-page-container">
      <h1 className="addItem-page-header">Update item</h1>

      <div className="item-form-wrapper">
        <form
          onSubmit={(e) => updateCurrentItem(e, itemtoUpdate)}
          className="login"
          noValidate
          autoComplete="off"
        >
          <TextField
            value={itemtoUpdate.name || ""}
            id="name"
            name="name"
            variant="outlined"
            className="addItem-textfield"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="price"
            type="price"
            name="price"
            value={price}
            variant="outlined"
            className="addItem-textfield"
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            id="description"
            type="description"
            name="description"
            value={description}
            variant="outlined"
            className="addItem-textfield"
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            id="img"
            type="img"
            name="img"
            value={img}
            variant="outlined"
            className="addItem-textfield"
            onChange={(e) => setImg(e.target.value)}
          />
          <TextField
            id="category_ID"
            type="category_ID"
            name="category_ID"
            value={category_ID}
            placeholder="beetwen 1- 5"
            variant="outlined"
            className="addItem-textfield"
            onChange={(e) => setCategory_ID(e.target.value)}
          />

          <FormControlLabel
            control={<Checkbox name="agreedToNews" color="primary" />}
            value={ifVegetarian}
            onChange={(e) => setIfVegetarian(e.target.checked)}
            checked={itemtoUpdate.vegetarian || ""}
            label="Vegetarian"
          />
          <button className="addItem-button">Update item</button>
        </form>
      </div>
    </section>
  );
}

export default UpdateItem;
