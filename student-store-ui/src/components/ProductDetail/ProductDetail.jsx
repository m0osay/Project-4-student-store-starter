import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "../NotFound/NotFound";
import { formatPrice } from "../../utils/format";
import "./ProductDetail.css";

function ProductDetail({ addToCart, removeFromCart, getQuantityOfItemInCart }) {
  
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);


  if (error) {
    return <NotFound />;
  }

 //helper function for api fetch
  async function fetchProductsWithID(productId){
    try{
    const res = await axios.get("http://localhost:3001/product/2")
    
    const data = res.data          // how we get the array
    return data
    }catch(err){
      console.log("Api error", err)
      throw err
    }
  }

  useEffect(() => { 
    const fetchData = async () => {
      const data = await fetchProductsWithID(productId);
      console.log("[ProductDetail]", data )
      setProduct(data)


    }


    
 fetchData()
}, [productId]) 

  if (isFetching || !product) {

    return <h1>Loading...</h1>;
  }

  const quantity = getQuantityOfItemInCart(product);

  const handleAddToCart = () => {
    if (product.id) {
      addToCart(product)
    }
  };

  const handleRemoveFromCart = () => {
    if (product.id) {
      removeFromCart(product);
    }
  };

  return (
    <div className="ProductDetail">
      <div className="product-card">
        <div className="media">
          <img src={product.image_url || "/placeholder.png"} alt={product.name} />
        </div>
        <div className="product-info">
          <p className="product-name">{product.name}</p>
          <p className="product-price">{formatPrice(product.price)}</p>
          <p className="description">{product.description}</p>
          <div className="actions">
            <button onClick={handleAddToCart}>Add to Cart</button>
            {quantity > 0 && <button onClick={handleRemoveFromCart}>Remove from Cart</button>}
            {quantity > 0 && <span className="quantity">Quantity: {quantity}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}


export default ProductDetail;