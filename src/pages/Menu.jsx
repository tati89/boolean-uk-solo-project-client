import { useEffect } from "react";
import { useState } from "react";
import { Route, Link } from "react-router-dom";
import Banner from "../components/Banner.jsx";
import FilteredMenu from "../components/FilteredMenu.jsx";
import "../css/Menu.css";

function Menu({
  categories,
  items,
  search,
  setSearch,
  addToBasket,
  basket,
  loggedinUser,
  onSearch,
}) {
  const [filter, setFilter] = useState();
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (filter) {
      switch (filter) {
        case "starters":
          setFilteredItems(items.filter((item) => item.category_ID === 1));
          break;
        case "salads":
          setFilteredItems(items.filter((item) => item.category_ID === 2));
          break;
        case "pizzas":
          setFilteredItems(items.filter((item) => item.category_ID === 3));
          break;
        case "pastas":
          setFilteredItems(items.filter((item) => item.category_ID === 4));
          break;
        case "deserts":
          setFilteredItems(items.filter((item) => item.category_ID === 5));
          break;
      }
    } else {
      setFilteredItems(items);
    }
  }, [filter, items]);

  if (!items || !categories) {
    return <>Loading..</>;
  }

  return (
    <>
      <section className="menu">
        <div>
          <ul className="left-menu">
            <li>
              <button
                onClick={() => setFilter("starters")}
                className="category-link"
              >
                Starters
              </button>
            </li>
            <li>
              <button
                onClick={() => setFilter("salads")}
                className="category-link"
              >
                Salads
              </button>
            </li>
            <li>
              <button
                onClick={() => setFilter("pizzas")}
                className="category-link"
              >
                Pizzas
              </button>
            </li>
            <li>
              <button
                onClick={() => setFilter("pastas")}
                className="category-link"
              >
                Pastas
              </button>
            </li>
            <li>
              <button
                onClick={() => setFilter("deserts")}
                className="category-link"
              >
                Deserts
              </button>
            </li>
          </ul>
        </div>
        <div className="right-menu">
          <FilteredMenu
            filteredItems={filteredItems}
            search={search}
            basket={basket}
            addToBasket={addToBasket}
            loggedinUser={loggedinUser}
            onSearch={onSearch}
          />
        </div>
      </section>
    </>
  );
}

export default Menu;
