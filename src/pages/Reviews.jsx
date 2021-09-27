import "../css/Review.css";

function Reviews({ reviews }) {
  return (
    <section className="reviews">
      <h2 className="review-hero">WHAT OUR CUSTOMERS SAY</h2>
      <div className="reviews-wrapper">
        {reviews &&
          reviews.map((review) => (
            <div className="review-card">
              <div className="top-card">
                <div className="frame-img-review">
                  <img src={review.user.avatar} alt="img" />
                </div>
                <div className="user-details">
                  <spa className="name-surname">
                    {review.user.firstName} {review.user.lastName}
                  </spa>
                  <span className="city">{review.date}</span>
                </div>
              </div>
              <blockquote>{review.content}</blockquote>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Reviews;
