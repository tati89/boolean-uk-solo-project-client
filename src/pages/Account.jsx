import { useState } from "react";
import AddReview from "../components/AddReview";
import PersonalInfo from "../components/PersonalInfo";
import UserOrders from "../components/UserOrders";
import "../css/Account.css";

function Account({ loggedinUser, userOrders }) {
  const [showInfo, setShowInfo] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!loggedinUser) {
    return null;
  }

  function displayInfo() {
    setShowInfo(!showInfo);
    setShowOrders(false);
    setShowReviewForm(false);
  }

  function displayOrders() {
    setShowOrders(!showOrders);
    setShowInfo(false);
    setShowReviewForm(false);
  }

  function displayReviewForm() {
    setShowReviewForm(!showReviewForm);
    setShowInfo(false);
    setShowOrders(false);
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
        <button onClick={displayReviewForm} className="account-nav-link">
          Post Review
        </button>
        <button onClick={displayOrders} className="account-nav-link">
          Orders
        </button>
        <div></div>
      </div>
      <div className="bottom container">
        {showInfo ? <PersonalInfo loggedinUser={loggedinUser} /> : ""}
        {showOrders ? <UserOrders userOrders={userOrders} /> : ""}
        {showReviewForm ? <AddReview loggedinUser={loggedinUser} /> : ""}
      </div>
    </section>
  );
}

export default Account;
