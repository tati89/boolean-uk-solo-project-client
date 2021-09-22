import { Redirect, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import Header from "./components/Header";
import "./css/App.css";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reviews from "./pages/Reviews";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Basket from "./pages/Basket";
import { useEffect } from "react";

function App() {
  const [loggedinUser, setLoggedinUser] = useState(null);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [basket, setBasket] = useState(null);

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
      })
      .catch((error) => console.error(error));

    <Route path="/" exact>
      <Redirect to="/home" />
    </Route>;
  };

  // useEffect(() => {
  //   if (loggedinUser) {
  //     fetch(`http://localhost:4000/basket/${loggedinUser.id}`, {
  //       credentials: "include",
  //     })
  //       .then((resp) => resp.json())
  //       .then((basket) => setBasket(basket.data));
  //   }
  // }, [loggedinUser]);

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
      fetch(`http://localhost:4000/basket/${loggedinUser.id}`, {
        credentials: "include",
      })
        .then((resp) => resp.json())
        .then((basket) => setBasket(basket.data));
    }
  }, [loggedinUser]);

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

  let total = 0;
  let qty = 0;

  if (basket) {
    for (const basketItem of basket.items) {
      let foundItem = items.find((item) => item.id === basketItem.item_ID);
      total += foundItem.price * basketItem.qty;
      qty += basketItem.qty;
    }
  }

  return (
    <div className="App">
      <Header
        loggedinUser={loggedinUser}
        setLoggedinUser={setLoggedinUser}
        logOut={logOut}
        search={search}
        setSearch={setSearch}
        total={total}
        qty={qty}
      />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/menu">
            <Menu
              categories={categories}
              items={items}
              addToBasket={addToBasket}
              basket={basket}
              search={search}
              setSearch={setSearch}
            />
          </Route>
          <Route path="/reviews">
            <Reviews />
          </Route>
          <Route path="/login">
            <Login
              loggedinUser={loggedinUser}
              setLoggedinUser={setLoggedinUser}
            />
          </Route>
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
                items={items}
                addToBasket={addToBasket}
                decreaseQty={decreaseQty}
                removeBasketitem={removeBasketitem}
                total={total}
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
