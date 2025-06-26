import "./PastOrderModel.css"
import ProductGrid from "../ProductGrid/ProductGrid" 
import Home from "../Home/Home";
import { useState, useEffect } from "react";

function PastOrderModel({
  allOrders,
  onClose,
  products,
  addToCart,
  searchInputValue,
  removeFromCart,
  getQuantityOfItemInCart,
  isFetching,
  activeCategory,
  setActiveCategory
}) {
  // ←–– 1) state for customer‐ID filter
  const [customerIdFilter, setCustomerIdFilter] = useState("");

  function handleInput(){
    console.log("change")
  }


  return (
    <div className="pom-backdrop" onClick={onClose}>
      <div className="pom-dialog" onClick={e => e.stopPropagation()}>

        {/* customer‐ID search box */}
  <div className="pom-search">
  <input
    type="text" // <-- changed from "number" to "text"
    placeholder="Filter by Customer ID"
    value={customerIdFilter}
    onChange={e => setCustomerIdFilter(e.target.value)} // <-- update state on type
    className="pom-input"
  />
</div>

        <Home
          products={products}
          isFetching={isFetching}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          addToCart={addToCart}
          searchInputValue={searchInputValue}
          removeFromCart={removeFromCart}
          getQuantityOfItemInCart={getQuantityOfItemInCart}
        />

        <button className="pom-close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

export default PastOrderModel;