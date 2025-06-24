const prisma = require("../models/prismaClient");

//GET all orders from our database
exports.getAll = async (req, res) => {
  const orderItems = await prisma.orderItem.findMany();
  res.json(orderItems);
};

//Get a specifc order by id
exports.getById = async (req, res) => {
  const order_item_id = Number(req.params.id);
  const order = await prisma.orderItem.findUnique({ where: { order_item_id } });
  if (!order) {
    //if order with that specific id doesnt exist
    return res.status(404).json({ error: "Not found" });
  }
  res.json(order);
};

// //Post a order
exports.create = async (req, res) => {
  const { order_id, product_id, quantity, price } = req.body; //our input
  console.log("we hit this route, orderItemRouter");
  const newOrderItem = await prisma.orderItem.create({
    //syntax for creating newProdcut
    data: { order_id, product_id, quantity, price },
  });
  res.status(201).json(newOrderItem); //successfual entry
};

// //Update a order

exports.update = async (req, res) => {
  const  order_item_id = Number(req.params.id);
  const { order_id, product_id, quantity, price } = req.body; //our input
  const updatedorder = await prisma.orderItem.update({
    where: {   order_item_id },
    data: { order_id, product_id, quantity, price}, //reaplce the data
  });

  res.json(updatedorder);

};

// //Remove a prodcut
exports.remove = async (req, res) => {
  const   order_item_id = Number(req.params.id);
  await prisma.orderItem.delete({ where: {   order_item_id } });
  res.status(204).end(); //successful removal
};
