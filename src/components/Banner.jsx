import "../css/Banner.css";

function Banner({ title, button, imageLink }) {
  return (
    <section className={"banner"}>
      <h1>{title}</h1>
      <div>
        <button>{button}</button>
      </div>
      <img className="banner-img" src={imageLink} alt={imageLink}></img>
    </section>
  );
}

export default Banner;
