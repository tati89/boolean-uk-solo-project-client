import { Redirect, Route, Switch } from "react-router-dom";
import React, { useState, useCallback } from "react";
import Header from "./components/Header";
import "./css/App.css";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reviews from "./pages/Reviews";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Basket from "./pages/Basket";
import { useEffect } from "react";
import Account from "./pages/Account";
import Admin from "./pages/Admin";

function App() {
  const [loggedinUser, setLoggedinUser] = useState(null);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [basket, setBasket] = useState(null);
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState(0);

  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState();

  useEffect(() => {
    const fetchResults = (endpoint) =>
      fetch(`http://localhost:4000/${endpoint}`).then((resp) => resp.json());

    const dataFetches = [
      fetchResults("categories").then((categories) =>
        setCategories(categories.data)
      ),
      fetchResults("items").then((items) => setItems(items.data)),
      fetchResults("reviews").then((reviews) => setReviews(reviews.data)),
    ];

    Promise.all(dataFetches)
      .catch(setFetchError)
      .finally(() => setIsFetching(false));
  }, []);

  const logOut = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
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
        setBasket(null);
        setUserOrders([]);
        setTotal(0);
        setQty(0);
      })
      .catch((error) => console.error(error));

    <Route path="/" exact>
      <Redirect to="/home" />
    </Route>;
  };

  useEffect(() => {
    if (loggedinUser) {
      fetch(`http://localhost:4000/basket/${loggedinUser.id}`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_ID: loggedinUser.id,
        }),
      })
        .then((resp) => resp.json())
        .then((basket) => setBasket(basket.data));
    }
  }, [loggedinUser]);

  useEffect(() => {
    if (loggedinUser) {
      fetch(`http://localhost:4000/orders/${loggedinUser.id}`, {
        credentials: "include",
      })
        .then((resp) => resp.json())
        .then((orders) => setUserOrders(orders.data));
    }
  }, [loggedinUser]);

  function onSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  useEffect(() => {
    if (basket && basket.items !== null) {
      let total = 0;
      let qty = 0;
      for (const basketItem of basket.items) {
        let foundItem = items.find((item) => item.id === basketItem.item_ID);
        total += foundItem.price * basketItem.qty;
        qty += basketItem.qty;
      }
      setTotal(total);
      setQty(qty);
    }
  }, [basket]);

  function addToBasket(clickedItem) {
    const itemToBasket = {
      qty: 1,
      basket_ID: basket.id,
      item_ID: clickedItem.id,
    };
    fetch("http://localhost:4000/basket-items", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemToBasket),
    }).then(() => {
      fetch(`http://localhost:4000/basket/${loggedinUser.id}`, {
        credentials: "include",
      })
        .then((resp) => resp.json())
        .then((basket) => setBasket(basket.data));
    });
  }

  function decreaseQty(clickedItem) {
    if (clickedItem.qty === 1) {
      fetch(`http://localhost:4000/basket-items/${clickedItem.id}`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "aplication/json",
        },
      }).then(() => {
        fetch(`http://localhost:4000/basket/${loggedinUser.id}`, {
          credentials: "include",
        })
          .then((resp) => resp.json())
          .then((basket) => setBasket(basket.data));
      });
    } else {
      fetch(`http://localhost:4000/basket-items/${clickedItem.id}`, {
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify({
          qty: 1,
        }),
      }).then(() => {
        fetch(`http://localhost:4000/basket/${loggedinUser.id}`, {
          credentials: "include",
        })
          .then((resp) => resp.json())
          .then((basket) => setBasket(basket.data));
      });
    }
  }

  function removeBasketitem(clickedItem) {
    fetch(`http://localhost:4000/basket-items/${clickedItem.id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "aplication/json",
      },
    }).then(() => {
      fetch(`http://localhost:4000/basket/${loggedinUser.id}`, {
        credentials: "include",
      })
        .then((resp) => resp.json())
        .then((basket) => setBasket(basket.data));
    });
  }

  const loadCurrentlyAuthenticatedUser = useCallback(() => {
    fetch("http://localhost:4000/me", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((json) => {
        setLoggedinUser(json.data);
      })
      .catch(() => {
        setLoggedinUser(null);
      });
  }, []);

  useEffect(() => {
    loadCurrentlyAuthenticatedUser();
  }, [loadCurrentlyAuthenticatedUser]);

  return (
    <div className="App">
      <Header
        loggedinUser={loggedinUser}
        setLoggedinUser={setLoggedinUser}
        logOut={logOut}
        total={total}
        qty={qty}
      />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <Home categories={categories} />
          </Route>
          <Route path="/menu">
            <Menu
              categories={categories}
              items={items}
              addToBasket={addToBasket}
              basket={basket}
              loggedinUser={loggedinUser}
              search={search}
              setSearch={setSearch}
              onSearch={onSearch}
            />
          </Route>
          <Route path="/reviews">
            <Reviews reviews={reviews} />
          </Route>
          <Route path="/login">
            <Login
              loggedinUser={loggedinUser}
              setLoggedinUser={setLoggedinUser}
            />
          </Route>
          {loggedinUser && loggedinUser.role === "admin" ? (
            <Route path="/account">
              <Admin
                loggedinUser={loggedinUser}
                search={search}
                onSearch={onSearch}
                items={items}
                setItems={setItems}
              />
            </Route>
          ) : (
            <Route path="/account" exact>
              <Account loggedinUser={loggedinUser} userOrders={userOrders} />
            </Route>
          )}

          <Route path="/create-account">
            <SignUp
              setLoggedinUser={setLoggedinUser}
              loggedinUser={loggedinUser}
              setBasket={setBasket}
            />
          </Route>
          {loggedinUser ? (
            <Route path="/basket">
              <Basket
                basket={basket}
                setBasket={setBasket}
                items={items}
                addToBasket={addToBasket}
                decreaseQty={decreaseQty}
                removeBasketitem={removeBasketitem}
                total={total}
                setTotal={setTotal}
                setUserOrders={setUserOrders}
                loggedinUser={loggedinUser}
              />
            </Route>
          ) : (
            ""
          )}
        </Switch>
      </main>
    </div>
  );
}

export default App;
