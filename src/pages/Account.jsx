import { useState } from "react";
import AddReview from "../components/AddReview";
import PersonalInfo from "../components/PersonalInfo";
import UpdateUser from "../components/UpdateUser";
import UserOrders from "../components/UserOrders";
import "../css/Account.css";

function Account({ loggedinUser, userOrders, setLoggedinUser }) {
  const [showInfo, setShowInfo] = useState(false);
  const [showOrders, setShowOrders] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showUpdateUserForm, setShowUpdateForm] = useState(false);

  if (!loggedinUser) {
    return null;
  }

  function displayInfo() {
    setShowInfo(!showInfo);
    setShowOrders(false);
    setShowReviewForm(false);
    setShowUpdateForm(false);
  }

  function displayOrders() {
    setShowOrders(!showOrders);
    setShowInfo(false);
    setShowReviewForm(false);
    setShowUpdateForm(false);
  }

  function displayReviewForm() {
    setShowReviewForm(!showReviewForm);
    setShowInfo(false);
    setShowOrders(false);
    setShowUpdateForm(false);
  }

  function displayUpdatedUserForm(user) {
    setShowReviewForm(false);
    setShowInfo(false);
    setShowOrders(false);
    setShowUpdateForm(true);
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
        {showInfo ? (
          <PersonalInfo
            loggedinUser={loggedinUser}
            displayUpdatedUserForm={displayUpdatedUserForm}
          />
        ) : (
          ""
        )}
        {showOrders ? <UserOrders userOrders={userOrders} /> : ""}
        {showReviewForm ? <AddReview loggedinUser={loggedinUser} /> : ""}
        {showUpdateUserForm ? (
          <UpdateUser
            loggedinUser={loggedinUser}
            setLoggedinUser={setLoggedinUser}
          />
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default Account;
