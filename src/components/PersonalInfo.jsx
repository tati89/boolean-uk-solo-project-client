function PersonalInfo({ loggedinUser }) {
  return (
    <div className="personal-info">
      <div className="pers-info-title">
        <h3>Username</h3>
        <span>{loggedinUser.username}</span>
      </div>
      <div className="pers-info-title">
        <h3>Email address</h3>
        <span>{loggedinUser.email}</span>
      </div>
      <div className="pers-info-title">
        <h3>Password</h3>
        <span>******</span>
      </div>
      <div className="pers-info-title">
        <h3>Phone number</h3>
        <span>{loggedinUser.phone}</span>
      </div>
    </div>
  );
}

export default PersonalInfo;
