function UserOrders({ userOrders }) {
  return (
    <section className="user-orders">
      {userOrders &&
        userOrders.map((order) => {
          const { id, date, total, status } = order;
          return (
            <div key={id}>
              <div className="user-orders-container">
                <div className="top-order-info">
                  <div className="left-top">
                    <span className="order-span-title">Order No.</span>
                    <span className="order-number">#{id}</span>
                  </div>
                  <div className="right-top">
                    <span className="order-span-title">Status:</span>
                    <div>
                      <span className="user-status-info">{status}</span>
                    </div>
                  </div>
                </div>
                <div className="bottom-order-info">
                  <div className="bottom-left">
                    <span className="order-span-title">Date:</span>
                    <span className="user-order-info">{date}</span>
                  </div>
                  <div className="bottom-right">
                    <span className="order-span-title">Total:</span>
                    <span className="user-order-info">£{total}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
}

export default UserOrders;
