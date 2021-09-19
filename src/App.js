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
  const [loggedinUser, setLoggedinUser] = useState();
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

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

  return (
    <div className="App">
      <Header
        loggedinUser={loggedinUser}
        setLoggedinUser={setLoggedinUser}
        search={search}
        setSearch={setSearch}
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
            <SignUp setLoggedinUser={setLoggedinUser} />
          </Route>
          {loggedinUser ? (
            <Route path="/basket">
              <Basket />
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
