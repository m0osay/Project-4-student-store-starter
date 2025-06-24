const prisma = require("../models/prismaClient");

//GET all orders from our database
exports.getAll = async (req, res) => {
  const orders = await prisma.order.findMany({
    include: {
      order_items: {
        // pull the array Order -> OrderItem
        include: {
          Product: true, // for every OrderItem,we also  also pull Product
        },
      },
    },
  });

  res.json(orders);
};

//Get a specifc order by id
exports.getById = async (req, res) => {
  const order_id = Number(req.params.id);
  let order = await prisma.order.findUnique({ where: { order_id } });
  order = await prisma.order.findMany({
    include: {
      order_items: {
        // pull the array Order -> OrderItem
        include: {
          Product: true, // for every OrderItem,we also  also pull Product
        },
      },
    },
  });
  if (!order) {
    //if order with that specific id doesnt exist
    return res.status(404).json({ error: "Not found" });
  }
  res.json(order);
};

// model Order {
//   id              Int      @id @default(autoincrement())
//   customer        String
//   total           Float
//   status          String
//   createdAt       DateTime @default(now())
//   items           OrderItem[]
// }

//Post a order
exports.create = async (req, res) => {
  const { customer_id, total_price, status, created_at } = req.body; //our input
  const neworder = await prisma.order.create({
    //syntax for creating newProdcut
    data: { customer_id, total_price, status, created_at },
  });
  res.status(201).json(neworder); //successfual entry
};

//Update a order

exports.update = async (req, res) => {
  const order_id = Number(req.params.id);
  const { customer_id, total_price, status, created_at } = req.body; //our input
  const updatedorder = await prisma.order.update({
    where: { order_id },
    data: { customer_id, total_price, status, created_at }, //reaplce the data
  });

  res.json(updatedorder);
};

//Remove an orderItem
// controllers/orderController.js
// controllers/orderController.js
exports.remove = async (req, res, next) => {
  try {
    const order_id = Number(req.params.id); // <- use id
    await prisma.order.delete({ where: { order_id } });
    res.status(204).end();
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Order not found" });
    next(err);
  }
};
