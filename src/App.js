import { Link, Redirect, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./css/App.css";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reviews from "./pages/Reviews";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>
          <Route path="/reviews">
            <Reviews />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/create-account">
            <SignUp />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
