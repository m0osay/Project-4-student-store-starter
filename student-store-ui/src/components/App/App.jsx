import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import PastOrderModel from "../PastOrderModel/PastOrderModel";
import ProductDetail from "../ProductDetail/ProductDetail";
import AccountManager from "../AccountManager/AccountManager";
import NotFound from "../NotFound/NotFound";
import ProfileModal from "../ProfileModal/ProfileModal";
import {
  removeFromCart,
  addToCart,
  getQuantityOfItemInCart,
  getTotalItemsInCart,
} from "../../utils/cart";
import "./App.css";
// import WelcomeModel from "../ProfileModal/ProfileModal";
// import { orderItem } from "../../../../student-store-api/models/prismaClient";

function App() {
  // State variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", dorm_number: "" });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [showPastOrder, setShowPastOrder] = useState(false); //false at beginning
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [profile, setProfile] = useState({});
   const [showSignInPage, setShowSignInPage] = useState(true);

  // Toggles sidebar
  const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

  // Functions to change state (used for lifting state)
  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  //When the submit button is clicked, we run this:
  const handleOnCheckout = async () => {
    console.log("I clicked submit");
    console.log("what I added to cart", cart);

    const orderId = await makeNewOrder(0)
    console.log("Try here", orderId);
    await addOrderItems(orderId) // adds all our orders from our cart to our order
    const order = await fetchOrder(orderId);
    const total_price = order.total_price * 0.0875;
    await updateOrderTotal(orderId,total_price);
    setCart([]);
    


    

  };

async function updateOrderTotal(orderId, total) {
  try {
    const res = await axios.put(
      `http://localhost:3001/order/${orderId}`,
      { total_price: total }
    );
    return res.data;
  } catch (err) {
    console.log("Api error", err);
    throw err;
  }
}
  //helper function for api fetch for getting the product
  async function fetchProducts() {
    try {
      const res = await axios.get("http://localhost:3001/product");
      const data = res.data; // how we get the array
      return data;
    } catch (err) {
      console.log("Api error", err);
      throw err;
    }
  }





  //helper function for api fetch for getting the order object
  async function fetchOrder(order_id) {
    console.log("Lets see", order_id)
    try {
      const res = await axios.get(`http://localhost:3001/order/${order_id}`);
      const data = res.data; // how we get the array
      return data;
    } catch (err) {
      console.log("Api error", err);
      throw err;
    }
  }

  //makes a new Order in the backend
async function makeNewOrder(total) {
  try {
    const order = {
      customer_id: profile.name,
      total_price: total,
      status: "Done",
      orderItem: [],
    };

    // Send to backend and get the created order back
    const response = await axios.post(
      `http://localhost:3001/order/`,
      order
    );
    // Return the order_id from the backend response
    console.log("WOKR PLEASE", response.data)
    console.log("WOKR PLEASE", response.data.orderId)
    return response.data.order_id // <-- This is what your backend sends
  } catch (err) {
    console.log("Api error", err);
    throw err;
  }
}

  //helper function for api fetch for adding orders
  async function addOrderItems(orderId) {
    /* 1  Build an array, not an object */
    const orderItems = [];

    for (const productIdStr in cart) {
      const productId = Number(productIdStr); // fix type mismatch
      const prod = products.find((p) => p.id === productId);
      if (!prod) continue; // skip if catalog missing

      orderItems.push({
        order_id: orderId,
        product_id: productId,
        quantity: cart[productIdStr],
        price: prod.price,
      });
    }

    console.log("array", orderItems); // inspect payload
    console.log("products", products);

    /* 2  Send the array as-is (no extra [ … ]) */
    await axios.post(
      `http://localhost:3001/order/${orderId}/items`, // use correct port & var
      orderItems
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);

      try {
        const data = await fetchProducts();
        setProducts(data);
        // console.log(data);
        // console.log("cart", cart)
        setIsFetching(false);
      } catch (err) {}
    };

    fetchData();
  }, [cart]);

  function handleClickPastOrder() {
    setShowPastOrder(true);
    console.log("[App] I ran ");
  }

  function handleProfileUser() {
    setShowProfilePage(true);
    console.log("[App] Profile ");
  }
  function saveProfile(
    username,
    password,
    firstName,
    lastName,
    address,
    city,
    zipcode,
    state
  ) {
    const newProfile = {
      password,
      firstName,
      lastName,
      address,
      city,
      zipcode,
      state,
    };

    // Update state
    setProfiles((prev) => ({
      ...prev,
      [username]: newProfile,
    }));

    // Save to localStorage
    localStorage.setItem(username, JSON.stringify(newProfile));
  }
  return (
    <div className="App">
      
      {showSignInPage && <AccountManager
        onClose={() => setShowProfilePage(false)}
        profile={profile}
        setProfile={setProfile}
        setShowSignInPage = {setShowSignInPage}
      /> }

      {showProfilePage && (
        <ProfileModal order={order} onClose={() => setShowProfilePage(false)} />
      )}

      <BrowserRouter>
        {showPastOrder && (
          <PastOrderModel
            order={order} /* optional data you want to show   */
            onClose={() => setShowPastOrder(false)}
            products={products}
            isFetching={isFetching}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            addToCart={handleOnAddToCart}
            searchInputValue={searchInputValue}
            removeFromCart={handleOnRemoveFromCart}
            getQuantityOfItemInCart={handleGetItemQuantity}
          />
        )}
        <Sidebar
          cart={cart}
          error={error}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={toggleSidebar}
          isCheckingOut={isCheckingOut}
          addToCart={handleOnAddToCart}
          removeFromCart={handleOnRemoveFromCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <main>
          <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
            handleClickPastOrder={handleClickPastOrder}
            handleProfileUser={handleProfileUser}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                  error={error}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
