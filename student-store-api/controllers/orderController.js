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
  const order = await prisma.order.findUnique({
    where: { order_id },
    include: {
      order_items: {
        include: {
          Product: true,
        },
      },
    },
  });
  if (!order) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json(order);
};

//Get a specifc order by id
exports.getByCustomer = async (req, res) => {
  const customer_id = Number(req.params.customer_id);
  let order = await prisma.order.findMany({ where: { customer_id } });
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

//Post a order
exports.create = async (req, res) => {
  const { customer_id, total_price, status, created_at } = req.body; //our input
  const newOrder = await prisma.order.create({
    data: { customer_id, total_price, status }
  });
 res.status(201).json({
  message: "order created",
  order_id: newOrder.order_id,
  order: newOrder
});

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
exports.remove = async (req, res) => {
  try {
    const order_id = Number(req.params.id); // <- use id
    await prisma.order.delete({ where: { order_id } });
    res.status(204).end();
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Order not found" });
  }
};
exports.createItems = async (req, res) => {
  const createOrderItems = await prisma.orderItem.createMany({
    data: req.body,
  });

  // Get order_id from the first item in the array
  const order_id = req.body[0]?.order_id;

  // Fetch the updated order object (with items and products)
  let order = null;
  if (order_id) {
    order = await prisma.order.findUnique({
      where: { order_id },
      include: {
        order_items: {
          include: { Product: true },
        },
      },
    });
  }

  res.json({
    order_id,
    order,
  });
};

exports.getTotalPrice = async (req, res) => {
  let total = 0;

  const order_id = Number(req.params.order_id);
  const order = await prisma.order.findUnique({
    where: { order_id },
    include: { order_items: true },
  }); // get the order obejct

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  const orderItems = order.order_items;

  for (let i = 0; i < orderItems.length; i++) {
    total += Number(orderItems[i].price);
  }

  const updatedOrder = await prisma.order.update({
    where: { order_id },
    data: { total_price: total },
    select: { total_price: true }, //select tells which one to retrun
  });
  res.json(order);
};
