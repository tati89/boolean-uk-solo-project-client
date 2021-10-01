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
  const isPayable = total >= 25;

  function hadlePlaceOrderBtn() {
    const newOrder = {
      total: total,
      user_ID: loggedinUser.id,
      status: "In progress",
    };

    fetch(`${apiUrl}/user-orders/${loggedinUser.id}`, {
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
            ? `Minimum order £25.00. Please add £${(25 - total).toFixed(
                2
              )} pounds to proceed with your order.`
            : "Proceed to checkout"}
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
        {isPayable ? (
          <>
            <Modal buttonLabel={<span className="pay-button">Checkout</span>}>
              <p>{`Total payment £${total.toFixed(2)}`}</p>
              <button
                className="pay-button"
                onClick={() => hadlePlaceOrderBtn()}
              >
                Pay
              </button>
            </Modal>
          </>
        ) : (
          "Not enough products to purchase"
        )}
      </div>
    </section>
  );
}

export default Basket;
