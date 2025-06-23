require("dotenv").config(); // lets us use .env variables in our code

const express = require("express");
const app = express();
const productRoutes = require("../routes/productRouters");
const orderRouters = require("../routes/orderRouters");
app.use(express.json());

const PORT = 3000;

app.use("/product", productRoutes);
app.use("/order", orderRouters);

console.log(PORT);

app.listen(PORT, () => {
  console.log(`Server running at https://localhost:${PORT}`);
});
