import "../css/UpdateItem.css";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";

function UpdateItem({}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [category_ID, setCategory_ID] = useState("");
  const [ifVegetarian, setIfVegetarian] = useState(false);

  function updateCurrentItem(e) {}

  return (
    <section className="addItem-page-container">
      <h1 className="addItem-page-header">New item</h1>

      <div className="item-form-wrapper">
        <form
          onSubmit={(e) => updateCurrentItem(e)}
          className="login"
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={(e) => setName(e.target.value)}
            id="name"
            label="name"
            variant="outlined"
            className="addItem-textfield"
          />
          <TextField
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            type="price"
            label="price"
            variant="outlined"
            className="addItem-textfield"
          />
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            type="description"
            label="description"
            variant="outlined"
            className="addItem-textfield"
          />
          <TextField
            onChange={(e) => setImg(e.target.value)}
            id="img"
            type="img"
            label="photo"
            variant="outlined"
            className="addItem-textfield"
          />
          <TextField
            onChange={(e) => setCategory_ID(e.target.value)}
            id="category_ID"
            type="category_ID"
            label="categories 1-5"
            placeholder="beetwen 1- 5"
            variant="outlined"
            className="addItem-textfield"
          />

          <FormControlLabel
            control={<Checkbox name="agreedToNews" color="primary" />}
            onChange={(e) => setIfVegetarian(e.target.checked)}
            label="Vegetarian"
          />
          <button className="addItem-button">Update item</button>
        </form>
      </div>
    </section>
  );
}

export default UpdateItem;
