import "../css/Home.css";
import Banner from "../components/Banner.jsx";
import { Route, Link } from "react-router-dom";

function Home({ categories }) {
  return (
    <div class="home">
      <Banner
        title={"Menu"}
        imageLink={
          "https://images.pexels.com/photos/2909821/pexels-photo-2909821.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        }
      />
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
    </div>
  );
}

export default Home;
