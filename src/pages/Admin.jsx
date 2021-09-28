import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminOrders from "../components/AdminOrders";
import AllCustomers from "../components/AllCustomers";
import ModifyItems from "../components/ModifyItems";
import "../css/Admin.css";

function Admin({ search, onSearch, items, setItems }) {
  const [showAllOrders, setShowAllOrders] = useState(true);
  const [showCustomers, setShowCustomers] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  function loadOrders() {
    return fetch(`http://localhost:4000/orders`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((orders) => setAllOrders(orders.data));
  }

  function loadUsers() {
    return fetch(`http://localhost:4000/users`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((users) => setCustomers(users.data));
  }

  useEffect(() => {
    loadOrders();
    loadUsers();
  }, []);

  function handelShowAllOrders() {
    setShowAllOrders(!showAllOrders);
    setShowItems(false);
  }

  function handleShowCustomers() {
    setShowCustomers(true);
    setShowAllOrders(false);
    setShowItems(false);
  }

  function handleShowItems() {
    setShowItems(true);
    setShowCustomers(false);
    setShowAllOrders(false);
  }

  function statusOnItsWay(clickedOrder) {
    const updateInfo = {
      status: "On it's way",
    };

    fetch(`http://localhost:4000/orders/${clickedOrder.id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateInfo),
    }).then(loadOrders);
  }

  function statusDelivered(clickedOrder) {
    const updateInfo = {
      status: "Delivered",
    };

    fetch(`http://localhost:4000/orders/${clickedOrder.id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateInfo),
    }).then(() => loadOrders());
  }

  let filteredOrders = allOrders;
  let fillteredAllItems = items;
  let filteredCustomers = customers.filter(
    (customer) => customer.role !== "admin"
  );

  if (search) {
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.status.toLowerCase().includes(search) ||
        order.id === Number(search)
    );

    fillteredAllItems = fillteredAllItems.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.id === Number(search) ||
        item.description.toLowerCase().includes(search)
    );

    filteredCustomers = filteredCustomers.filter(
      (customer) =>
        customer.id === Number(search) ||
        customer.username.toLowerCase().includes(search) ||
        customer.firstName.toLowerCase().includes(search) ||
        customer.lastName.toLowerCase().includes(search) ||
        customer.email.toLowerCase().includes(search)
    );
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
            <button onClick={handleShowCustomers} className="link-button">
              <li>Customers</li>
            </button>
          </div>
          <div>
            <button onClick={handleShowItems} className="link-button">
              <li>Items</li>
            </button>
          </div>
          <div>
            <button className="link-button">
              <li>Add item</li>
            </button>
          </div>

          <div>
            <form>
              <input
                onChange={(e) => onSearch(e)}
                className="search-input"
                placeholder="Search.."
              ></input>
            </form>
          </div>
          <li></li>
        </ul>
      </div>
      {showAllOrders ? (
        <AdminOrders
          filteredOrders={filteredOrders}
          statusOnItsWay={statusOnItsWay}
          statusDelivered={statusDelivered}
        />
      ) : (
        ""
      )}
      {showCustomers ? (
        <AllCustomers filteredCustomers={filteredCustomers} />
      ) : (
        ""
      )}
      {showItems ? (
        <ModifyItems
          fillteredAllItems={fillteredAllItems}
          setItems={setItems}
        />
      ) : (
        ""
      )}
    </section>
  );
}

export default Admin;
