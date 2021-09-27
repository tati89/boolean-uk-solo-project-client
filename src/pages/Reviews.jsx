import "../css/Review.css";

function Reviews() {
  return (
    <section className="reviews">
      <h2 className="review-hero">WHAT OUR CUSTOMERS SAY</h2>
      <div className="reviews-wrapper">
        <div className="review-card">
          <div className="top-card">
            <div className="frame-img-review">
              <img
                src="https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="img"
              />
            </div>
            <div className="user-details">
              <spa className="name-surname">John Smiths</spa>
              <span className="city">28/09/2021</span>
            </div>
          </div>
          <blockquote>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos magnam
            aut voluptas quasi corporis atque modi veniam, perferendis
            voluptates delectus voluptatem. Ex sed quaerat dicta dignissimos.
            Recusandae ex ut reprehenderit.
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
