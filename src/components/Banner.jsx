import "../css/Banner.css";

function Banner({ title, imageLink }) {
  return (
    <section className={"banner"}>
      <h1>{title}</h1>
      <img src={imageLink} alt={imageLink}></img>
    </section>
  );
}

export default Banner;
