import BasketItem from "../components/BasketItem";
import Modal from "../components/Modal";
import "../css/Basket.css";

function Basket({
  basket,
  setBasket,
  items,
  addToBasket,
  decreaseQty,
  removeBasketitem,
  total,
  setQty,
  loggedinUser,
  setTotal,
  setUserOrders,
}) {
  const apiUrl = process.env.REACT_APP_API_URL;

  function hadlePlaceOrderBtn() {
    const newOrder = {
      total: total,
      user_ID: loggedinUser.id,
      status: "In progress",
    };

    fetch(`${apiUrl}/orders/${loggedinUser.id}`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Failed to create new order");
        }
      })
      .then(() => {
        fetch(`${apiUrl}/basket/${basket.id}`, {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then(() => {
            setBasket(null);
            setTotal(0);
            setQty(0);
          });
      })
      .then(() => {
        fetch(`${apiUrl}/orders/${loggedinUser.id}`, {
          credentials: "include",
        })
          .then((resp) => resp.json())
          .then((orders) => setUserOrders(orders.data));
      })
      .catch((error) => console.error(error));
  }

  return (
    <section className="basket-container">
      <h2>Your Basket</h2>
      <div className="discount-info">
        <h3 className="total-info-h3">
          {total < 25
            ? `Spend £${(25 - total).toFixed(2)} more and get free standard
            delivery.`
            : "Congrats, you’ve got free UK standard delivery"}
        </h3>
      </div>
      <ul>
        {basket &&
          basket.items.map((baskItem) => (
            <BasketItem
              item={items.find((item) => baskItem.item_ID === item.id)}
              baskItem={baskItem}
              addToBasket={addToBasket}
              decreaseQty={decreaseQty}
              removeBasketitem={removeBasketitem}
              key={baskItem.id}
            />
          ))}
      </ul>
      <h3 className="total-display">Total: £{total.toFixed(2)}</h3>
      <div className="pay-btn-wrapper">
        <Modal
          buttonLabel={
            <button onClick={hadlePlaceOrderBtn} className="pay-button">
              Place order
            </button>
          }
        >
          <span className="product-title">Order has been placed</span>
        </Modal>
      </div>
    </section>
  );
}

export default Basket;
