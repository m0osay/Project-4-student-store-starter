require("dotenv").config(); // lets us use .env variables in our code

const express = require("express");
const app = express();
const productRoutes = require("../routes/productRouters");
const orderRouters = require("../routes/orderRouters");
const orderItemRouters = require("../routes/orderItemRouters");
app.use(express.json());

const PORT = 3000 //need to change this

app.use("/product", productRoutes);
app.use("/order", orderRouters);
app.use("/orderItem", orderItemRouters);

console.log(PORT);

app.listen(PORT, () => {
  console.log(`Server running at https://localhost:${PORT}`);
});
