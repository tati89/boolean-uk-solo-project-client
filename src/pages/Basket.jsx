import BasketItem from "../components/BasketItem";
import "../css/Basket.css";

function Basket({
  basket,
  setBasket,
  items,
  addToBasket,
  decreaseQty,
  removeBasketitem,
  total,
  loggedinUser,
}) {
  function hadlePlaceOrderBtn() {
    const newOrder = {
      total: total,
      user_ID: loggedinUser.id,
    };

    fetch(`http://localhost:4000/orders/${loggedinUser.id}`, {
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
        fetch(`http://localhost:4000/basket/${basket.id}`, {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then(() => setBasket(null));
      })
      .catch((error) => console.error(error));
  }

  console.log(basket);
  return (
    <section className="basket-container">
      <h2>Your Basket</h2>
      <div className="min-order">
        {/* <h3>
          Minimum order £25.00. Please add £5 to pounds to proceed with your
          order.`
        </h3> */}
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
      <h3>Total: £{total.toFixed(2)}</h3>
      <div className="pay-btn-wrapper">
        <button onClick={hadlePlaceOrderBtn} className="pay-button">
          Place order
        </button>
      </div>
    </section>
  );
}

export default Basket;
