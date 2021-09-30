function PersonalInfo({ loggedinUser, displayUpdatedUserForm }) {
  return (
    <div className="personal-info">
      <div className="pers-info-title">
        <h3>Username</h3>
        <span>{loggedinUser.username}</span>
        <button
          onClick={() => displayUpdatedUserForm(loggedinUser)}
          className="change-info"
        >
          change
        </button>
      </div>
      <div className="pers-info-title">
        <h3>Email address</h3>
        <span>{loggedinUser.email}</span>
        <button
          onClick={() => displayUpdatedUserForm(loggedinUser)}
          className="change-info"
        >
          change
        </button>
      </div>
      <div className="pers-info-title">
        <h3>Password</h3>
        <span>******</span>
        <button
          onClick={() => displayUpdatedUserForm(loggedinUser)}
          className="change-info"
        >
          change
        </button>
      </div>
      <div className="pers-info-title">
        <h3>Phone number</h3>
        <span>{loggedinUser.phone}</span>
        <button
          onClick={() => displayUpdatedUserForm(loggedinUser)}
          className="change-info"
        >
          change
        </button>
      </div>
    </div>
  );
}

export default PersonalInfo;
