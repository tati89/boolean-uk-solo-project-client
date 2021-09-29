/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "../css/ModifyItems.css";

function ModifyItems({ fillteredAllItems, setItems, handleUpdateItem }) {
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    loadItems();
  }, []);

  function loadItems() {
    return fetch(`${apiUrl}/items`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((items) => setItems(items.data));
  }

  function deleteItem(clickedItem) {
    fetch(`${apiUrl}/admin-items/${clickedItem.id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(loadItems);
  }

  return (
    <section className="admin-items">
      {fillteredAllItems &&
        fillteredAllItems.map((item) => {
          const { id, name, price, description } = item;
          return (
            <div key={id}>
              <div className="admin-items-container">
                <div className="admin-item-info">
                  <span className="admin-item-title">ID</span>
                  <span>{id}</span>
                </div>
                <div className="admin-item-info">
                  <span className="admin-item-title">Title:</span>
                  <span>{name}</span>
                </div>
                <div className="admin-item-info">
                  <span className="admin-item-title">Price:</span>
                  <span>£{price}</span>
                </div>
                <div className="admin-item-info">
                  <span className="admin-item-title">Description:</span>
                  <span>{description}</span>
                </div>
                <div className="admin-item-info">
                  <span className="admin-item-title">Vegetarian:</span>
                  {item.vegetarian ? <span>yes</span> : <span>no</span>}
                </div>
                <div className="admin-item-remove-btn">
                  <button
                    onClick={() => deleteItem(item)}
                    className="admin-remove"
                  >
                    Remove
                  </button>
                </div>
                <div className="admin-item-update-btn">
                  <button
                    onClick={() => handleUpdateItem(item)}
                    className="admin-update"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
}

export default ModifyItems;
