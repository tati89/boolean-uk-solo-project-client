import BasketItem from "../components/BasketItem";
import "../css/Basket.css";

function Basket({
  basket,
  items,
  addToBasket,
  decreaseQty,
  removeBasketitem,
  total,
}) {
  // function hadlePlaceOrderBtn() {}
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
        <button className="pay-button">Place order</button>
      </div>
    </section>
  );
}

export default Basket;
