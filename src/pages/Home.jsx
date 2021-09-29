import "../css/Home.css";
import Banner from "../components/Banner.jsx";

function Home({ categories }) {
  return (
    <div class="home">
      <Banner
        title={"Simply order and enjoy!"}
        button={"Get started"}
        imageLink={
          "https://images.pexels.com/photos/64208/pexels-photo-64208.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        }
      />

      {/* <div className="menu-wrapper">
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
      </div> */}
    </div>
  );
}

export default Home;
