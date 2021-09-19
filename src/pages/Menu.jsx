import { Route, Link } from "react-router-dom";
import FilteredMenu from "../components/FilteredMenu.jsx";
import "../css/Menu.css";

function Menu({ categories, items, search, setSearch }) {
  if (!items || !categories) {
    return <>Loading..</>;
  }

  console.log(search);
  return (
    <section className="menu">
      <div>
        <ul className="left-menu">
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`/menu/${category.id}`} className="category-link">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-menu">
        <Route exact path="/menu">
          <div className="menu-wrapper">
            {categories.map((category) => (
              <div
                key={category.id}
                className="menu-category"
                style={{
                  backgroundImage: `url(${category.img})`,
                }}
              >
                <Link
                  key={category.id}
                  to={`/menu/${category.id}`}
                  className="category-link"
                >
                  <p className="category-title">{category.name}</p>{" "}
                </Link>
              </div>
            ))}
          </div>
        </Route>
        <Route path="/menu/:id">
          <FilteredMenu items={items} search={search} />
        </Route>
      </div>
    </section>
  );
}

export default Menu;
