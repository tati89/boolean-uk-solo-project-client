function AllCustomers({ filteredCustomers }) {
  return (
    <section className="admin-customers">
      {filteredCustomers &&
        filteredCustomers.map((customer) => {
          const { id, firstName, lastName, username, email, phone } = customer;
          return (
            <div key={id}>
              <div className="admin-customers-container">
                <div className="custom-info">
                  <span className="info-title">ID</span>
                  <span>{id}</span>
                </div>
                <div className="custom-info">
                  <span className="info-title">Name:</span>
                  <span>{firstName}</span>
                </div>
                <div className="custom-info">
                  <span className="info-title">Surname:</span>
                  <span>{lastName}</span>
                </div>
                <div className="custom-info">
                  <span className="info-title">Username:</span>
                  <span>{username}</span>
                </div>
                <div className="custom-info">
                  <span className="info-title">Email:</span>
                  <span>{email}</span>
                </div>
                <div className="custom-info">
                  <span className="info-title">Phone:</span>
                  <span>{phone}</span>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
}

export default AllCustomers;
