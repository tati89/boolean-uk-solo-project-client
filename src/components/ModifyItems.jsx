import "../css/ModifyItems.css";

function ModifyItems({ items }) {
  console.log(items);
  return (
    <section className="admin-items">
      {items &&
        items.map((item) => {
          const { id, name, price, description, vegetarian } = item;
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
                  {item.vegetarian == true ? <span>yes</span> : <span>no</span>}
                </div>
                <div className="admin-item-remove-btn">
                  <button className="admin-remove">Remove</button>
                </div>
                <div className="admin-item-update-btn">
                  <button className="admin-update">Update</button>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
}

export default ModifyItems;
