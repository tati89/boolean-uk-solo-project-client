import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminOrders from "../components/AdminOrders";
import "../css/Admin.css";

function Admin({ orders, setOrders }) {
  const [showAllOrders, setShowAllOrders] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/orders`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((orders) => setOrders(orders.data));
  }, []);

  function handelShowAllOrders() {
    setShowAllOrders(!showAllOrders);
  }

  return (
    <section className="admin">
      <div className="admin-dashboard">
        <ul className="admin-ul">
          <li className="admin-greeting">Welcome, admin</li>
          <li></li>
          <div>
            <button onClick={handelShowAllOrders} className="link-button">
              <li>Orders</li>
            </button>
          </div>
          <div>
            <button className="link-button">
              <li>Customers</li>
            </button>
          </div>
          <div>
            <form>
              <input
                // onChange={(e) => onSearch(e)}
                className="search-input"
                placeholder="Search.."
              ></input>
            </form>
          </div>
          <li></li>
        </ul>
      </div>
      {showAllOrders ? <AdminOrders orders={orders} /> : ""}
    </section>
  );
}

export default Admin;
