import "../css/Home.css";
import Banner from "../components/Banner.jsx";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  return (
    <div class="home">
      <Link to="/menu">
        <Banner
          title={"Simply order and enjoy!"}
          button={"Get started"}
          imageLink={
            "https://images.pexels.com/photos/64208/pexels-photo-64208.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
          }
        />
      </Link>
      <Footer />
    </div>
  );
}

export default Home;
