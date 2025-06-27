import { useEffect } from "react";
import "./SubNavbar.css";

function SubNavbar({
  activeCategory,
  setActiveCategory,
  searchInputValue,
  handleOnSearchInputChange,
 handleProfileUser,
  handleClickPastOrder,
}) {
  const categories = [
    "All Categories",
    "Accessories",
    "Apparel",
    "Books",
    "Snacks",
    "Supplies",
  ];


  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsFetching(true);

  //     try {
  //       const data = await fetchProducts();
  //       setProducts(data);
  //       // console.log(data);
  //       // console.log("cart", cart)
  //       setIsFetching(false);
  //     } catch (err) {}
  //   };

  //   fetchData();
  // }, [cart]);

  return (
    <nav className="SubNavbar">
      <div className="content">
        <div className="row">
          <div className="buttons">
            <button className = "profile"  onClick={() => handleProfileUser()}> Profile</button>
            <button className = "past-order" onClick={() => handleClickPastOrder(true)}>
              View past orders
            </button>
          </div>
          <div className="search-bar">
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={searchInputValue}
              onChange={handleOnSearchInputChange}
            />
            <i className="material-icons">search</i>
          </div>
        </div>

        <div className="row">
          <ul className={`category-menu`}>
            {categories.map((cat) => (
              <li
                className={activeCategory === cat ? "is-active" : ""}
                key={cat}
              >
                <button onClick={() => setActiveCategory(cat)}>{cat}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SubNavbar;
