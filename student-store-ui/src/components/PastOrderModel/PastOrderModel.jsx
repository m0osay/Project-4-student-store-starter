import "./PastOrderModel.css";
import Home from "../Home/Home";
import axios from "axios";
import { useState, useEffect } from "react";

function PastOrderModel({
  onClose,
  products,
  addToCart,
  searchInputValue,
  removeFromCart,
  getQuantityOfItemInCart,
  isFetching,
  activeCategory,
  setActiveCategory,
}) {
  //state for customer‐ID filter
  const [customerIdFilter, setCustomerIdFilter] = useState("");
  const [customerOrders, setCustomerOrders] = useState("");

  function handleInput() {
    console.log("change");
  }

  //helper function for api fetch for getting Customer orders
  async function fetchCustomerOrders(customer_id) {
    console.log("Lets see", customer_id);
    try {
      const res = await axios.get(
        `http://localhost:3001/order/customer/${customer_id}`
      );
      const data = res.data; // how we get the array
      console.log("Not empty", data);
      return data;
    } catch (err) {
      console.log("Api error", err);
      throw err;
    }
  }
  
useEffect(() => {
  if (!customerIdFilter) {
    setCustomerOrders([]);
    return;
  }
  (async () => {
    try {
      const data = await fetchCustomerOrders(customerIdFilter);

      let orderItems = [];
      // Collect all order_items from all orders
      for (let order of data) {
        if (order.order_items) {
          orderItems = orderItems.concat(order.order_items);
        }
      }
      // Collect all products from orderItems
      let products = [];
      for (let item of orderItems) {
        if (item.Product) {
          products = products.concat(item.Product);
        }
      }

      setCustomerOrders(products);
      console.log("products", products);
      console.log("result", orderItems);
    } catch (err) {
      console.error("Failed to load orders:", err);
    }
  })();
}, [customerIdFilter]);

  return (
    <div className="pom-backdrop" onClick={onClose}>
      <div className="pom-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="pom-search">
          <input
            type="text" // <-- changed from "number" to "text"
            placeholder="Filter by Customer ID"
            value={customerIdFilter}
            onChange={(e) => setCustomerIdFilter(e.target.value)} // <-- update state on type
            className="pom-input"
          />
        </div>

        <Home
          products={customerOrders}
          isFetching={isFetching}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          addToCart={addToCart}
          searchInputValue={searchInputValue}
          removeFromCart={removeFromCart}
          getQuantityOfItemInCart={getQuantityOfItemInCart}
        />

        <button className="pom-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}

export default PastOrderModel;
