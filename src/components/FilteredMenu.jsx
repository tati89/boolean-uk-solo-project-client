import Modal from "../components/Modal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BasketItem from "./BasketItem";

function FilteredMenu({ items, search, addToBasket, loggedinUser, onSearch }) {
  const [showVegeterian, setShowVegeterian] = useState(false);
  const { id } = useParams();

  let filteredItems = items;

  if (id) {
    filteredItems = filteredItems.filter(
      (item) => item.category_ID === Number(id)
    );
  }

  if (search) {
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(search)
    );
  }

  if (showVegeterian) {
    filteredItems = filteredItems.filter(
      (item) => item.vegetarian === showVegeterian
    );
  }

  return (
    <>
      <div>
        <label htmlFor="show-vegetarian-only">
          Vegetarian options only{" "}
          <input
            id="show-vegetarian-only"
            type="checkbox"
            onChange={(e) => setShowVegeterian(e.target.checked)}
          />
        </label>
        <div>
          <form>
            <input
              onChange={(e) => onSearch(e)}
              className="search-input"
              placeholder="Search.."
            ></input>
          </form>
        </div>
      </div>

      <div className="cards-wrapper">
        {filteredItems &&
          filteredItems.map((item) => {
            const { id, img, description, vegetarian, name, price } = item;
            return (
              <div key={id} className="product-card">
                <div className="frame">
                  <Modal buttonLabel={<img src={img} alt={name} />}>
                    <span className="product-title">Ingredients</span>
                    <p>{description}</p>
                  </Modal>
                </div>
                <div>
                  {vegetarian ? (
                    <svg height="24" width="24" version="1.1">
                      <g transform="translate(0 -1028.4)">
                        <path
                          d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                          transform="translate(0 1029.4)"
                          fill="#27ae60"
                        />
                        <path
                          d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                          transform="translate(0 1028.4)"
                          fill="#2ecc71"
                        />
                        <path
                          d="m16 1037.4-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 0.125 0.1 8.125-8.1-2.125-2.1z"
                          fill="#27ae60"
                        />
                        <path
                          d="m16 1036.4-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 0.125 0.1 8.125-8.1-2.125-2.1z"
                          fill="#ecf0f1"
                        />
                      </g>
                    </svg>
                  ) : (
                    ""
                  )}
                </div>
                <span className="product-title">{name}</span>
                <div className="button-add-price-wrapper">
                  <span>£{price}</span>
                  <div>
                    {loggedinUser ? (
                      <button
                        onClick={() => addToBasket(item)}
                        className="product-button"
                      >
                        ADD
                      </button>
                    ) : (
                      <Modal
                        buttonLabel={
                          <button className="product-btn">ADD</button>
                        }
                      >
                        <span className="product-title">
                          Please login or create account
                        </span>
                      </Modal>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default FilteredMenu;
