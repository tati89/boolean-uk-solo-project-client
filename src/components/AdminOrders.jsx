function AdminOrders({ orders }) {
  return (
    <section className="admin-orders">
      {orders &&
        orders.map((order) => {
          const { id, date, total, status } = order;
          return (
            <div key={id}>
              <div className="admin-orders-container">
                <div className="top-order-info">
                  <div className="left-top">
                    <span className="order-span-title">Order No.</span>
                    <span className="order-number">#{id}</span>
                  </div>
                  <div className="right-top">
                    <span className="order-span-title">Status:</span>
                    <div>
                      <span className="status-info">{status}</span>
                    </div>
                  </div>
                  <div className="right-top">
                    <psan className="order-span-title">Change status:</psan>
                    <div className="status-button-div">
                      <button className="admin-oder-button">On it's way</button>
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
                  <div className="status-button-div">
                    <button className="admin-oder-button">Delivered</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
}

export default AdminOrders;
