/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useEffect } from "react";
import AddProduct from "../components/AddProduct";
import AdminOrders from "../components/AdminOrders";
import AllCustomers from "../components/AllCustomers";
import ModifyItems from "../components/ModifyItems";
import UpdateItem from "../components/UpdateItem";
import "../css/Admin.css";

function Admin({ search, onSearch, items, setItems }) {
  const [showAllOrders, setShowAllOrders] = useState(true);
  const [showCustomers, setShowCustomers] = useState(false);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [showUpdateItemForm, setUpdateItemForm] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [itemtoUpdate, setItemtoUpdate] = useState();

  const apiUrl = process.env.REACT_APP_API_URL;

  function loadOrders() {
    return fetch(`${apiUrl}/orders`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((orders) => setAllOrders(orders.data));
  }

  function loadUsers() {
    return fetch(`${apiUrl}/customers`, {
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
    setShowAddItemForm(false);
    setShowCustomers(false);
  }

  function handleShowCustomers() {
    setShowCustomers(true);
    setShowAllOrders(false);
    setShowItems(false);
    setShowAddItemForm(false);
  }

  function handleShowItems() {
    setShowItems(true);
    setShowCustomers(false);
    setShowAllOrders(false);
    setShowAddItemForm(false);
  }

  function handleAddItem() {
    setShowAddItemForm(true);
    setShowItems(false);
    setShowCustomers(false);
    setShowAllOrders(false);
  }

  function handleUpdateItem(item) {
    setItemtoUpdate(item);
    setShowAddItemForm(false);
    setShowItems(false);
    setShowCustomers(false);
    setShowAllOrders(false);
    setUpdateItemForm(true);
  }

  function statusOnItsWay(clickedOrder) {
    const updateInfo = {
      status: "On it's way",
    };

    fetch(`${apiUrl}/orders/${clickedOrder.id}`, {
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

    fetch(`${apiUrl}/orders/${clickedOrder.id}`, {
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
          <div className="admin-li-dashboard-wrapper">
            <button onClick={handelShowAllOrders} className="link-button">
              <li className="admin-li-dashboard">Orders</li>
            </button>
          </div>
          <div className="admin-li-dashboard-wrapper">
            <button onClick={handleShowCustomers} className="link-button">
              <li className="admin-li-dashboard">Customers</li>
            </button>
          </div>
          <div className="admin-li-dashboard-wrapper">
            <button onClick={handleShowItems} className="link-button">
              <li className="admin-li-dashboard">Items</li>
            </button>
          </div>
          <div className="admin-li-dashboard-wrapper">
            <button onClick={handleAddItem} className="link-button">
              <li className="admin-li-dashboard">Add item</li>
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
          handleUpdateItem={handleUpdateItem}
        />
      ) : (
        ""
      )}
      {showAddItemForm ? <AddProduct items={items} setItems={setItems} /> : ""}
      {showUpdateItemForm ? (
        <UpdateItem
          setItemtoUpdate={setItemtoUpdate}
          itemtoUpdate={itemtoUpdate}
          setItems={setItems}
        />
      ) : (
        ""
      )}
    </section>
  );
}

export default Admin;
