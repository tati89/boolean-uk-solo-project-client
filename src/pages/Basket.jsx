import BasketItem from "../components/BasketItem";
import "../css/Basket.css";

function Basket() {
  return (
    <section className="basket-container">
      <h2>Your Basket</h2>
      <div className="min-order">
        <h3>
          Minimum order £25.00. Please add £5 to pounds to proceed with your
          order.`
        </h3>
      </div>
      <ul>
        <BasketItem />
      </ul>
      <h3>Total: £0</h3>
      <div className="pay-btn-wrapper">
        <button className="pay-button">Pay</button>
      </div>
    </section>
  );
}

export default Basket;
