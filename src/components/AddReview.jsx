import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import "../css/AddReview.css";
import Modal from "../components/Modal";

function AddReview({ loggedinUser }) {
  const [reviewDate, setReviewDate] = useState("");
  const [content, setContent] = useState("");

  if (!loggedinUser) {
    return null;
  }

  function postReview(e) {
    // e.preventDefault();

    const newReview = {
      date: reviewDate,
      content: content,
      user_ID: loggedinUser.id,
    };

    fetch("http://localhost:4000/reviews", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Failed to add review");
        }
      })
      .then((review) => {
        console.log(review);
      })
      .catch((error) => console.error(error));

    return null;
  }

  return (
    <section className="add-review-container">
      <div className="top-addRevie-page">
        <h2 className="addReview-page-h2">Share your opinion</h2>
      </div>
      <div className="addReview-form-wrapper">
        <form className="add-review-form" noValidate autoComplete="off">
          <TextField
            onChange={(e) => setReviewDate(e.target.value)}
            id="date"
            label="date"
            variant="outlined"
            placeholder="01/09/2021"
            fullWidth
            multiline
            rows="1"
          />
          <TextField
            onChange={(e) => setContent(e.target.value)}
            id="content"
            label="content"
            variant="outlined"
            fullWidth
            multiline
            rows="9"
          />
          <div className="post-review-wrapper">
            <Modal
              buttonLabel={
                <button
                  onClick={(e) => postReview(e)}
                  className="post-review-button"
                >
                  Post
                </button>
              }
            >
              <span className="product-title">
                Thank you for sharing your opinion
              </span>
            </Modal>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddReview;
