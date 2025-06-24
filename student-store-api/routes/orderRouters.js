//This is where we set up our routers

const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

//custom endpoint
// router.post("/:order_id/items")

module.exports = router;
