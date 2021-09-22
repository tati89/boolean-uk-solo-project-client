import { Route, Link } from "react-router-dom";
import Banner from "../components/Banner.jsx";
import FilteredMenu from "../components/FilteredMenu.jsx";
import "../css/Menu.css";

function Menu({ categories, items, search, setSearch, addToBasket, basket }) {
  if (!items || !categories) {
    return <>Loading..</>;
  }

  return (
    <>
      <Banner
        title={"Menu"}
        imageLink={
          "https://images.pexels.com/photos/2909821/pexels-photo-2909821.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        }
      />
      <section className="menu">
        <div>
          <ul className="left-menu">
            {categories &&
              categories.map((category) => (
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
              {categories &&
                categories.map((category) => (
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
                      <p className="category-title">{category.name}</p>
                    </Link>
                  </div>
                ))}
            </div>
          </Route>
          <Route path="/menu/:id">
            <FilteredMenu
              items={items}
              search={search}
              basket={basket}
              addToBasket={addToBasket}
            />
          </Route>
        </div>
      </section>
    </>
  );
}

export default Menu;
