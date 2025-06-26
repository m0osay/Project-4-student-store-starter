require("dotenv").config(); // lets us use .env variables in our code
const cors = require("cors");
const express = require("express");
const app = express();
const productRoutes = require("../routes/productRouters");
const orderRouters = require("../routes/orderRouters");
const orderItemRouters = require("../routes/orderItemRouters");

const corsOption = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOption));
app.use(express.json());

app.use("/product", productRoutes);
app.use("/order", orderRouters);
app.use("/orderItem", orderItemRouters);

const PORT = process.env.PORT;


app.listen(PORT, () => {
  console.log(`Server running at https://localhost:${PORT}`);
});

// Cross-Origin Resource Sharing (CORS) is a security mechanism that browsers implement to prevent malicious websites
// from making requests to resources hosted on another domain without permission.
//  By default, browsers restrict cross-origin HTTP requests initiated from scripts.
