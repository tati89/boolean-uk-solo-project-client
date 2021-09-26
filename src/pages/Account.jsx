import { useState } from "react";
import { Link } from "react-router-dom";
import PersonalInfo from "../components/PersonalInfo";
import UserOrders from "../components/UserOrders";
import "../css/Account.css";

function Account({ loggedinUser, orders }) {
  const [showInfo, setShowInfo] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  console.log(orders);

  if (!loggedinUser) {
    return null;
  }

  function displayInfo() {
    setShowInfo(!showInfo);
    setShowOrders(false);
  }

  function displayOrders() {
    setShowOrders(!showOrders);
    setShowInfo(false);
  }

  return (
    <section className="account-page">
      <h1 className="account-tile">My account page </h1>
      <div className="top-account-page">
        <div className="frame-img-user-page">
          <img src={loggedinUser.avatar} alt="img" />
        </div>
        <div className="greeting-container">
          <h2 className="user-greeting">
            Hello, {loggedinUser.fisrtName} {loggedinUser.lastName}!
          </h2>
          <span className="welcome-span">Welcome to your page</span>
        </div>
      </div>

      <div className="nav-account-page">
        <button onClick={displayInfo} className="account-nav-link">
          Personal Information
        </button>
        <button className="account-nav-link">Post Review</button>
        <button onClick={displayOrders} className="account-nav-link">
          Orders
        </button>
        <div></div>
      </div>
      <div className="bottom container">
        {showInfo ? <PersonalInfo loggedinUser={loggedinUser} /> : ""}
        {showOrders ? <UserOrders orders={orders} /> : ""}
      </div>
    </section>
  );
}

export default Account;
