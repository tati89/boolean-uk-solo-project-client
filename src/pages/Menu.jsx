import { useState } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import "../css/Menu.css";

function Menu() {
  const [categories, setCategories] = useState([]);

  return (
    <section className="menu">
      <div>
        <ul className="left-menu"></ul>
      </div>
      <div className="right-menu"></div>
    </section>
  );
}

export default Menu;
