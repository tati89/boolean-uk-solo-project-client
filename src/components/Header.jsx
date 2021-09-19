import "../css/Header.css";
import { Route, Redirect, Link } from "react-router-dom";
import Modal from "../components/Modal";

function Header({ loggedinUser, setLoggedinUser, search, setSearch }) {
  const logOut = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Failed to logout");
        }
      })
      .then((data) => {
        setLoggedinUser(null);
      })
      .catch((error) => console.error(error));

    <Route path="/" exact>
      <Redirect to="/home" />
    </Route>;
  };

  function onSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <header>
      <div className="top-header">
        <div className="login-div">
          {loggedinUser ? (
            `${loggedinUser.username} |`
          ) : (
            <Link to="/login" className="logon-link">
              Login
            </Link>
          )}
          {loggedinUser ? (
            <Link to="/" className="nave-li">
              <button onClick={logOut} className="logon-link log-out">
                Log out
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div>
          <h1 className="logo">Cibo Delizioso</h1>
          <span className="eat-drink-enjoy">Simply order and enjoy</span>
        </div>
        <div className="header-svg">
          <div className="svg-quantity-wrapper">
            <svg
              className="basket-svg"
              viewBox="0 -16 512.00018 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m436 350c11.039062 0 20 8.960938 20 20s-8.960938 20-20 20c-11.917969 0-253.179688 0-266 0-9.28125 0-17.339844-6.390625-19.46875-15.417969l-76.371094-324.582031h-44.160156c-11.039062 0-20-8.960938-20-20s8.960938-20 20-20h60c9.28125 0 17.339844 6.390625 19.46875 15.421875 6.503906 27.636719 69.519531 295.460937 76.371094 324.578125zm0 0"
                fill="#e87288"
              />
              <path
                d="m230 390c22.089844 0 40 17.910156 40 40s-17.910156 40-40 40-40-17.910156-40-40 17.910156-40 40-40zm0 0"
                fill="#424d63"
              />
              <path
                d="m396 390c22.089844 0 40 17.910156 40 40s-17.910156 40-40 40-40-17.910156-40-40 17.910156-40 40-40zm0 0"
                fill="#424d63"
              />
              <path d="m396 440c5.519531 0 10-4.480469 10-10s-4.480469-10-10-10-10 4.480469-10 10 4.480469 10 10 10zm0 0" />
              <path d="m230 440c5.519531 0 10-4.480469 10-10s-4.480469-10-10-10-10 4.480469-10 10 4.480469 10 10 10zm0 0" />
              <path d="m509.882812 123.847656c-1.894531-2.429687-4.804687-3.847656-7.882812-3.847656h-360.003906l-22.792969-96.875c-3.210937-13.617188-15.222656-23.125-29.203125-23.125h-60c-16.542969 0-30 13.457031-30 30s13.457031 30 30 30h36.238281l74.558594 316.875c3.210937 13.617188 15.222656 23.125 29.203125 23.125h20.027344c-6.292969 8.363281-10.027344 18.753906-10.027344 30 0 27.570312 22.429688 50 50 50s50-22.429688 50-50c0-11.246094-3.734375-21.636719-10.027344-30h86.054688c-6.292969 8.363281-10.027344 18.753906-10.027344 30 0 27.570312 22.429688 50 50 50s50-22.429688 50-50c0-11.246094-3.734375-21.636719-10.027344-30h.027344c16.542969 0 30-13.457031 30-30s-13.457031-30-30-30h-242.238281l-9.414063-40h58.621094.019531.015625 145.992188.019531.019531 57.347656c13.785157 0 25.757813-9.34375 29.109376-22.726562l36.210937-144.847657c.746094-2.988281.074219-6.152343-1.820313-8.578125zm-35.691406 76.152344h-63.863281l7.5-60h71.363281zm-118.191406 20h31.671875l-7.5 60h-54.171875v-30c0-5.523438-4.476562-10-10-10s-10 4.476562-10 10v30h-54.171875l-7.5-60h31.671875c5.523438 0 10-4.476562 10-10s-4.476562-10-10-10h-34.171875l-7.5-60h71.671875v30c0 5.523438 4.476562 10 10 10s10-4.476562 10-10v-30h71.671875l-7.5 60h-34.171875c-5.523438 0-10 4.476562-10 10s4.476562 10 10 10zm-141.828125-80 7.5 60h-60.851563l-14.117187-60zm45.828125 290c0 16.542969-13.457031 30-30 30s-30-13.457031-30-30 13.457031-30 30-30 30 13.457031 30 30zm166 0c0 16.542969-13.457031 30-30 30s-30-13.457031-30-30 13.457031-30 30-30 30 13.457031 30 30zm10-70c5.515625 0 10 4.484375 10 10s-4.484375 10-10 10h-266c-4.660156 0-8.664062-3.171875-9.734375-7.710938l-78.183594-332.289062h-52.082031c-5.515625 0-10-4.484375-10-10s4.484375-10 10-10h60c4.660156 0 8.664062 3.171875 9.734375 7.710938l62.1875 264.300781c.003906.007812.003906.015625.007813.023437l15.992187 67.964844zm-270.476562-140h58.648437l7.5 60h-52.03125zm290.566406 52.417969c-1.117188 4.464843-5.109375 7.582031-9.710938 7.582031h-46.050781l7.5-60h61.367187zm0 0" />
              <path d="m316 200c-5.519531 0-10 4.480469-10 10s4.480469 10 10 10 10-4.480469 10-10-4.480469-10-10-10zm0 0" />
            </svg>
            <span className="sticky-quantity">0</span>
          </div>
        </div>
        <div className="subtotal">
          <span>
            Subtotal: <br />
            £0
          </span>
        </div>

        <Link to="/basket" className="nave-li">
          {!loggedinUser ? (
            <Modal
              buttonLabel={<button className="login-button">Checkout</button>}
            >
              <p>You must be logged in</p>
            </Modal>
          ) : (
            <button className="login-button">Checkout</button>
          )}
        </Link>
      </div>

      <nav className="header-bottom-nav">
        <ul className="nav-ul">
          <li>
            <Link to="/" className="nave-li">
              Home
            </Link>
          </li>
          <li>
            <Link to="/menu" className="nave-li">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/reviews" className="nave-li">
              Reviews
            </Link>
          </li>
          <li></li>
          <li>
            <form>
              <input
                onChange={(e) => onSearch(e)}
                className="search-input"
                placeholder="Search.."
              ></input>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
